import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to connect to the database
export async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("🟢 Connected to the database successfully");
  } catch (error) {
    console.error("🔴 Failed to connect to the database:", error);
    process.exit(1); // Exit the process if unable to connect
  }

  // Handle graceful shutdown
  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    console.log("🔌 Database connection closed");
    process.exit(0);
  });
}

export default prisma;
