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
productsRoutes.get("/show-product/:slug", getSingleProduct);
productsRoutes.post("/add-product", addProduct);
productsRoutes.post("/edit-product/:slug", editProduct);
productsRoutes.delete("remove-product/:slug", removeProduct);

export default productsRoutes;
