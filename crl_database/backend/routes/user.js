import express from 'express';

// Import controller functions for sign-in from userControllers.js
import { signupUser, loginUser, verifyEmail, updateUserFields } from '../controllers/userController.js';

const router = express.Router();

//Request Handlers connected to userController functions
//Login Route 
router.post('/login', loginUser)
//Signup account route
router.post('/signup', signupUser)

router.post("/verify-email", verifyEmail)

router.post("/update-user", updateUserFields)



export default router
