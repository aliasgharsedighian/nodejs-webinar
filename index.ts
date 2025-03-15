import express from "express";
import dotenv from "dotenv";
import productsRoutes from "./src/routes/ProductsRoutes.js";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

dotenv.config();

const port = process.env.PORT || 4001;

const app = express();

//Body parsers
app.use(express.json());

app.use("/api/shop", productsRoutes);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

async function main() {
  // Create a new user
  const user = await prisma.user.create({
    data: {
      email: "jane2.doe@example.com",
      password: "password",
      role: "ADMIN",
    },
  });

  // Create a new product with tags
  const product = await prisma.product.create({
    data: {
      title: "Sample Product",
      description: "This is a sample product",
      price: 400,
      userId: user.id, // Associate product with the user
      show: false,
      images: ["test"],
    },
  });

  console.log("User and Product with tags created successfully:", product);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
