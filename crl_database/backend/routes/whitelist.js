import express from 'express';

// Import controller functions for sign-in from userControllers.js
import { addWhitelistedUser, checkWhitelistUser, getUserRole, updateRole } from '../controllers/whitelistController.js';

const router = express.Router();


router.post('/addUserEmail', addWhitelistedUser)
router.get('/checkWhitelist', checkWhitelistUser)
router.get('/getUserRole', getUserRole)
router.put('/updateRole', updateRole)



export default router