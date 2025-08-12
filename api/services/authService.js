import jwt from "jsonwebtoken";
import User from "../models/User.js";

class AuthService {
  // Generate JWT token
  generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    });
  }

  // Register new user
  async register(userData) {
    try {
      const { name, email, password } = userData;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("El usuario ya existe");
      }

      // Create new user
      const user = new User({
        name,
        email,
        password,
      });

      await user.save();

      // Generate token
      const token = this.generateToken(user._id);

      return {
        user,
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  // Login user
  async login(email, password) {
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Credenciales inválidas");
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new Error("Credenciales inválidas");
      }

      // Generate token
      const token = this.generateToken(user._id);

      return {
        user,
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  // Verify token
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      );
      const user = await User.findById(decoded.userId);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      return user;
    } catch (error) {
      throw new Error("Token inválido");
    }
  }
}

export default new AuthService();
