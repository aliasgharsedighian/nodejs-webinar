import { Router } from "express";
import { signup } from "../controllers/AuthControllers";

const authRoutes = Router();

authRoutes.post("/signup", signup);

export default authRoutes;
