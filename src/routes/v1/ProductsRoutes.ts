import { Router } from "express";
import {
  addProduct,
  addProductCategory,
  editProduct,
  getAllProducts,
  getSingleProduct,
  removeProduct,
} from "../../controllers/ProductsControllers.js";
import { authenticateToken } from "../../middlewares/BearerAuthMiddleware.js";

const productsRoutes = Router();

productsRoutes.get("/get-all-products", getAllProducts);
productsRoutes.get("/show-product/:id", getSingleProduct);
productsRoutes.post("/add-product", authenticateToken, addProduct);
productsRoutes.put("/edit-product/:id", authenticateToken, editProduct);
productsRoutes.delete("/remove-product/:id", removeProduct);
productsRoutes.post(
  "/add-product-category",
  authenticateToken,
  addProductCategory
);

export default productsRoutes;
