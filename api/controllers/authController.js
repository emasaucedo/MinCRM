import authService from "../services/authService.js";

// Register new user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos",
      });
    }

    // Register user
    const result = await authService.register({ name, email, password });

    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email y contraseña son requeridos",
      });
    }

    // Login user
    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: "Login exitoso",
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error del servidor",
    });
  }
};
