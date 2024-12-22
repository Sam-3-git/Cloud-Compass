// Function to inject the role bar
function injectRoleBar(roles: any[]): void {
    console.log("Injecting role bar...");
  
    // Check if the role bar already exists, to avoid duplicates
    const existingRoleBar = document.getElementById('roleBar');
    if (existingRoleBar) {
      console.log("Role bar already exists. Skipping injection.");
      return;
    }
  
    // Create the role bar container
    const roleBar = document.createElement('div');
    roleBar.classList.add('role-bar');
    roleBar.id = 'roleBar';
  
    // Apply styles to the role bar
    roleBar.style.position = 'fixed';
    roleBar.style.top = '0';
    roleBar.style.left = '0';
    roleBar.style.width = '100%';
    roleBar.style.backgroundColor = '#0078D4';
    roleBar.style.padding = '5px 0';
    roleBar.style.zIndex = '9999';
    roleBar.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    roleBar.style.overflowX = 'auto';
    roleBar.style.whiteSpace = 'nowrap';
    roleBar.style.height = '50px';
    roleBar.style.marginBottom = '10px';
  
    // Create a container for the pills
    const roleContainer = document.createElement('div');
    roleContainer.classList.add('role-container');
  
    // Create role pills for each role
    roles.forEach(role => {
      const pill = document.createElement('div');
      pill.classList.add('role-pill');
      pill.textContent = role.roleName;
      pill.style.margin = '5px';
      pill.style.padding = '3px 8px';
      pill.style.borderRadius = '15px';
      pill.style.backgroundColor = getRandomColor();
      pill.style.cursor = 'pointer';
      pill.style.color = 'white';
      pill.style.fontSize = '12px';
      pill.style.display = 'inline-block';
  
      // Add click event to open the SourceURI
      pill.addEventListener('click', () => {
        window.open(role.SourceURI, '_blank');
      });
  
      roleContainer.appendChild(pill);
    });
  
    roleBar.appendChild(roleContainer);
  
    // Insert the role bar at the top of the page
    const body = document.body;
    body.insertBefore(roleBar, body.firstChild);
  
    // Adjust the body margin to prevent overlap
    body.style.marginTop = '70px';
    console.log("Role bar injected.");
  }
  
  // Function to remove the role bar
  function removeRoleBar(): void {
    const roleBar = document.getElementById('roleBar');
    if (roleBar) {
      roleBar.remove();
      document.body.style.marginTop = ''; // Reset the margin
      console.log("Role bar removed.");
    } else {
      console.log("No role bar to remove.");
    }
  }
  
  // Function to generate random colors for pills
  function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Listener for messages from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in content script:", message);
  
    if (message.action === 'toggleOverlay') {
      if (message.enabled) {
        console.log("Overlay enabled. Fetching roles...");
        // Fetch and inject the role bar
        fetch('https://raw.githubusercontent.com/Sam-3-git/Azure-RoleAdvisor/main/webscraper/AzureRoleAdvisor.json')
          .then(response => response.json())
          .then(data => {
            injectRoleBar(data);
          })
          .catch(error => {
            console.error("Error fetching roles:", error);
          });
      } else {
        console.log("Overlay disabled.");
        removeRoleBar(); // Remove the role bar
      }
    }
  });
  