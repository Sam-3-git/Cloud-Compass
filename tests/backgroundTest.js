// gets the role data stored in local storage. output should be json objects with information about roles. 

chrome.storage.local.get('roleData', function(result) {
    console.log(result.roleData);
  });  