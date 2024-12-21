// Function to handle search input and filter data
function handleSearchInput(event) {
    const query = event.target.value.toLowerCase(); // Get the input and convert to lowercase
    // Get RBAC data from local storage
    chrome.storage.local.get("roleData", (result) => {
        const roleData = result.roleData; // Use the dynamic RoleData interface
        // Filter the role data based on the query (search by role name or description)
        const filteredData = Object.keys(roleData)
            .filter((key) => {
            const role = roleData[key];
            return (role.roleName.toLowerCase().includes(query) ||
                (role.description && role.description.toLowerCase().includes(query)));
        })
            .reduce((obj, key) => {
            obj[key] = roleData[key]; // Add the matching key-value pairs to a new object
            return obj;
        }, {}); // Create a new object to hold the filtered data
        // Update the UI with filtered results
        displaySearchResults(filteredData);
    });
}
// Function to display search results
function displaySearchResults(data) {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = ""; // Clear previous results
    if (Object.keys(data).length === 0) {
        resultsContainer.innerHTML = "<p>No roles found.</p>";
        return;
    }
    // Loop through filtered data and append to results container
    Object.keys(data).forEach((key) => {
        const role = data[key];
        const resultElement = document.createElement("div");
        // Create a link for the SourceURI that opens in a new tab
        const linkElement = document.createElement("a");
        linkElement.href = role.SourceURI;
        linkElement.target = "_blank"; // Open the link in a new tab
        linkElement.textContent = `${role.roleName}: ${role.description}`;
        // Append the link to the result container
        resultElement.appendChild(linkElement);
        resultsContainer.appendChild(resultElement);
    });
}
// Function to load and display all roles initially
function loadInitialRoles() {
    chrome.storage.local.get("roleData", (result) => {
        const roleData = result.roleData; // Use the dynamic RoleData interface
        displaySearchResults(roleData); // Display all roles initially
    });
}
// Add event listener to search bar
const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", handleSearchInput); // Listen for input events on the search bar
// Load and display roles on popup load
loadInitialRoles();
// export {};
