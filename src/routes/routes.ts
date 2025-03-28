import { Router } from "express";
import productsRoutes from "./v1/ProductsRoutes";
import authRoutes from "./v1/AuthRoutes";
import cartRoutes from "./v1/CartRoutes";
import invoicesRoutes from "./v1/InvoicesRoutes";

const V1Router = Router();

// v1 routes
V1Router.use("/shop", productsRoutes);
V1Router.use("/auth", authRoutes);
V1Router.use("/cart", cartRoutes);
V1Router.use("/invoice", invoicesRoutes);

export default V1Router;
