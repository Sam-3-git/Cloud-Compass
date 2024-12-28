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
        // Create a pill for each role
        const pillElement = document.createElement("div");
        pillElement.classList.add("role-pill");
        // Set role name as pill text
        pillElement.textContent = role.roleName;
        // Create description and hide by default
        const descriptionElement = document.createElement("div");
        descriptionElement.classList.add("description");
        descriptionElement.textContent = role.description;
        // Append description to the pill
        pillElement.appendChild(descriptionElement);
        // Add click event to open the help article link
        pillElement.addEventListener("click", () => {
            window.open(role.SourceURI, "_blank");
        });
        // Append the pill to the result container
        resultsContainer.appendChild(pillElement);
    });
}
// Function to load and display all roles initially
function loadInitialRoles() {
    chrome.storage.local.get("roleData", (result) => {
        const roleData = result.roleData; // Use the dynamic RoleData interface
        displaySearchResults(roleData); // Display all roles initially
    });
}
function handleOverlaySwitch() {
    const overlaySwitch = document.getElementById("overlay-toggle");
    // Restore the switch state from storage
    chrome.storage.sync.get("uiEnabled", ({ uiEnabled }) => {
        overlaySwitch.checked = uiEnabled || false; // Set the toggle based on stored state
        console.log(`Overlay toggle restored to: ${overlaySwitch.checked ? "ON" : "OFF"}`);
    });
    // Add an event listener for toggle changes
    overlaySwitch.addEventListener("change", (event) => {
        const isEnabled = event.target.checked;
        // Log the current state of the toggle
        console.log(`Overlay toggle switched to: ${isEnabled ? "ON" : "OFF"}`);
        // Save the new state
        chrome.storage.sync.set({ uiEnabled: isEnabled }, () => {
            console.log(`State saved: ${isEnabled ? "UI Enabled" : "UI Disabled"}`);
        });
        // Send a message to content.js
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: isEnabled ? "enableUI" : "disableUI",
                    enabled: isEnabled // Added this to pass the enabled state
                }, () => console.log(`Message sent to content.js: ${isEnabled ? "enableUI" : "disableUI"}, enabled: ${isEnabled}`));
            }
        });
    });
}
// Add event listener to search bar
const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", handleSearchInput); // Listen for input events on the search bar
// Load and display roles on popup load
loadInitialRoles();
// Initialize the overlay switch
handleOverlaySwitch();
console.log("Extension: Cloud Compass");
export {};
