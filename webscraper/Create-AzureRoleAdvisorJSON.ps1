# script used to update AzureRoleAdvisor.json

Function Get-AzureRBACInformationLinks {
    [CmdletBinding()]
        PARAM(
            [Parameter(Mandatory = $True)]
            [ValidateNotNullOrEmpty()]
            [Microsoft.PowerShell.Commands.BasicHtmlWebResponseObject]$BaseURIRequest 
        )
    $NeededLinks = $BaseURIRequest.Links | Where-Object {($_.'data-linktype' -eq 'relative-path') -and {$_.OuterHTML -like "<a href=`"built-in-roles/*"}}
    Write-Output $NeededLinks
}

Function Build-AzureRBACLinks {
    [CmdletBinding()]
        PARAM(
            [Parameter(Mandatory = $True)]
            [ValidateNotNullOrEmpty()]
            [psobject]$NeededLinks,

            [Parameter(Mandatory = $True)]
            [ValidateNotNullOrEmpty()]
            [string]$BaseURI
        )
    $NeededLinks | Foreach-Object {
        # we only need the end portion of the link to build the refrence links
        if ($_.'OuterHTML' -match '\/(.*)" ') {
            $RefrenceLinks = $BaseURI + $matches[1]
            Write-Output $RefrenceLinks
        }
    }
}

Function Invoke-AllRefrenceLinks {
    [CmdletBinding()]
        PARAM(
            [Parameter(Mandatory = $True)]
            [ValidateNotNullOrEmpty()]
            [System.String[]]$RefrenceLinks
        )

    $RefrenceLinks | Foreach-object {
        $InvokeRefLink = Invoke-WebRequest $_
        # the base URI is needed for link tracking.
        $OutputObject = [psobject]@{
            InvokeRefLink=$InvokeRefLink
            URI=$_
        }
        Write-Output $OutputObject
    }
}

Function ConvertFrom-AllRefrenceRequests {
    [CmdletBinding()]
    PARAM(
        [Parameter(Mandatory = $True)]
        [ValidateNotNullOrEmpty()]
        [System.Collections.Hashtable[]]$AllRefrenceRequests
    )
    $JSONPattern =   '(?s)<pre><code class="lang-json">(.*?)<\/code><\/pre'
    $AllRefrenceRequests | ForEach-Object {
        $Request = $_
        Write-Verbose "URI $($Request.URI)"
        $Fragment = $Request.URI -replace '.*#', ''
        Write-Verbose "Fragment $Fragment"
        $FragmentPattern = "<h2\s+id=`"$Fragment`".*?>.*?<\/h2>"
        $Content = $Request.InvokeRefLink.Content
        # get a start point to allow to grab only the first match of Regex instead of whole page
        $FragmentMatch = [regex]::Match($Content, $FragmentPattern)
        if ($FragmentMatch.Success) {
            $StartIndex = $FragmentMatch.Index + $FragmentMatch.Length
            $RelevantContent = $Content.Substring($StartIndex)
            $JSONMatch = [regex]::Match($RelevantContent, $JSONPattern)
            $JSONString = $JSONMatch[0].Groups[1].Value.trim() # using only index 0 and index of 1 on group to grab the first match of the json pattern match after the refrence in the uri on the request
            if ($JSONString | Test-JSON -ErrorAction SilentlyContinue) {
                $JSONObject = $JSONString | ConvertFrom-JSON
                $JSONObject | Add-Member -MemberType NoteProperty -Name "SourceURI" -Value $Request.URI
                Write-Output $JSONObject
            }
        }
    }
}

# Decalare Variables and make initial content request.
$BaseURI = "https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/"
$BaseURIRequest = Invoke-WebRequest $BaseURI

# Retrieve an object with all built-in-roles links to query for JSON objects
$NeededLinks = Get-AzureRBACInformationLinks -BaseURIRequest $BaseURIRequest

# Transform the needed links into refrence links
$RefrenceLinks = Build-AzureRBACLinks -NeededLinks $NeededLinks -BaseURI $BaseURI

# Returns all refrence link web requests
$AllRefrenceRequests = Invoke-AllRefrenceLinks -RefrenceLinks $RefrenceLinks

# Extract all JSON Content from refrence links
$FoundJSONs = ConvertFrom-AllRefrenceRequests -AllRefrenceRequests $AllRefrenceRequests

# Create JSON object needed for Project
$FinalJSON = $FoundJSONs | ConvertTo-Json -Depth 10
$FinalJSON | Set-Content -path $PSScriptRoot\AzureRoleAdvisor.json -Encoding UTF8