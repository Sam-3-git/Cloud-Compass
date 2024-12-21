// This script will fetch the JSON from GitHub when the extension starts
const jsonUrl = 'https://raw.githubusercontent.com/Sam-3-git/Cloud-Compass/refs/heads/main/webscraper/AzureRoleAdvisor.json';
// Fetch JSON data when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    fetch(jsonUrl)
        .then((response) => response.json())
        .then((data) => {
        chrome.storage.local.set({ roleData: data }, () => {
            console.log("RBAC JSON data stored successfully!");
        });
    })
        .catch((error) => console.error("Error fetching RBAC data:", error));
});
export {};
