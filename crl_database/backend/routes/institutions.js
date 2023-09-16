import express from "express";
import Institution from "../models/institution.model.js";

const router = express.Router();

// ---- [GET] ----

// Get all institutions = /institutions
router.route("/").get((req, res) => {
  Institution.find()
    .then((institutions) => res.json(institutions))
    .catch((err) => res.status(400).json("Error:" + err));
});

// ---- [POST] ----

// Add an institution = /institutions/add
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const rank = req.body.rank;
  const location = req.body.location;
  const major = req.body.major;
  const notes = req.body.notes;

  const newInstitution = new Institution({
    name,
    rank,
    location,
    major,
    notes,
  });

  newInstitution
    .save()
    .then(() => res.json("The institution has been added"))
    .catch((err) => res.status(400).json("Error:" + err));
});

// ---- [UPDATE] ----

// Update an institution = /institutions/update/:id
router.route("/update/:id").post((req, res) => {
  Institution.findById(req.params.id)
    .then((institution) => {
      institution.name = req.body.name;
      institution.rank = req.body.rank;
      institution.location = req.body.location;
      institution.major = req.body.major;
      institution.notes = req.body.notes;

      institution
        .save()
        .then(() => res.json("Institution has been updated!"))
        .catch((err) => res.status(400).json("ERROR when updating institutions: " + err.message));
    })
    .catch((err) => res.status(400).json("Error:" + err.message));
});

// ---- [DELETE] ----

// Delete an institution = /institutions/delete/:id
router.route("/delete/:id").delete((req, res) => {
  Institution.findByIdAndDelete(req.params.id)
    .then(() => res.json("Institution deleted."))
    .catch((err) => res.status(400).json("Error:" + err));
});

export default router;
