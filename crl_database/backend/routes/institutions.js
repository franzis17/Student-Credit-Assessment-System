import express from "express";
import Institution from "../models/institution.model.js";
import Unit from "../models/unit.model.js";
// import fs from "fs";  // used by add-mock data

const router = express.Router();

const DUPLICATE_ERROR_CODE = 11000;

// ---- [GET] ----

// Get all institutions = /institutions
router.route("/").get(async (req, res) => {
  Institution.find()
    .then((institutions) => res.json(institutions))
    .catch((err) => res.status(400).json("Error:" + err));
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

/**
 * [/institutions/units]
 * GET the List of Units for a given institution
 */
router.route("/units").get((req, res) => {
  const institution = req.query.institution;
  
  Unit.find({ institution: institution })
    .then((units) => {
      res.json(units)
    })
    .catch((err) => {
      console.error(`ERROR: ${err}`);
      res.status(500).json(`ERROR: Failed to retrieve the institution's units.\nMore details: ${err}`);
    });
});


// ---- [POST] ----

// Add an institution = /institutions/add
router.route("/add").post(async (req, res) => {
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
    .catch((error) => {
      console.log(`ERROR when adding an institution.\n>>> ${error}`);
      
      if (error.code === DUPLICATE_ERROR_CODE) {
        // Error: Duplicate key / institution name
        res.status(400).json({ message: `Error: ${name} already exists` });
      } else {
        res.status(500).json(`ERROR when adding a Unit. More info: ${error}`);
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
  Institution.findByIdAndDelete(req.params.id)
    .then(() => res.json("Institution deleted."))
    .catch((err) => res.status(400).json("Error:" + err));
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
