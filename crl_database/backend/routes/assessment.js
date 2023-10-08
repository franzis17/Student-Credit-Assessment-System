import express from "express";
import Assessment from "../models/assesment.model.js";
import User from "../models/user.model.js";
import Unit from "../models/unit.model.js";
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();
//router.use(requireAuth)

/**
 * Save assessment
 */
router.post("/add", async (req, res) => {
  const { assessor, unitId } = req.body;
  const user = await User.get(assessor);
  if (!user) {
    return res.status(401).json("Not found this assessor.");
  }
  const unit = await Unit.get(unitId);
  if (!unit) {
    return res.status(404).json("Not found assessing unit.");
  }
  const assessment = new Assessment(req.body);
  assessment.save().then(res => res.status(200).json("ok"))
  .catch(err => res.status(500).json("Error: " + err));
});


/*
// TEST: Mock data to be put in db
router.route("/add-appMock").post(async (req, res) => {
  try {
    const rawData = fs.readFileSync("./routes/MOCK-Assessment.json");
    const jsonData = JSON.parse(rawData);
    
    await Assessment.insertMany(jsonData);
    
    res.json("Mock Assessments have been added.");
  } catch (err) {
    res.status(400).json("Error when adding mock: " + err);
  }
});

export default router; */
