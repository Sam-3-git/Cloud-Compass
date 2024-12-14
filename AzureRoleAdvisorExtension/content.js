function injectRoleBar(roles) {
  // Create the role bar container
  const roleBar = document.createElement('div');
  roleBar.classList.add('role-bar');
  roleBar.id = 'roleBar';

  // Create a container for the pills
  const roleContainer = document.createElement('div');
  roleContainer.classList.add('role-container');

  // Create role pills for each role
  roles.forEach(role => {
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

    // Append pill and tooltip to the role container
    roleContainer.appendChild(pill);
    roleContainer.appendChild(tooltip);
  });

  // Append the role container to the role bar
  roleBar.appendChild(roleContainer);

  // Insert the role bar at the top of the page
  const body = document.body;
  body.insertBefore(roleBar, body.firstChild); // Insert it as the first child of the body
}



// Fetch the roles data from the GitHub repository
fetch('https://raw.githubusercontent.com/Sam-3-git/Azure-RoleAdvisor/main/webscraper/AzureRoleAdvisor.json')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    console.log("Fetched data:", data); // Log the fetched data
    console.log("Attempting to inject the role bar...");
    injectRoleBar(data); // Inject the role bar with the roles data
  })
  .catch(error => {
    console.error("Error fetching data:", error); // Log any errors
  });
