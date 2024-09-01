/**
 * This file tests the functionalities of mongoose
 */
import mongoose from "mongoose";
import Unit from "../models/unit.model.js";

class Test {
  
  /**
   * Test usage of populate to fill the Unit's institution field with the Institution's
   * name instead of its object id.
   */
  async testPopulate() {
    try {
      const units = await Unit.find().populate("institution", "-_id name");
      console.log(`Unit:\n${units}`);
    } catch(e) {
      console.log(e.message);
    }
  }
}

const test = new Test();
export default test;
