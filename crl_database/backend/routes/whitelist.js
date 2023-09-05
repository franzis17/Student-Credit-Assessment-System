import express from 'express';

// Import controller functions for sign-in from userControllers.js
import { addWhitelistedUser, checkWhitelistUser } from '../controllers/whitelistController.js';

const router = express.Router();


router.post('/addUserEmail', addWhitelistedUser)
router.get('/checkWhitelist', checkWhitelistUser)

export default router