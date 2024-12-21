// Function to handle search input and filter data
function handleSearchInput(event) {
    const query = event.target.value.toLowerCase(); // Get the input and convert to lowercase
    // Get RBAC data from local storage
    chrome.storage.local.get("roleData", (result) => {
        const roleData = result.roleData; // Use the dynamic RoleData interface
        // Filter the role data based on the query (assuming the search is done on role names)
        const filteredData = Object.keys(roleData)
            .filter((key) => key.toLowerCase().includes(query)) // Search by role key
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
        const resultElement = document.createElement("div");
        resultElement.textContent = `${key}: ${JSON.stringify(data[key])}`; // Display key-value pair
        resultsContainer.appendChild(resultElement);
    });
}
// Add event listener to search bar
const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", handleSearchInput); // Listen for input events on the search bar
export {};
