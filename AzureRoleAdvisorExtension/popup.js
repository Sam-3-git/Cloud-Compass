// Function to display the roles data in the popup
function displayRoles(roles) {
  console.log("Roles data: ", roles);  // Log the roles data to check if it's being fetched correctly

  const rolesList = document.getElementById('rolesList');
  rolesList.innerHTML = ''; // Clear the list before populating

  if (roles && roles.length > 0) {
    roles.forEach(role => {
      const li = document.createElement('li');
      li.textContent = `${role.roleName}: ${role.description}`; // Display role name and description
      rolesList.appendChild(li);
    });
  } else {
    displayMessage('No roles data found.');
  }
}

// Function to display messages in the popup
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
    displayRoles(data); // Display roles (using the entire array)
  })
  .catch(error => {
    console.error("Error fetching data:", error); // Log any errors
    displayMessage('Error loading roles.');
  });
