import express from 'express';
const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// Example of how to add more route modules:
// import userRoutes from './user.routes.js';
// router.use('/users', userRoutes);

export default router; 