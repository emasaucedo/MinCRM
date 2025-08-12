// API Configuration
const API_BASE_URL = "http://localhost:3000/api";

// DOM Elements
const registerForm = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const registerBtn = document.getElementById("registerBtn");
const messageDiv = document.getElementById("message");

// Error message elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// Auth utilities (shared with login)
class AuthUtils {
  static saveToken(token) {
    localStorage.setItem("authToken", token);
  }

  static getToken() {
    return localStorage.getItem("authToken");
  }

  static removeToken() {
    localStorage.removeItem("authToken");
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static redirectIfAuthenticated() {
    if (this.isAuthenticated()) {
      window.location.href = "dashboard.html";
    }
  }
}

// Validation utilities
class ValidationUtils {
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPassword(password) {
    return password.length >= 6;
  }

  static isValidName(name) {
    return name.length >= 2 && name.length <= 50;
  }

  static clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    nameInput.classList.remove("error");
    emailInput.classList.remove("error");
    passwordInput.classList.remove("error");
    confirmPasswordInput.classList.remove("error");
  }

  static showFieldError(field, message) {
    const input = document.getElementById(field);
    const errorElement = document.getElementById(field + "Error");

    input.classList.add("error");
    errorElement.textContent = message;
  }
}

// UI utilities
class UIUtils {
  static showMessage(message, type = "error") {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.classList.remove("hidden");
  }

  static hideMessage() {
    messageDiv.classList.add("hidden");
  }

  static setLoading(isLoading) {
    if (isLoading) {
      registerBtn.disabled = true;
      registerBtn.innerHTML = '<span class="loading"></span> Registrando...';
    } else {
      registerBtn.disabled = false;
      registerBtn.innerHTML = "Registrarse";
    }
  }
}

// Register functionality
class RegisterHandler {
  static async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        // Save token and redirect
        AuthUtils.saveToken(data.data.token);
        UIUtils.showMessage("Registro exitoso. Redirigiendo...", "success");

        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      } else {
        UIUtils.showMessage(data.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Register error:", error);
      UIUtils.showMessage("Error de conexión. Intenta nuevamente.");
    }
  }

  static validateForm() {
    ValidationUtils.clearErrors();
    UIUtils.hideMessage();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    let isValid = true;

    // Validate name
    if (!name) {
      ValidationUtils.showFieldError("name", "El nombre es requerido");
      isValid = false;
    } else if (!ValidationUtils.isValidName(name)) {
      ValidationUtils.showFieldError(
        "name",
        "El nombre debe tener entre 2 y 50 caracteres"
      );
      isValid = false;
    }

    // Validate email
    if (!email) {
      ValidationUtils.showFieldError("email", "El email es requerido");
      isValid = false;
    } else if (!ValidationUtils.isValidEmail(email)) {
      ValidationUtils.showFieldError("email", "Ingrese un email válido");
      isValid = false;
    }

    // Validate password
    if (!password) {
      ValidationUtils.showFieldError("password", "La contraseña es requerida");
      isValid = false;
    } else if (!ValidationUtils.isValidPassword(password)) {
      ValidationUtils.showFieldError(
        "password",
        "La contraseña debe tener al menos 6 caracteres"
      );
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
      ValidationUtils.showFieldError(
        "confirmPassword",
        "Confirma tu contraseña"
      );
      isValid = false;
    } else if (password !== confirmPassword) {
      ValidationUtils.showFieldError(
        "confirmPassword",
        "Las contraseñas no coinciden"
      );
      isValid = false;
    }

    return isValid;
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is already authenticated
  AuthUtils.redirectIfAuthenticated();

  // Form submission
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!RegisterHandler.validateForm()) {
      return;
    }

    const userData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
    };

    UIUtils.setLoading(true);
    await RegisterHandler.register(userData);
    UIUtils.setLoading(false);
  });

  // Real-time validation
  nameInput.addEventListener("blur", () => {
    const name = nameInput.value.trim();
    if (name && !ValidationUtils.isValidName(name)) {
      ValidationUtils.showFieldError(
        "name",
        "El nombre debe tener entre 2 y 50 caracteres"
      );
    }
  });

  emailInput.addEventListener("blur", () => {
    const email = emailInput.value.trim();
    if (email && !ValidationUtils.isValidEmail(email)) {
      ValidationUtils.showFieldError("email", "Ingrese un email válido");
    }
  });

  passwordInput.addEventListener("blur", () => {
    const password = passwordInput.value.trim();
    if (password && !ValidationUtils.isValidPassword(password)) {
      ValidationUtils.showFieldError(
        "password",
        "La contraseña debe tener al menos 6 caracteres"
      );
    }
  });

  confirmPasswordInput.addEventListener("blur", () => {
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    if (confirmPassword && password !== confirmPassword) {
      ValidationUtils.showFieldError(
        "confirmPassword",
        "Las contraseñas no coinciden"
      );
    }
  });

  // Clear errors on input
  nameInput.addEventListener("input", () => {
    nameInput.classList.remove("error");
    nameError.textContent = "";
  });

  emailInput.addEventListener("input", () => {
    emailInput.classList.remove("error");
    emailError.textContent = "";
  });

  passwordInput.addEventListener("input", () => {
    passwordInput.classList.remove("error");
    passwordError.textContent = "";
  });

  confirmPasswordInput.addEventListener("input", () => {
    confirmPasswordInput.classList.remove("error");
    confirmPasswordError.textContent = "";
  });
});
