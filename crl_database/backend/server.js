import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";

import userRoutes from "./routes/user.js"
import institutionsRoutes from "./routes/institutions.js";
import unitsRoutes from "./routes/units.js";
import applicationRoutes from "./routes/application.js";
import whitelistRoute from "./routes/whitelist.js"

import Test from "./test/testUnit.js";

/* CONFIG */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api/user', userRoutes);
app.use("/institutions", institutionsRoutes);
app.use("/units", unitsRoutes);
app.use("/applications", applicationRoutes);

app.use('/api/whitelist', whitelistRoute);

// Connect to the database
const PORT = process.env.PORT || 9000; // backup port if env does not exist
const URL = process.env.MONGO_URL;

mongoose.connect(URL);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Test
// Test.testPopulate();
