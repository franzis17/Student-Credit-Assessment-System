import express from "express";
import Assessment from "../models/assesment.model.js";
import User from "../models/user.model.js";
import Unit from "../models/unit.model.js";
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();
router.use(requireAuth)

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

router.get("/searchStudent", async (req, res) => {

  const query = req.query.q;

  try {

    const assessments = await Assessment.find({ 
      studentNotes: new RegExp(query, 'i')
   }) 
  
       const results = assessments.map(assessment => {
         const match = assessment.studentNotes.match(/(\w+)\s(\d+)/)  //Map based on regex for name and ID
          if (match) {
           return {
             name: match[1],
             id: match[2]
           }
          }

          return null
       }).filter(Boolean) //filter null values

       res.status(200).json(results)
  } catch (err) {
    res.status(500).json({error: err.message})
  }

})

export default router;