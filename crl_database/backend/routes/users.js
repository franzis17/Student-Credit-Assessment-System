import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

// ---- [GET] ----

// Get all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

// ---- [POST] ----

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  const newUser = new User({ username, password, role });

  newUser
    .save()
    .then(() => res.json("User is added!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

// ---- [UPDATE] ----

// update route to be added

// ---- [DELETE] ----

// delete route to be added

export default router;
