// popup.js
document.addEventListener('DOMContentLoaded', function() {
  // Example function to get roles data (from storage, API, etc.)
  getRoles()
    .then(roles => {
      if (roles && Array.isArray(roles) && roles.length > 0) {
        // If roles data is valid, display them
        displayRoles(roles);
      } else {
        // If no valid roles data, display a message
        displayMessage("No roles data found.");
      }
    })
    .catch(error => {
      console.error("Error loading roles:", error);
      displayMessage("Error loading roles.");
    });
});

// Function to get roles (from storage, API, or local data)
function getRoles() {
  return new Promise((resolve, reject) => {
    // Example of fetching roles from Chrome storage
    chrome.storage.local.get(['roles'], function(result) {
      if (chrome.runtime.lastError) {
        reject("Error accessing storage");
      }
      resolve(result.roles || []);
    });
  });
}

// Function to display roles in the popup
function displayRoles(roles) {
  const rolesList = document.getElementById('rolesList');
  rolesList.innerHTML = ''; // Clear the list before populating

  roles.forEach(role => {
    const li = document.createElement('li');
    li.textContent = role.name;  // Assuming role has a 'name' property
    rolesList.appendChild(li);
  });
}

// Function to display a message if no roles or error occurs
function displayMessage(message) {
  const rolesList = document.getElementById('rolesList');
  rolesList.innerHTML = ''; // Clear the list before showing message
  const li = document.createElement('li');
  li.textContent = message;
  rolesList.appendChild(li);
}

// Fetch the roles data from the GitHub repository
fetch('https://raw.githubusercontent.com/Sam-3-git/Azure-RoleAdvisor/main/webscraper/AzureRoleAdvisor.json')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    console.log("Fetched data:", data); // Log the fetched data
    displayRoles(data.roles); // Assuming the fetched data contains a 'roles' array
  })
  .catch(error => {
    console.error("Error fetching data:", error); // Log any errors
    displayMessage('Error loading roles.');
  });