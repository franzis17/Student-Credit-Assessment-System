import express from "express";
import Institution from "../models/institution.model.js";
import Unit from "../models/unit.model.js";
import Application from "../models/application.model.js";
import requireAuth from '../middleware/requireAuth.js';
// import fs from "fs";  // used by add-mock data

const router = express.Router();
router.use(requireAuth)

const DUPLICATE_ERROR_CODE = 11000;

// ---- [GET] ----

// Get all institutions = /institutions
router.route("/").get(async (req, res) => {
  try {
    const institutions = await Institution.find();
    res.json(institutions);
  } catch (err) {
    console.error(`ERROR: ${err}`);
    res.status(500).json(`ERROR: Failed to fetch institutions. More details: ${err}`);
  }
});

// Get total institution count
router.route("/count").get(async (req, res) => {
  try {
    const count = await Institution.countDocuments({});
    res.json(count);
  } catch(err) {
    console.error(`ERROR: ${err}`);
    res.status(500).json(`ERROR: Failed to fetch institution counts. More details: ${err}`);
  }
});


// ---- [POST] ----

// Add an institution = /institutions/add
router.route("/add").post(async (req, res) => {
  console.log("add institution backend, institution = " + JSON.stringify(req.body));
  const name = req.body.name;
  const rank = req.body.rank;
  const location = req.body.location;
  const major = req.body.major;
  const notes = req.body.notes;

  console.log("New institution name: " + name)
  console.log("New institution rank: " + rank)
  console.log("New institution location: " + location)
  console.log("New institution major: " + major)

  const newInstitution = new Institution({
    name,
    rank,
    location,
    major,
    notes,
  });

  newInstitution
    .save()
    .then(() => res.json(`Institution: [${name}] has been added!`))
    .catch((error) => {
      console.log(`ERROR when adding an institution.\n>>> ${error}`);
      
      if (error.code === DUPLICATE_ERROR_CODE) {
        // Error: Duplicate key / institution name
        res.status(400).json({ error: `the institution "${name}" already exists` });
      } else {
        res.status(500).json(`ERROR when adding an Institution. More info: ${error}`);
      }
    });
});


// ---- [UPDATE] ----

// Update an institution = /institutions/update/:id
router.route("/update/:id").post(async (req, res) => {
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
        .catch((err) => res.status(400).json("ERROR when updating institutions: " + err));
    })
    .catch((err) => res.status(400).json("Error when updating institution: " + err));
});


// ---- [DELETE] ----

// Delete an institution = /institutions/delete/:id
router.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id;
  console.log(">>> Deleting an institution\nparams:", req.params);
  console.log("institution id =", id);
  
  try {
    if (!id) {
      throw Error("Institution id does not exist");
    }
    
    // delete units of institution
    const deletedUnits = await Unit.deleteMany({ institution: id });
    // delete applications of institution
    const deletedApplications = await Application.deleteMany({ institution: id });
    // delete institution
    const deletedInstitution = await Institution.findByIdAndDelete(id);
    
    const numUnitsDeleted = deletedUnits.deletedCount;
    const numAppsDeleted = deletedApplications.deletedCount;
    
    res.json(`successfully deleted an institution, and its [${numUnitsDeleted}] unit(s) and [${numAppsDeleted}] application(s).`);
  } catch (error) {
    console.error("!!!Error deleting institution:", error);
    res.status(500).json("Error deleting institution.\nMore info:", error.message);
  }
});


// ---- MOCK DATA ----


// TEST: Mock data to be put in db
// router.route("/add-mock").post(async (req, res) => {
//   try {
//     const rawData = fs.readFileSync("./routes/MOCK-Institutions.json");
//     const jsonData = JSON.parse(rawData);
    
//     await Institution.insertMany(jsonData);
    
//     res.json("Mock institutions have been added.");
//   } catch (err) {
//     res.status(400).json("Error when adding mock: " + err);
//   }
// });

export default router;
