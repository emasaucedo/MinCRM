// Script de prueba completa del sistema de autenticación
const API_BASE_URL = "http://localhost:3000";

class AuthSystemTester {
  constructor() {
    this.testResults = [];
    this.testToken = null;
    this.testUser = null;
  }

  log(message, type = "info") {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${type.toUpperCase()}: ${message}`);
    this.testResults.push({ timestamp, type, message });
  }

  async runAllTests() {
    this.log("🚀 Iniciando pruebas del sistema de autenticación");

    try {
      await this.testBasicConnection();
      await this.testRegisterEndpoint();
      await this.testLoginEndpoint();
      await this.testProtectedEndpoint();
      await this.testInvalidToken();
      await this.testFrontendFlow();

      this.log("✅ Todas las pruebas completadas");
      this.showResults();
    } catch (error) {
      this.log(`❌ Error general en las pruebas: ${error.message}`, "error");
    }
  }

  async testBasicConnection() {
    this.log("🔍 Probando conexión básica al servidor...");

    try {
      const response = await fetch(`${API_BASE_URL}/`);
      const data = await response.json();

      if (response.ok && data.message) {
        this.log("✅ Conexión básica exitosa");
        return true;
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
    } catch (error) {
      this.log(`❌ Error de conexión: ${error.message}`, "error");
      throw error;
    }
  }

  async testRegisterEndpoint() {
    this.log("🔍 Probando endpoint de registro...");

    this.testUser = {
      name: "Usuario Test",
      email: `test${Date.now()}@example.com`,
      password: "123456",
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.testUser),
      });

      const data = await response.json();

      if (data.success && data.data.token) {
        this.testToken = data.data.token;
        this.log(`✅ Registro exitoso - Usuario: ${this.testUser.email}`);
        this.log(`✅ Token recibido: ${this.testToken.substring(0, 20)}...`);
        return true;
      } else {
        throw new Error(`Error en registro: ${data.message}`);
      }
    } catch (error) {
      this.log(`❌ Error en registro: ${error.message}`, "error");
      throw error;
    }
  }

  async testLoginEndpoint() {
    this.log("🔍 Probando endpoint de login...");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.testUser.email,
          password: this.testUser.password,
        }),
      });

      const data = await response.json();

      if (data.success && data.data.token) {
        this.testToken = data.data.token;
        this.log(`✅ Login exitoso - Usuario: ${data.data.user.name}`);
        this.log(
          `✅ Nuevo token recibido: ${this.testToken.substring(0, 20)}...`
        );
        return true;
      } else {
        throw new Error(`Error en login: ${data.message}`);
      }
    } catch (error) {
      this.log(`❌ Error en login: ${error.message}`, "error");
      throw error;
    }
  }

  async testProtectedEndpoint() {
    this.log("🔍 Probando endpoint protegido (perfil)...");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.testToken}`,
        },
      });

      const data = await response.json();

      if (data.success && data.data.user) {
        this.log(
          `✅ Acceso a perfil exitoso - Usuario: ${data.data.user.name}`
        );
        this.log(`✅ Email verificado: ${data.data.user.email}`);
        return true;
      } else {
        throw new Error(`Error al acceder al perfil: ${data.message}`);
      }
    } catch (error) {
      this.log(`❌ Error en endpoint protegido: ${error.message}`, "error");
      throw error;
    }
  }

  async testInvalidToken() {
    this.log("🔍 Probando protección con token inválido...");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token-invalido-123",
        },
      });

      if (response.status === 403 || response.status === 401) {
        this.log("✅ Protección de rutas funcionando correctamente");
        return true;
      } else {
        throw new Error("El servidor no rechazó el token inválido");
      }
    } catch (error) {
      this.log(
        `❌ Error en prueba de token inválido: ${error.message}`,
        "error"
      );
      throw error;
    }
  }

  async testFrontendFlow() {
    this.log("🔍 Simulando flujo completo del frontend...");

    try {
      // Simular almacenamiento en localStorage
      localStorage.setItem("authToken", this.testToken);
      this.log("✅ Token guardado en localStorage");

      // Verificar que el token se puede recuperar
      const storedToken = localStorage.getItem("authToken");
      if (storedToken === this.testToken) {
        this.log("✅ Token recuperado correctamente de localStorage");
      } else {
        throw new Error("Error al recuperar token de localStorage");
      }

      // Simular logout
      localStorage.removeItem("authToken");
      const removedToken = localStorage.getItem("authToken");
      if (!removedToken) {
        this.log("✅ Logout exitoso - Token eliminado de localStorage");
      } else {
        throw new Error("Error al eliminar token de localStorage");
      }

      return true;
    } catch (error) {
      this.log(`❌ Error en flujo de frontend: ${error.message}`, "error");
      throw error;
    }
  }

  showResults() {
    this.log("📊 RESUMEN DE PRUEBAS:");

    const successCount = this.testResults.filter((r) =>
      r.message.includes("✅")
    ).length;
    const errorCount = this.testResults.filter(
      (r) => r.type === "error"
    ).length;

    this.log(`✅ Pruebas exitosas: ${successCount}`);
    this.log(`❌ Errores encontrados: ${errorCount}`);

    if (errorCount === 0) {
      this.log("🎉 SISTEMA DE AUTENTICACIÓN FUNCIONANDO CORRECTAMENTE");
    } else {
      this.log("⚠️ Se encontraron errores que necesitan ser corregidos");
    }
  }
}

// Ejecutar las pruebas
const tester = new AuthSystemTester();
tester.runAllTests();
