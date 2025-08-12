import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all task routes
router.use(authenticateToken);

// GET /api/tasks - Get all tasks
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Lista de tareas",
    data: {
      tasks: [],
      user: req.user.name, // User info from auth middleware
    },
  });
});

// POST /api/tasks - Create new task
router.post("/", (req, res) => {
  res.json({
    success: true,
    message: "Tarea creada",
    data: {
      task: req.body,
      assignedTo: req.user.name,
    },
  });
});

export default router;
