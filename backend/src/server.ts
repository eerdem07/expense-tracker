import app from "./app";
import { prisma } from "./db/prisma";

const PORT: number = Number(process.env.PORT || 3000);

async function bootstrap() {
  try {
    // Prisma, ilk query ile otomatik bağlantı sağlanır.
    await prisma.$connect();
    console.log("Prisma Connected!");

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to start:`, err);
    await prisma.$disconnect();

    process.exit(1);
  }
}

bootstrap();
