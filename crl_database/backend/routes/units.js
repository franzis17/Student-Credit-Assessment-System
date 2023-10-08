import express from "express";
import mongoose from "mongoose";
import Unit from "../models/unit.model.js";
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();
router.use(requireAuth)


// ---- [GET] ----

/** Get all units = /units */
router.route("/").get(async (req, res) => {
  try {
    // Get all units from the DB and populate with the reference institution object
    const units = await Unit.find({}).populate("institution", "name");
    res.json(units);
  } catch (err) {
    console.error(`ERROR: ${err}`);
    res.status(500).json(`ERROR: Failed to fetch units. More details: ${err}`);
  }
});

/**
 * Replace the institution field with JUST the institution's
 * name instead of the institution object
 */
function getInstitutionNames(units) {
  const unitsWithInstitutionNames = units.map(unit => ({
    ...unit.toObject(),
    institution: unit.institution.name,  // replace the institution field
  }));
  return unitsWithInstitutionNames;
}


/** Get units specific to an institution */
router.route("/sortedunits").get(async (req, res) => {
  const institutionId = req.query.id; // Get the institution ID from the query parameter

  try {
    // Get all units from the DB that belong to the specified institution
    const units = await Unit.find({ institution: institutionId });

    // Return the list of units
    res.json(units);
  } catch (err) {
    console.error(`ERROR: ${err}`);
    res.status(500).json(`ERROR: Failed to fetch units. More details: ${err}`);
  }
});


/** Get total units count */
router.route("/count").get(async (req, res) => {
  try {
    const count = await Unit.countDocuments({});
    res.json(count);
  } catch(err) {
    console.error(`ERROR: ${err}`);
    res.status(500).json(`ERROR: Failed to fetch unit counts. More details: ${err}`);
  }
});


// ---- [POST] ----

// a unit has this properties = unitCode, name, location, major, institution, status, notes
// Add a unit = /units/add
router.route("/add").post((req, res) => {
  const unitCode    = req.body.unitCode;
  const name        = req.body.name;
  const location    = req.body.location;
  const major       = req.body.major;
  const institution = new mongoose.Types.ObjectId(req.body.institution);
  const notes       = req.body.notes;
  
  // TO DO in the frontend (WHEN adding a Unit):
  // - Implement a dropdown with a search menu, that searches for the institution.
  //   On select --> Retrieve instituion_id selected and put it on the HTTP post request

  const newUnit = new Unit({
    unitCode,
    name,
    location,
    major,
    institution,
    notes,
  });

  newUnit
    .save()
    .then(() => res.json(`Unit [${name}] has been added!`))
    .catch((error) => {

      console.log(`Error when adding a unit.\n>>> ${error}`);
      
      if (error.code === 11000) {
        // Error: Duplicate key (data already exists)
        res.status(400).json({ error: `the unit "${name}" already exists` });
      } else {
        // Other errors
        res.status(500).json(`ERROR when adding a unit. More info: ${error}`);
      }
    });
});


// ---- [UPDATE] ----

// Update a unit's details = /units/update/:id
// TO BE DONE


// ---- [DELETE] ----

// Delete a unit = /units/delete/:id
router.route("/delete").delete(async (req, res) => {
  const unit = req.query.unit;

  console.log("Deleting Unit:");
  console.log(unit);

  // Unit.findByIdAndDelete(unit)
  //   .then(() => res.json("The Unit has been deleted."))
  //   .catch((err) => res.status(400).json("Error:" + err));
});

export default router;
