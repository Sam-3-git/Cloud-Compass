console.log("Extension: Cloud Compass");
// Import type for RoleData
import { RoleData } from './types';

// URI for role data
const jsonUrl: string = 'https://raw.githubusercontent.com/Sam-3-git/Cloud-Compass/refs/heads/main/webscraper/AzureRoleAdvisor.json';

// Function to add the Cloud Compass element
function addCloudCompassElement(): void {
    const azureHeading = document.querySelector('h1');
    if (!azureHeading || azureHeading.textContent?.trim() !== "Microsoft Azure") {
        console.warn("Azure heading not found or text mismatch. Element will not be added.");
        return;
    }

    // Check if the element already exists
    const existingElement = document.getElementById("cloud-compass");
    if (existingElement) {
        console.info("Cloud Compass element already exists. Skipping creation.");
        return;
    }

    // Create the Cloud Compass container
    const compassContainer = document.createElement("div");
    compassContainer.id = "cloud-compass";
    compassContainer.style.display = "inline-flex";
    compassContainer.style.alignItems = "center";
    compassContainer.style.marginLeft = "10px"; // Adjust spacing to the right of the Azure heading
    compassContainer.style.cursor = "pointer"; // Change cursor to pointer (clickable)

    // Add text to the container
    const text = document.createElement("span");
    text.textContent = "Cloud Compass";
    text.style.color = "#0078d4"; // Azure blue color
    text.style.fontWeight = "bold";
    text.style.fontSize = "16px";
    compassContainer.appendChild(text);

    // Show tooltip on hover
    compassContainer.addEventListener("mouseenter", () => {
        compassContainer.style.backgroundColor = "#f0f0f0"; // Change background on hover
    });

    // Hide tooltip and reset background when hover ends
    compassContainer.addEventListener("mouseleave", () => {

        compassContainer.style.backgroundColor = "transparent"; // Reset background
    });

    // Event listener for click (to show the pop-up box)
    compassContainer.addEventListener("click", () => {
        showSearchBox();
    });

    // Insert the container next to the Azure heading
    azureHeading.style.display = "inline-flex";
    azureHeading.style.alignItems = "center";
    azureHeading.parentElement?.insertBefore(compassContainer, azureHeading.nextSibling);

    console.log("Cloud Compass element added successfully.");
}

// Function to remove the Cloud Compass element
function removeCloudCompassElement(): void {
    const compassElement = document.getElementById("cloud-compass");
    if (compassElement) {
        compassElement.remove();
        console.log("Cloud Compass element removed successfully.");
    } else {
        console.warn("No Cloud Compass element found to remove.");
    }
}

/// Function to create and show the search box
function showSearchBox(): void {
  // Create the search box container
  const searchBox = document.createElement("div");
  searchBox.id = "search-box";
  searchBox.style.position = "fixed";
  searchBox.style.left = "50%";
  searchBox.style.top = "50%";
  searchBox.style.transform = "translate(-50%, -50%)";
  searchBox.style.padding = "20px";
  searchBox.style.backgroundColor = "#fff";
  searchBox.style.border = "1px solid #ccc";
  searchBox.style.borderRadius = "8px";
  searchBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  searchBox.style.zIndex = "1001"; // Ensure it's above other content
  searchBox.style.maxWidth = "500px"; // Limit the width
  searchBox.style.width = "100%"; // Allow responsive sizing
  searchBox.style.maxHeight = "400px"; // Limit the height
  searchBox.style.overflowY = "auto"; // Allow scrolling if content overflows

  // Add search input
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search roles...";
  searchInput.style.width = "100%";
  searchInput.style.maxWidth = "480px";
  searchInput.style.padding = "8px";
  searchInput.style.border = "1px solid #ccc";
  searchInput.style.color = "#333";
  searchInput.style.boxSizing = "border-box";
  searchInput.style.padding = "10px";
  searchInput.style.marginBottom = "10px";
  searchBox.appendChild(searchInput);

  // Add results container
  const resultsContainer = document.createElement("div");
  resultsContainer.id = "search-results";
  resultsContainer.style.padding = "8px";
  resultsContainer.style.backgroundColor = "#f9f9f9";
  resultsContainer.style.borderRadius = "4px";
  resultsContainer.style.marginBottom = "10px";
  resultsContainer.style.maxHeight = "300px";
  resultsContainer.style.overflowY = "scroll";
  resultsContainer.style.overflowX = "hidden";
  resultsContainer.style.scrollbarWidth = "thin";
  resultsContainer.style.scrollBehavior = "smooth";
  resultsContainer.style.boxSizing = "border-box";
  resultsContainer.style.border = "1px solid #888080";
  resultsContainer.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
  resultsContainer.style.display = "flex";
  resultsContainer.style.flexDirection = "column";
  resultsContainer.style.flexBasis = "content";
  searchBox.appendChild(resultsContainer);

  // Create a close button for the search box
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.marginTop = "10px";
  closeButton.addEventListener("click", () => {
      searchBox.remove(); // Close the search box when the button is clicked
  });
  searchBox.appendChild(closeButton);

  // Append the search box to the body
  document.body.appendChild(searchBox);

  // Fetch and display roles
  loadRoles();
  searchInput.addEventListener("input", (e) => {
      filterRoles(e.target as HTMLInputElement);
  });
}


