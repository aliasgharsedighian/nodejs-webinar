import express from "express";
import dotenv from "dotenv";
import productsRoutes from "./src/routes/ProductsRoutes.js";
import authRoutes from "./src/routes/AuthRoutes.js";

dotenv.config();

const port = process.env.PORT || 4001;

const app = express();

//Body parsers
app.use(express.json());

app.use("/api/shop", productsRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
