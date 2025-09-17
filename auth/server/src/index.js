import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import ServerStatus from "./status/index.js";
import logger from "node-color-log";
import StudentRouter from "./student/student.route.js";

dotenv.config();

const app = express();


app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const connectWithRetry = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      logger.success("Successfully connected to the database.");
    })
    .catch((error) => {
      logger.error(`Failed to connect to the database: ${error.message}`);
      logger.info("Retrying database connection in 5 seconds...");
      setTimeout(connectWithRetry, 10000);
    });
};

connectWithRetry();

const PORT = process.env.PORT || 5000;

app.use("/", ServerStatus);
app.use("/student", StudentRouter);

app.listen(PORT, () => {
  logger.color("white").bgColor("cyan").log(
    `🚀 Server running at http://localhost:${PORT}`
  );
});
