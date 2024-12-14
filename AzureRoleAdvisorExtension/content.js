function injectRoleBar(roles) {
  console.log("Injecting role bar...");

  // Create the role bar container
  const roleBar = document.createElement('div');
  roleBar.classList.add('role-bar');
  roleBar.id = 'roleBar';

  // Apply styles to the role bar for testing
  roleBar.style.position = 'fixed';
  roleBar.style.top = '0';
  roleBar.style.left = '0';
  roleBar.style.width = '100%';
  roleBar.style.backgroundColor = '#0078D4'; // Azure blue
  roleBar.style.padding = '10px 0';
  roleBar.style.zIndex = '9999'; // Ensure it appears on top of other content
  roleBar.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)'; // Add shadow for visibility
  roleBar.style.overflowX = 'auto'; // Enable horizontal scrolling
  roleBar.style.whiteSpace = 'nowrap'; // Prevent wrapping of pills
  roleBar.style.display = 'flex'; // Align pills horizontally
  roleBar.style.flexWrap = 'nowrap'; // Prevent pills from wrapping to the next line

  // Create a container for the pills
  const roleContainer = document.createElement('div');
  roleContainer.classList.add('role-container');

  // Create role pills for each role
  roles.forEach(role => {
    const pill = document.createElement('div');
    pill.classList.add('role-pill');
    pill.textContent = role.roleName; // Show full role name
    pill.style.margin = '5px'; // Add some margin between pills for spacing
    pill.style.padding = '5px 10px'; // Padding inside pills
    pill.style.borderRadius = '20px'; // Rounded corners for pill
    pill.style.backgroundColor = getRandomColor(); // Use a random color for each pill
    pill.style.cursor = 'pointer'; // Make pills clickable
    pill.style.color = 'white'; // Text color
    pill.style.display = 'inline-block'; // Ensure pill is inline and takes up only the required space

    // Tooltip for description
    const tooltip = document.createElement('div');
    tooltip.classList.add('role-pill-tooltip');
    tooltip.textContent = role.description;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.visibility = 'hidden'; // Hide the tooltip by default

    // Event listener to show tooltip on hover
    pill.addEventListener('mouseenter', (event) => {
      tooltip.style.visibility = 'visible'; // Show tooltip
      tooltip.style.opacity = '1'; // Fade in tooltip
      tooltip.style.left = `${event.pageX + 10}px`; // Position relative to mouse (x-axis)
      tooltip.style.top = `${event.pageY + 10}px`; // Position relative to mouse (y-axis)
    });

    // Event listener to hide tooltip when mouse leaves
    pill.addEventListener('mouseleave', () => {
      tooltip.style.visibility = 'hidden'; // Hide tooltip
      tooltip.style.opacity = '0'; // Fade out tooltip
    });

    // Event listener to open the SourceURI in a new tab on click
    pill.addEventListener('click', () => {
      console.log(`Role clicked: ${role.roleName}`);
      console.log(`Source URI: ${role.SourceURI}`);
      window.open(role.SourceURI, '_blank'); // Open SourceURI in a new tab
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
  console.log("Role bar injected into the body.");

  // Log the final DOM to ensure it was injected
  console.log("Body after role bar injection:", document.body.innerHTML);
}

// Function to generate random colors for pills
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Fetch the roles data from the GitHub repository
fetch('https://raw.githubusercontent.com/Sam-3-git/Azure-RoleAdvisor/main/webscraper/AzureRoleAdvisor.json')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    console.log("Fetched data:", data); // Log the fetched data
    injectRoleBar(data); // Inject the role bar with the roles data
  })
  .catch(error => {
    console.error("Error fetching data:", error); // Log any errors
  });
