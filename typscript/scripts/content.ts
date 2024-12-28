console.log("Extension: Cloud Compass");

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

    // Create the tooltip for hover text
    const tooltip = document.createElement("span");
    tooltip.textContent = "Cloud Compass";
    tooltip.style.position = "absolute";
    tooltip.style.backgroundColor = "#333";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "5px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.visibility = "hidden"; // Hidden by default
    tooltip.style.opacity = "0";
    tooltip.style.transition = "visibility 0s, opacity 0.2s linear"; // Smooth fade-in/out
    tooltip.style.zIndex = "1000"; // Ensure it's on top of other elements
    compassContainer.appendChild(tooltip);

    // Show tooltip on hover
    compassContainer.addEventListener("mouseenter", () => {
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";
        compassContainer.style.backgroundColor = "#f0f0f0"; // Change background on hover
    });

    // Hide tooltip and reset background when hover ends
    compassContainer.addEventListener("mouseleave", () => {
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = "0";
        compassContainer.style.backgroundColor = "transparent"; // Reset background
    });

    // Event listener for click (to show the pop-up box)
    compassContainer.addEventListener("click", () => {
        showPopupBox();
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

// Function to create and show a small pop-up box
function showPopupBox(): void {
    // Create the pop-up box
    const popupBox = document.createElement("div");
    popupBox.id = "popup-box";
    popupBox.style.position = "fixed";
    popupBox.style.left = "50%";
    popupBox.style.top = "50%";
    popupBox.style.transform = "translate(-50%, -50%)";
    popupBox.style.padding = "20px";
    popupBox.style.backgroundColor = "#fff";
    popupBox.style.border = "1px solid #ccc";
    popupBox.style.borderRadius = "8px";
    popupBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    popupBox.style.zIndex = "1001"; // Ensure it's above other content

    // Add content to the pop-up box
    const popupText = document.createElement("p");
    popupText.textContent = "This is a small pop-up box!";
    popupBox.appendChild(popupText);

    // Create a close button for the pop-up box
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.style.marginTop = "10px";
    closeButton.addEventListener("click", () => {
        popupBox.remove(); // Close the pop-up when the button is clicked
    });
    popupBox.appendChild(closeButton);

    // Append the pop-up box to the body
    document.body.appendChild(popupBox);
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
