import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all contact routes
router.use(authenticateToken);

// GET /api/contacts - Get all contacts
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Lista de contactos",
    data: {
      contacts: [],
      user: req.user.name, // User info from auth middleware
    },
  });
});

// POST /api/contacts - Create new contact
router.post("/", (req, res) => {
  res.json({
    success: true,
    message: "Contacto creado",
    data: {
      contact: req.body,
      createdBy: req.user.name,
    },
  });
});

export default router;
