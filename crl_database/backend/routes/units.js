import express from "express";
import Unit from "../models/unit.model.js";

const router = express.Router();

// ---- [GET] -----

// Get all units = /units
router.route("/").get((req, res) => {
  Unit.find()
    .then((units) => res.json(units))
    .catch((err) => res.status(400).json("Error:" + err));
});

// ---- [POST] -----

// a unit has this properties = unitCode, name, location, major, institution, status, notes
// Add a unit = /units/add
router.route("/add").post((req, res) => {
  const unitCode = req.body.unitCode;
  const name = req.body.name;
  const location = req.body.location;
  const major = req.body.major;

  // TO BE DONE - [Setting an *institution* reference]
  // Referring an institution object inside a Unit (Since a Unit belongs in an Institution):
  // 1. Retrieve an institution given the institution's name
  //     a. IF [institution DOES NOT EXIST] display error "Institution does not exist"
  //     b. IF [institution EXIST] get the institution's objectID
  //         i. Set the institution's objectID in to unit.institution so unit can refer to it

  // TBD --> const institution = new ObjectID(req.body.institution_id);  // NEED TO IMPORT `ObjectID` data type
  
  // const status = Number(req.body.status);
  const notes = req.body.notes;

  const newUnit = new Unit({
    unitCode,
    name,
    location,
    major,
    notes,
  });

  newUnit
    .save()
    .then(() => res.json("Unit has been added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// ---- [UPDATE] -----

// Update a unit's details = /units/update/:id
// TO BE DONE

// ---- [DELETE] -----

// Delete a unit = /units/delete/:id
router.route("/delete/:id").delete((req, res) => {
  Unit.findByIdAndDelete(req.params.id)
    .then(() => res.json("The Unit has been deleted."))
    .catch((err) => res.status(400).json("Error:" + err));
});

export default router;
