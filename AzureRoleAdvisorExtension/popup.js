// popup.js
document.addEventListener('DOMContentLoaded', function() {
  const roles = getRoles();  // Hypothetical function to get roles
  
  // Check if `roles` is an array before using forEach
  if (Array.isArray(roles)) {
    roles.forEach(role => {
      console.log(role);  // Do something with each role
    });
  } else {
    console.error("Roles data is not an array or is undefined");
  }
});

