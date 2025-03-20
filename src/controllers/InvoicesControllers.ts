import { Request, Response } from "express";
import {
  getAllInvoicesByUserId,
  getInvoicesById,
} from "../services/invoice.service";

export const getAllInvoices = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const userId = Number(request.userId);

    const invoices = await getAllInvoicesByUserId({ userId });

    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "get invoice successfully",
      data: invoices,
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while get all invoices: ${error}`,
    });
  }
};

export const getSingleInvoice = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const userId = Number(request.userId);
    const invoiceId = Number(request.params.id);

    const invoice = await getInvoicesById({ userId, invoiceId });

    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "get invoice successfully",
      data: invoice,
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while get single invoice: ${error}`,
    });
  }
};
