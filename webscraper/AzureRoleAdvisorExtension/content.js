// This will check if the current page in the Azure portal relates to a role-based resource
const currentPage = window.location.href;

chrome.storage.local.get('roleData', (data) => {
  const roleData = data.roleData;
  
  // This is a basic check for testing purposes. will update with better logic
  if (currentPage.includes('role-based-access-control')) {
    console.log("Azure RBAC Role Advisor is active on this page.");
    // For now, displaying all roles
    roleData.forEach(role => {
      console.log(role.roleName);
    });
  }
});
