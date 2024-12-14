// Get the pills container and the tooltip element
const roleBar = document.getElementById("roleBar");
const tooltip = document.createElement("div");
tooltip.classList.add("tooltip");
document.body.appendChild(tooltip);

// Function to create and display pills
function createRolePill(role) {
  const pill = document.createElement("div");
  pill.classList.add("pill-container"); // Added container for positioning
  const pillText = document.createElement("span");
  pillText.classList.add("pill");
  pillText.innerText = role.roleName.split(' ')[0]; // Get only the first word of role name

  // Add hover functionality
  pillText.addEventListener("mouseenter", () => {
    tooltip.innerText = role.description; // Show role description
    tooltip.style.visibility = "visible";
    tooltip.style.top = `${pill.getBoundingClientRect().top - tooltip.offsetHeight - 5}px`; // Adjust the tooltip position
    tooltip.style.left = `${pill.getBoundingClientRect().left + (pill.offsetWidth / 2) - (tooltip.offsetWidth / 2)}px`; // Center tooltip above the pill
  });

  pillText.addEventListener("mouseleave", () => {
    tooltip.style.visibility = "hidden";
  });

  // Add pill click event (open SourceURI)
  pillText.addEventListener("click", () => {
    window.open(role.SourceURI, "_blank");
  });

  pill.appendChild(pillText);
  roleBar.appendChild(pill);
}

// Function to fetch and display the roles
function fetchAndDisplayRoles() {
  fetch('https://raw.githubusercontent.com/Sam-3-git/Azure-RoleAdvisor/main/webscraper/AzureRoleAdvisor.json')
    .then(response => response.json())
    .then(data => {
      console.log("Fetched data:", data); // Log the fetched data
      if (data && Array.isArray(data)) {
        data.forEach(role => createRolePill(role)); // Loop through the data and create pills
      } else {
        console.error("Invalid data format received.");
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      roleBar.innerHTML = 'Error loading roles.';
    });
}

// Call the function to fetch and display roles when the popup is loaded
document.addEventListener('DOMContentLoaded', fetchAndDisplayRoles);
