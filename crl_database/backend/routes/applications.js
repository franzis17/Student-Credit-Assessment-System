import express from "express";
import Application from "../models/application.model.js";
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();
//router.use(requireAuth)


// ---- [ GET ] ----

router.route("/").get(async (req, res) => {
  try {
    console.log(">>> Getting applications...");
    const applications = await Application.find({}).populate("institution unitsToAssess");
    console.log("applications =", applications);
    res.json(applications);
  } catch (e) {
    console.error(`ERROR: ${e}`);
    res.status(500).json(`ERROR: Failed to fetch applications. More details: ${e}`);
  }
});


// ---- [ POST ] ----

/** 
 * [ /applications/add ]
 */
router.route("/add").post((req, res) => {
  const institution   = req.body.institution;
  const status        = req.body.status;
  const aqf           = req.body.aqf;
  const location      = req.body.location;
  const award         = req.body.award;
  const assessor      = req.body.assessor;
  const unitsToAssess = req.body.unitsToAssess;
  const curtinUnit    = req.body.curtinUnit;
  const assessorNotes = req.body.assessorNotes;
  const studentNotes  = req.body.studentNotes;
  
  const newApplication = new Application({
    institution,
    status,
    aqf,
    location,
    award,
    assessor,
    unitsToAssess,
    curtinUnit,
    assessorNotes,
    studentNotes,
  });
  
  console.log("Adding new application:");
  console.log("newApplication =", newApplication);
  
  newApplication
    .save()
    .then(() => {
      console.log("SUCCESS: Added a new application!");
      res.json(`Application has been added!`);
    })
    .catch((e) => {
      const context = "ERROR: When adding a new application.";
      console.log(`${context}\n>>> More info: ${e}`);
      res.status(500).json(`${context} More info: ${e}`);
    });
});


// ---- [ DELETE ] ----

router.route("/delete/:id").delete((req, res) => {
  Application.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json("The Application has successfully been deleted!")
    })
    .catch((e) => {
      res.status(400).json(`ERROR: ${e}`);
    });
});

export default router;
