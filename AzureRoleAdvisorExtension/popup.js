// Function to display the roles data in the popup
function displayRoles(roles) {
  console.log("Roles data: ", roles);  // Log the roles data to check if it's being fetched correctly

  const roleContainer = document.getElementById('roleContainer');
  roleContainer.innerHTML = ''; // Clear the container before populating

  if (roles && roles.length > 0) {
    roles.forEach(role => {
      // Create a pill for each role
      const pill = document.createElement('div');
      pill.classList.add('role-pill');
      pill.textContent = role.roleName.split(' ')[0]; // Get first part of role name

      // Tooltip for description
      const tooltip = document.createElement('div');
      tooltip.classList.add('role-pill-tooltip');
      tooltip.textContent = role.description;

      // Event listener to open the SourceURI in a new tab on click
      pill.addEventListener('click', () => {
        window.open(role.SourceURI, '_blank');
      });

      // Add the pill and tooltip to the container
      roleContainer.appendChild(pill);
      roleContainer.appendChild(tooltip); // Tooltip comes after the pill in the DOM
    });
  } else {
    displayMessage('No roles data found.');
  }
}

// Function to display messages in the popup
function displayMessage(message) {
  const roleContainer = document.getElementById('roleContainer');
  roleContainer.innerHTML = ''; // Clear the container before showing message
  const li = document.createElement('li');
  li.textContent = message;
  roleContainer.appendChild(li);
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
