import prisma from "../prisma";

export const getAllInvoicesByUserId = async ({ userId }) => {
  try {
    const invoices = await prisma.invoices.findMany({
      where: {
        customerId: userId,
      },
      include: {
        InvoiceItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        invoiceDate: "desc",
      },
    });
    return invoices;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};

export const getInvoicesById = async ({ userId, invoiceId }) => {
  try {
    const invoices = await prisma.invoices.findUnique({
      where: {
        id: invoiceId,
      },
      include: {
        InvoiceItems: {
          include: {
            product: true,
          },
        },
      },
    });
    return invoices;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};
