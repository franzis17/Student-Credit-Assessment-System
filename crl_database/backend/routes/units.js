import express from "express";
import mongoose from "mongoose";
import Unit from "../models/unit.model.js";
import Institution from "../models/institution.model.js";
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();
router.use(requireAuth);


// ---- [GET] ----

/** Get all units = /units */
router.route("/").get(async (req, res) => {
  try {
    let units;
    units = await Unit.find().populate("institution");
    res.json(units);
  } catch (err) {
    console.error(`ERROR: ${err}`);
    res.status(500).json(`ERROR: Failed to fetch units. More details: ${err}`);
  }
});

/**
 * [/units/institution/{institution_id}]
 * GET the List of Units for a given institution
 */
router.route("/institution").get((req, res) => {
  const institution = req.query.institution;
  
  console.log("querying an institution's units, institution id = " + institution);
  
  Unit.find({ institution: institution })
    .populate("institution")
    .then((units) => {
      console.log("units =", units);
      res.json(units)
    })
    .catch((err) => {
      console.error(`ERROR: ${err}`);
      res.status(500).json(`ERROR: Failed to retrieve the institution's units.\nMore details: ${err}`);
    });
});

/**
 * [ /units/curtin ]
 * Get Curtin's Units. Used in assessment page to credit other instutition's units.
 */
router.route("/curtin").get(async (req, res) => {
  try {
    console.log(">>> GETTING curtin units...");
    // 1. Find institution using its name "Curtin University"
    const curtinName = "Curtin University";
    const curtin = await Institution.findOne({ name: curtinName });
    
    if (!curtin) {
      throw Error("Curtin doesn't exist");
    }
    
    // 2. Using Curtin's "_id" (object id), get all units of Curtin
    const curtinUnits = await Unit.find({ institution: curtin._id }).populate("institution");
    res.json(curtinUnits);
  }
  catch (error) {
    console.error("ERROR:", error);
    res.status(500).json("ERROR: Failed to fetch units.\nMore details:", err);
  }
});


/**
 * [/units/sortedunits] 
 * Get units specific to an institution 
 */
router.route("/sortedunits").get(async (req, res) => {
  const institutionId = req.query.institutionId;
  console.log('Received institutionId:', institutionId);

  try {
    const units = await Unit.find({ institution: institutionId }).populate("institution");

    console.log('Retrieved units:', units);

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
  console.log("INSTITUTION ID = " + req.body.institution)
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


router.route("/update/:id").put((req, res) => {
  const unitId = req.params.id;
  const updatedUnitData = req.body;

  Unit.findByIdAndUpdate(unitId, updatedUnitData, { new: true })
    .then((updatedUnit) => {
      if (!updatedUnit) {
        return res.status(404).json("Unit not found.");
      }
      res.json(updatedUnit);
    })
    .catch((err) => res.status(500).json("Error: " + err));
});


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


router.route("/institution-unit-delete/:institutionId").delete(async (req, res) => {
  const institutionId = req.params.institutionId;

  try {
    const deletedUnits = await Unit.deleteMany({ institution: institutionId });
    if (deletedUnits.deletedCount > 0) {
      res.json(`Deleted ${deletedUnits.deletedCount} units associated with institution ID ${institutionId}`);
    } else {
      res.json(`No units associated with institution ID ${institutionId}`);
    }
  } catch (err) {
    console.error(`ERROR: ${err}`);
    res.status(500).json(`ERROR: Failed to delete units. More details: ${err}`);
  }
});

/**
 * [/units/remove-multiple]
 */
router.route("/remove-multiple").delete(async (req, res) => {
  const unitIds = req.body.unitIds;
  
  console.log("body =", req.body);
  console.log("unitIds =", unitIds);

  try {
    const result = await Unit.deleteMany({ _id: { $in: unitIds } });

    if (result.deletedCount > 0) {
      res.json(`Successfully deleted ${result.deletedCount} units.`);
    } else {
      res.json("No units were deleted.");
    }
  } catch (error) {
    console.error("Error removing units:", error);
    res.status(500).json("Error removing units: " + error.message);
  }
});

/** 
 * [ /units/remove-notes ]
 * Remove notes field
 */
router.route("/remove-notes").delete(async (req, res) => {
  console.log(">>> Deleting notes of all units");
  
  // Define the update operation to remove the 'notes' field
  const updateOperation = {
    $unset: {
      notes: 1, // Setting the value to 1 means to unset the field
    },
  };

  try {
    // Use the updateMany method to remove the 'notes' field from all documents
    const result = await Unit.updateMany({}, updateOperation);

    console.log("Removed 'notes' field from", result.nModified, "documents.");
    res.json("Removed 'notes' field from " + result.nModified + " documents.");
  }
  catch (e) {
    console.error("ERROR:", e);
    res.status(500).json("Error deleting notes field of institutions.\nMore info:" + e);
  }
});

export default router;
