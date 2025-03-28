import { Router } from "express";
import { authenticateToken } from "../../middlewares/BearerAuthMiddleware";
import {
  getAllInvoices,
  getSingleInvoice,
} from "../../controllers/InvoicesControllers";

const invoicesRoutes = Router();

invoicesRoutes.get("/get-all-invoice", authenticateToken, getAllInvoices);
invoicesRoutes.get("/show-invoice/:id", getSingleInvoice);

export default invoicesRoutes;
