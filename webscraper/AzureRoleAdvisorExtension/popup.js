chrome.storage.local.get('roleData', (data) => {
    const roleData = data.roleData;
    const roleList = document.getElementById('roleList');
  
    roleData.forEach(role => {
      const roleElement = document.createElement('div');
      roleElement.textContent = role.roleName;
      roleList.appendChild(roleElement);
    });
  });
  