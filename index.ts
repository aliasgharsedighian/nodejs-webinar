import express from "express";
import dotenv from "dotenv";
import V1Router from "./src/routes/routes";

dotenv.config();

const port = process.env.PORT || 4001;

const app = express();

//Body parsers
app.use(express.json());

app.use("/api/v1", V1Router);
// Non-exist get pages handler
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
