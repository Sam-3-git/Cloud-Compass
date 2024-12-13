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

Function ConvertFrom-RefrenceRequests {
   [CmdletBinding()]
        PARAM(
            [Parameter(Mandatory = $True)]
            [ValidateNotNullOrEmpty()]
            $AllRefrenceRequests
        )
    $JSONPattern =   '(?s)<pre><code class="lang-json">(.*?)<\/code><\/pre'
    $AllRefrenceRequests | Foreach-object {
        $Request = $_
        $RegexMatches = [regex]::Matches($Request.InvokeRefLink.Content,$JSONPattern)
        if ($RegexMatches.Count -gt 0) {
            foreach ($Match in $RegexMatches) {
                $JSONString = $Match.Groups[1].Value
                $JSONString = $JSONString.trim()
                # a check is needed due to online documentation having some improper json formatting. may revisit if becomes issue.
                if ($JSONString | Test-JSON -ErrorAction SilentlyContinue) {
                    $JSONObject = $JSONString | ConvertFrom-JSON
                    $JSONObject | Add-Member -MemberType NoteProperty -Name "SourceURI" -Value $Request.URI
                    Write-Output $JSONObject
                }
            }
        }    
    }  
}

# Decalare Variables and make initial content request.
$BaseURI = "https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/"
$BaseURIRequest = Invoke-WebRequest $BaseURI

# Retrieve an object with all built-in-roles links to query for JSON objects
$NeededLinks = Get-AzureRBACInformationLinks -BaseURLRequest $BaseURLRequest

# Transform the needed links into refrence links
$RefrenceLinks = Build-AzureRBACLinks -NeededLinks $NeededLinks -BaseURI $BaseURI

# Returns all refrence link web requests
$AllRefrenceRequests = Invoke-AllRefrenceLinks -RefrenceLinks $RefrenceLinks

# Extract all JSON Content from refrence links
$FoundJSONs = ConvertFrom-RefrenceRequests -AllRefrenceRequests $AllRefrenceRequests

# Create JSON object needed for Project
$FinalJSON = $JSONOBjects | ConvertTo-Json -Depth 10
$FinalJSON | Set-Content -path $PSScriptRoot\AzureRoleAdvisor.json -Encoding UTF8