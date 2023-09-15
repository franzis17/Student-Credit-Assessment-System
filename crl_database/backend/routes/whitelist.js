import express from 'express';

// Import controller functions for sign-in from userControllers.js
import { addWhitelistedUser, checkWhitelistUser, getUserRole, updateRole } from '../controllers/whitelistController.js';

const router = express.Router();


router.post('/addUserEmail', addWhitelistedUser)
router.get('/checkWhitelist', checkWhitelistUser)
router.get('/getUserRole', getUserRole)
router.put('/updateRole', updateRole)


/* router.route("/").get((req, res) => {
  Institution.find()
    .then((institutions) => res.json(institutions))
    .catch((err) => res.status(400).json("Error:" + err));
});*/




export default router