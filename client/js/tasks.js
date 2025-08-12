// Tasks functionality
document.addEventListener("DOMContentLoaded", () => {
  // Protect this page - require authentication
  if (!GlobalAuth.requireAuth()) {
    return;
  }

  // Initialize tasks functionality here
  console.log("Tasks page loaded and authenticated");
});
