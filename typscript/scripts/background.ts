// This script will fetch the JSON from GitHub when the extension starts
const jsonUrl: string = 'https://raw.githubusercontent.com/Sam-3-git/Cloud-Compass/refs/heads/main/webscraper/AzureRoleAdvisor.json';

// Import type for RoleData
import { RoleData } from './types';

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
