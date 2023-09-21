import express from 'express';

// Import controller functions for sign-in from userControllers.js
import { signupUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

//Request Handlers connected to userController functions
//Login Route 
router.post('/login', loginUser)
//Signup account route
router.post('/signup', signupUser)

export default router