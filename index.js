import express from "express";

const port = process.env.PORT || 4001;
const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
