document.addEventListener('DOMContentLoaded', function () {
  const toggleContent = document.getElementById('toggleContent');
  const searchBar = document.getElementById('search-bar');
  const roleBar = document.getElementById('roleBar');
  
  // Handle content script toggle
  toggleContent.addEventListener('change', function () {
    if (toggleContent.checked) {
      chrome.scripting.executeScript({
        target: { tabId: chrome.tabs.TAB_ID },  // Ensure this targets the correct tab
        function: enableContentScript
      });
    } else {
      // Optionally handle disabling content script
    }
  });

  // Function to enable content script
  function enableContentScript() {
    console.log('Content script enabled!');
    // Insert logic for content.js here
  }

  // Search bar functionality
  searchBar.addEventListener('input', function () {
    const query = searchBar.value.toLowerCase();
    const pills = roleBar.querySelectorAll('.pill');
    pills.forEach(pill => {
      const pillText = pill.textContent.toLowerCase();
      pill.style.display = pillText.includes(query) ? 'block' : 'none';
    });
  });

  // Example: Fetch roles data (mock example)
  const mockData = [
    { roleName: 'Contributor' },
    { roleName: 'Reader' },
    { roleName: 'Owner' }
  ];

  // Display pills based on data
  mockData.forEach(role => {
    const pill = document.createElement('div');
    pill.classList.add('pill');
    pill.textContent = role.roleName;
    roleBar.appendChild(pill);
  });
});
