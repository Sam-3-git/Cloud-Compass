document.addEventListener('DOMContentLoaded', function () {
  const roleBar = document.getElementById('roleBar');
  const tooltip = document.getElementById('tooltip');

  // Fetching the roles data from the JSON file
  fetch('https://raw.githubusercontent.com/Sam-3-git/Azure-RoleAdvisor/main/webscraper/AzureRoleAdvisor.json')
    .then(response => response.json())
    .then(data => {
      console.log("Fetched data:", data);
      displayRoles(data);  // Now pass the entire data to display roles
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });

  // Function to display roles in pills
  function displayRoles(data) {
    data.forEach(role => {
      const pill = createPill(role);
      roleBar.appendChild(pill);
    });
  }

  // Create a pill for each role
  function createPill(role) {
    const pillContainer = document.createElement('div');
    pillContainer.classList.add('pill-container');

    const pill = document.createElement('div');
    pill.classList.add('pill');
    pill.textContent = role.roleName.split(' ')[0]; // Get the first word of the role name

    // Show tooltip on hover
    pill.addEventListener('mouseenter', () => {
      tooltip.textContent = role.description || 'No description available';
      tooltip.style.visibility = 'visible';

      // Position tooltip near the pill
      const pillRect = pill.getBoundingClientRect();
      tooltip.style.top = `${pillRect.top - tooltip.offsetHeight - 5}px`;
      tooltip.style.left = `${pillRect.left + pillRect.width / 2 - tooltip.offsetWidth / 2}px`;
    });

    pill.addEventListener('mouseleave', () => {
      tooltip.style.visibility = 'hidden';
    });

    // Open the SourceURI in a new tab when clicking the pill
    pill.addEventListener('click', () => {
      window.open(role.SourceURI, '_blank');
    });

    pillContainer.appendChild(pill);
    return pillContainer;
  }
});
