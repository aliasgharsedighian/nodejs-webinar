import { Router } from "express";
import {
  addProduct,
  editProduct,
  getAllProducts,
  getSingleProduct,
  removeProduct,
} from "../controllers/ProductsControllers.js";

const productsRoutes = Router();

productsRoutes.get("/get-all-products", getAllProducts);
productsRoutes.get("/show-product/:id", getSingleProduct);
productsRoutes.post("/add-product", addProduct);
productsRoutes.post("/edit-product/:id", editProduct);
productsRoutes.delete("remove-product/:id", removeProduct);

export default productsRoutes;
