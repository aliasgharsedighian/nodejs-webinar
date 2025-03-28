import { Router } from "express";
import {
  getUserInfo,
  signin,
  signup,
  updateUserInfo,
} from "../../controllers/AuthControllers";
import { authenticateToken } from "../../middlewares/BearerAuthMiddleware";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);
authRoutes.get("/user-info", authenticateToken, getUserInfo);
authRoutes.put("/update-user-info", authenticateToken, updateUserInfo);

export default authRoutes;
