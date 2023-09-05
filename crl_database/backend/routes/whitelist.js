import express from 'express';

// Import controller functions for sign-in from userControllers.js
import { addWhitelist } from '../controllers/whitelistController.js';

const router = express.Router();

//Request Handlers connected to userController functions
//Login Route 
router.post('/whitelist', addWhitelist)
//Signup account route

export default router