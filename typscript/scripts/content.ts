// Function to inject the role bar UI
function injectRoleBar(roles: RoleData): void {
  console.log("Injecting role bar...");

  // Check if the role bar already exists
  const existingRoleBar = document.getElementById("roleBar");
  if (existingRoleBar) {
    console.log("Role bar already exists. Not injecting again.");
    return;
  }

  // Create the role bar container
  const roleBar = document.createElement("div");
  roleBar.classList.add("role-bar");
  roleBar.id = "roleBar";

  // Apply styles to the role bar
  roleBar.style.position = "fixed";
  roleBar.style.top = "0";
  roleBar.style.left = "0";
  roleBar.style.width = "100%";
  roleBar.style.backgroundColor = "#0078D4";
  roleBar.style.padding = "5px 0";
  roleBar.style.zIndex = "9999";
  roleBar.style.overflowX = "auto";
  roleBar.style.whiteSpace = "nowrap";

  // Create and append pills for each role
  roles.forEach((role) => {
    const pill = document.createElement("div");
    pill.classList.add("role-pill");
    pill.textContent = role.roleName;
    roleBar.appendChild(pill);
  });

  // Append the role bar to the document body
  document.body.appendChild(roleBar);
  console.log("Role bar injected successfully.");
}

// Function to remove the role bar UI
function removeRoleBar(): void {
  console.log("Removing role bar...");
  const roleBar = document.getElementById("roleBar");
  if (roleBar) {
    roleBar.remove();
    console.log("Role bar removed successfully.");
  } else {
    console.log("Role bar not found. Nothing to remove.");
  }
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);

  if (message.action === "enableUI") {
    console.log("Enabling UI...");
    // Fetch roles from storage and inject the UI
    chrome.storage.local.get("roleData", (result) => {
      const roleData = result.roleData as RoleData;
      if (roleData) {
        injectRoleBar(roleData);
      } else {
        console.error("No role data found in local storage.");
      }
    });
  } else if (message.action === "disableUI") {
    console.log("Disabling UI...");
    removeRoleBar(); // Remove the injected UI
  }
});
