import { Router } from "express";
import { authenticateToken } from "../middlewares/BearerAuthMiddleware";
import {
  cartStore,
  getCart,
  registrationCart,
  updateCart,
} from "../controllers/CartControllers";

const cartRoutes = Router();

cartRoutes.post("/cart-store", authenticateToken, cartStore);
cartRoutes.get("/get-cart", authenticateToken, getCart);
cartRoutes.post("/update-cart", authenticateToken, updateCart);
cartRoutes.post("/registration-cart", authenticateToken, registrationCart);

export default cartRoutes;
