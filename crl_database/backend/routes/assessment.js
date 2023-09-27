import express from "express";
import Assessment from "../models/assesment.model.js";
import User from "../models/user.model.js";
import Unit from "../models/unit.model.js";

const router = express.Router();

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

export default router;