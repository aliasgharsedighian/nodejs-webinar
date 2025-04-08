import express from "express";
import dotenv from "dotenv";
import V1Router from "./src/routes/routes";
import { connectToDatabase } from "./src/prisma";

// Load environment variables
dotenv.config();

const port = process.env.PORT || 4001;

// Check if MONGODB_URI is loaded
if (!process.env.POSTGRES_DATABASE_URL) {
  console.error("Error: POSTGRES_DATABASE_URL is not defined in .env");
  process.exit(1);
}

// Initialize Express app
const app = express();

//Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", V1Router);

// Connect to Postgresql
connectToDatabase();

// Non-exist get and post pages handler
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Page Not Found",
  });
});
app.post("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Route Not Found",
  });
});

app.listen(port, () => {
  var d = new Date();
  var utcDate = new Date(
    Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds(),
      d.getUTCMilliseconds()
    )
  );
  console.log(`app running on port ${port} on ${utcDate}`);
});
