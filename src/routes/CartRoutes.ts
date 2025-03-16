import { Router } from "express";
import { authenticateToken } from "../middlewares/BearerAuthMiddleware";
import { cartStore } from "../controllers/CartControllers";

const cartRoutes = Router();

cartRoutes.post("/cart-store", authenticateToken, cartStore);

export default cartRoutes;
