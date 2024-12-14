// Function to create a role pill
function createRolePill(role) {
  const pill = document.createElement('div');
  pill.classList.add('role-pill');
  pill.textContent = role.roleName; // Set role name

  // Tooltip for description
  const tooltip = document.createElement('div');
  tooltip.classList.add('role-pill-tooltip');
  tooltip.textContent = role.description;
  pill.appendChild(tooltip);

  // Event listener to open the SourceURI in a new tab on click
  pill.addEventListener('click', () => {
    window.open(role.SourceURI, '_blank');
  });

  return pill;
}

// Fetch roles data from GitHub (or wherever your data is stored)
fetch('https://raw.githubusercontent.com/Sam-3-git/Azure-RoleAdvisor/main/webscraper/AzureRoleAdvisor.json')
  .then(response => response.json())
  .then(data => {
    const roleBar = document.getElementById('roleBar');
    data.forEach(role => {
      const pill = createRolePill(role);
      roleBar.appendChild(pill);
    });
  })
  .catch(error => console.error("Error fetching roles:", error));
