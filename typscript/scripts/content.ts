// Import RoleData type 
import { RoleData } from './types'; 

// Function to inject the role bar UI
function injectRoleBar(roles: RoleData): void {
  console.log("Injecting role bar...");

  const existingRoleBar = document.getElementById("roleBar");
  if (existingRoleBar) {
    console.log("Role bar already exists. Not injecting again.");
    return;
  }

  const roleBar = document.createElement("div");
  roleBar.classList.add("role-bar");
  roleBar.id = "roleBar";
  roleBar.style.position = "fixed";
  roleBar.style.top = "0";
  roleBar.style.left = "0";
  roleBar.style.width = "100%";
  roleBar.style.backgroundColor = "#0078D4";
  roleBar.style.padding = "5px 0";
  roleBar.style.zIndex = "9999";
  roleBar.style.overflowX = "auto";
  roleBar.style.whiteSpace = "nowrap";

  roles.forEach((role) => {
    const pill = document.createElement("div");
    pill.classList.add("role-pill");
    pill.textContent = role.roleName;
    roleBar.appendChild(pill);
  });

  document.body.appendChild(roleBar);
  console.log("Role bar injected successfully.");
}

// Remove role bar function (same as before)
function removeRoleBar(): void {
  const roleBar = document.getElementById("roleBar");
  if (roleBar) {
    roleBar.remove();
  }
}

// Listener for enable/disable messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "enableUI") {
    chrome.storage.local.get("roleData", (result) => {
      const roleData = result.roleData as RoleData;
      if (roleData) {
        injectRoleBar(roleData);
      }
    });
  } else if (message.action === "disableUI") {
    removeRoleBar();
  }
});
