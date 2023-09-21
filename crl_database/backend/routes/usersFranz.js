import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

// ---- [GET] ----

// Get all users = /users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

// ---- [POST] ----

// Add a user = /users/add
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  const newUser = new User({
    username,
    password,
    role,
  });

  newUser
    .save()
    .then(() => res.json("User is added!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

// ---- [UPDATE] ----

// Update a user's details = /users/update/:id
router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.username = req.body.username;
      user.password = req.body.password;
      user.role = req.body.role;

      user
        .save()
        .then(() => res.json("User details updated!"))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

// Update a user's password = /users/updatePass/:id
// Code here...

// ---- [DELETE] ----

// Delete a user = /users/delete/:id
router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/count").get(async (req, res) => {
  try {
    const count = await countInstitutions();
    res.json({ count });
  } catch (error) {
    res.status(500).json("Error counting institutions: " + error.message);
  }
});

export default router;
