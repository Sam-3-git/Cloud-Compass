document.addEventListener('DOMContentLoaded', () => {
  // Create a tooltip element to display role descriptions on hover
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  document.body.appendChild(tooltip);

  // Container for the role pills
  const roleBar = document.getElementById("roleBar");

  // Fetch data from the JSON URL
  fetch('https://raw.githubusercontent.com/Sam-3-git/Azure-RoleAdvisor/main/webscraper/AzureRoleAdvisor.json')
    .then(response => response.json())
    .then(data => {
      console.log("Fetched data:", data); // Log the fetched data
      // Assuming data contains a roles array
      data.forEach(role => {
        createRolePill(role); // Create a pill for each role
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });

  // Function to create a role pill
  function createRolePill(role) {
    const pill = document.createElement("div");
    pill.classList.add("pill-container");

    const pillText = document.createElement("span");
    pillText.classList.add("pill");
    pillText.innerText = role.roleName.split(' ')[0]; // Display first part of the role name

    // Log pill creation for debugging
    console.log("Creating pill for:", pillText.innerText);

    pillText.addEventListener("mouseenter", () => {
      tooltip.innerText = role.description;
      tooltip.style.visibility = "visible";
      tooltip.style.top = `${pill.getBoundingClientRect().top - tooltip.offsetHeight - 5}px`;
      tooltip.style.left = `${pill.getBoundingClientRect().left + (pill.offsetWidth / 2) - (tooltip.offsetWidth / 2)}px`;
    });

    pillText.addEventListener("mouseleave", () => {
      tooltip.style.visibility = "hidden";
    });

    pillText.addEventListener("click", () => {
      window.open(role.SourceURI, "_blank");
    });

    pill.appendChild(pillText);
    roleBar.appendChild(pill);
  }
});
