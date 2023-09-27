import express from 'express';
import WhitelstdUser from "../models/whitelistModel.js";
import requireAuth from '../middleware/requireAuth.js';

// Import controller functions for sign-in from userControllers.js
import { addWhitelistedUser, checkWhitelistUser, getUserRole, updateRole } from '../controllers/whitelistController.js';

const router = express.Router();
router.use(requireAuth)


router.post('/addUserID', addWhitelistedUser)
router.get('/checkWhitelist', checkWhitelistUser)
router.get('/getUserRole', getUserRole)
router.put('/updateRole', updateRole)

//fetch all users
router.route("/getWhitelistedUsers").get((req, res) => {
  WhitelstdUser.find()
    .then((WhitelstdUser) => res.json(WhitelstdUser))
    .catch((err) => res.status(400).json("Error:" + err));
});

//Delete a user
router.route("/delete/:id").delete((req, res) => {
  WhitelstdUser.findByIdAndDelete(req.params.id)
    .then((result) => {
      if(result) {
        res.json({ message: "User deleted.", data: result });
      } else {
        res.status(404).json({ message: "User not found." });
      }
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

export default router