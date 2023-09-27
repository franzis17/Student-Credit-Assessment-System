import express from "express";
import Application from "../models/application.model.js";
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();
//Authenticated Routing
router.use(requireAuth)

/**
 * Add application
 */
router.post("/", async (req, res) => {
  const application = await Application.create(req.body);
  if (application) {
    return res.status(200).json("Create successfully");
  }
  return res.status(500).json("Create application failure");
});

/**
 * Update the application according to its id
 */
router.put("/:id", async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app) {
    return res.json(404).json("Not found the application with the given id(" + req.params.id + ")");
  }
  const updateRes = await Application.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
  if (updateRes) {
    return res.status(201).json("Update successfully");
  }
  return res.status(500).json("Update application failure");
});

/**
 * Delete one application according to its id
 */
router.delete("/:id", async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app) {
    return res.json(404).json("Not found the application with the given id(" + req.params.id + ")");
  }
  const deletedRes = await Application.findByIdAndDelete(req.params.id);
  if (deletedRes) {
    return res.status(200).json("Delete successfully");
  }
  return res.status(500).json("Delete application failure");
});

/**
 * Get all the applications
 */
router.get("/", async (req, res) => {
  const apps = await Application.find();
  return res.status(200).json({applications: apps});
});

export default router;