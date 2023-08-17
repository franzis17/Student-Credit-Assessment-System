import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";

import userRoutes from "./routes/user.js";
import generalRoutes from "./routes/general.js";
import dataRoutes from "./routes/data.js";
import facilityRoutes from "./routes/facility.js";

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
app.use("/user", userRoutes);
app.use("/general", generalRoutes);
app.use("/data", dataRoutes);
app.use("/facility", facilityRoutes);

// Connect to database
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

/* -- Old code --
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("Server Port:", PORT));
    console.log("Server Connection Successful");
  })
  .catch((error) => console.log(error, ": Did not connect"));
*/
