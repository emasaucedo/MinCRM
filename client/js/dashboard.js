// Dashboard functionality
document.addEventListener("DOMContentLoaded", async () => {
  // Protect this page - require authentication
  if (!GlobalAuth.requireAuth()) {
    return;
  }

  // Get user info and display
  await loadUserInfo();
});

async function loadUserInfo() {
  try {
    const user = await GlobalAuth.getUserProfile();

    if (user) {
      document.getElementById("userName").textContent = `Hola, ${user.name}`;
    } else {
      document.getElementById("userName").textContent = "Usuario";
    }
  } catch (error) {
    console.error("Error loading user info:", error);
    document.getElementById("userName").textContent = "Usuario";
  }
}
