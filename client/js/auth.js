// Global Auth Utilities
const API_BASE_URL = "http://localhost:3000/api";

class GlobalAuth {
  static getToken() {
    return localStorage.getItem("authToken");
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static logout() {
    localStorage.removeItem("authToken");
    window.location.href = "login.html";
  }

  static redirectToLogin() {
    window.location.href = "login.html";
  }

  static redirectToDashboard() {
    window.location.href = "dashboard.html";
  }

  // Protect pages that require authentication
  static requireAuth() {
    if (!this.isAuthenticated()) {
      this.redirectToLogin();
      return false;
    }
    return true;
  }

  // Redirect if already authenticated (for login/register pages)
  static redirectIfAuthenticated() {
    if (this.isAuthenticated()) {
      this.redirectToDashboard();
      return true;
    }
    return false;
  }

  // Make authenticated API requests
  static async fetchWithAuth(url, options = {}) {
    const token = this.getToken();

    if (!token) {
      this.redirectToLogin();
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // If unauthorized, redirect to login
      if (response.status === 401 || response.status === 403) {
        this.logout();
        return;
      }

      return response;
    } catch (error) {
      console.error("API Request error:", error);
      throw error;
    }
  }

  // Get user profile
  static async getUserProfile() {
    try {
      const response = await this.fetchWithAuth(`${API_BASE_URL}/auth/profile`);

      if (response && response.ok) {
        const data = await response.json();
        return data.success ? data.data.user : null;
      }
      return null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
  }

  // Initialize auth state on page load
  static init() {
    // Add logout functionality to any logout buttons
    document.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("logout-btn") ||
        e.target.id === "logoutBtn"
      ) {
        e.preventDefault();
        this.logout();
      }
    });
  }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  GlobalAuth.init();
});

// Export for use in other scripts
window.GlobalAuth = GlobalAuth;