// Function to fetch role data from Chrome storage
function loadRoles(): void {
    chrome.storage.local.get("roleData", (result) => {
        const roleData = result.roleData || {};
        displayRoles(roleData);
    });
}

// Function to display roles
function displayRoles(roleData: any): void {
    const resultsContainer = document.getElementById("search-results")!;
    resultsContainer.innerHTML = ""; // Clear previous results
    Object.keys(roleData).forEach((key) => {
        const role = roleData[key];
        const pillElement = document.createElement("div");
        pillElement.classList.add("role-pill");
        pillElement.textContent = role.roleName;
        pillElement.style.padding = "10px 15px";
        pillElement.style.width = "fit-content";
        pillElement.style.display = "inline-block";
        pillElement.style.backgroundColor = "#0078d4";
        pillElement.style.color = "#fff";
        pillElement.style.borderRadius = "20px";
        pillElement.style.fontWeight = "bold";
        pillElement.style.cursor = "pointer";
        pillElement.style.whiteSpace = "break-spaces";
        pillElement.style.wordBreak = "break-word";
        pillElement.style.margin ="2px";
        const descriptionElement = document.createElement("div");
        descriptionElement.classList.add("description");
        descriptionElement.textContent = role.description;
        pillElement.appendChild(descriptionElement);

        pillElement.addEventListener("click", () => {
            window.open(role.SourceURI, "_blank");
        });

        resultsContainer.appendChild(pillElement);
    });
}

// Function to filter roles based on search input
function filterRoles(input: HTMLInputElement): void {
    const query = input.value.toLowerCase();
    chrome.storage.local.get("roleData", (result) => {
        const roleData = result.roleData || {};
        const filteredData = Object.keys(roleData)
            .filter((key) => {
                const role = roleData[key];
                return role.roleName.toLowerCase().includes(query) || 
                       (role.description && role.description.toLowerCase().includes(query));
            })
            .reduce((obj, key) => {
                obj[key] = roleData[key];
                return obj;
            }, {} as RoleData);
        displayRoles(filteredData);
    });
}

// Overlay toggle listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "enableUI") {
        if (message.enabled) {
            console.log("Overlay toggle enabled.");
            addCloudCompassElement();
        } else {
            console.log("Overlay toggle disabled.");
            removeCloudCompassElement();
        }
    } else {
        console.log("Overlay toggle disabled.");
        removeCloudCompassElement();
    }
});

// Fetch JSON data when the extension is installed
chrome.runtime.onInstalled.addListener((): void => {
  fetch(jsonUrl)
    .then((response: Response) => response.json())
    .then((data: RoleData) => {
      chrome.storage.local.set({ roleData: data }, (): void => {
        console.log("RBAC JSON data stored successfully!");
      });
    })
    .catch((error: Error) => console.error("Error fetching RBAC data:", error));
});