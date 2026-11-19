import app from "./app";
import config from "./app/config";
import {
  deleteUnverifiedDoctors,
  reindexDoctorEmbeddings,
} from "./app/lib/cron";
import { transporter } from "./app/lib/nodemailer";
import { prisma } from "./app/lib/prisma";
import { redisClient } from "./app/lib/redis";
import { reindexAllDoctors } from "./app/module/chat/chat.indexer";
import {
  seedSuperAdmin,
  seedTesterAdmin,
  seedTesterDoctor,
} from "./app/utils/seed";

const PORT = config.port || 5000;

const main = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");

    await redisClient.connect();
    console.log("Redis Connected Successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    transporter
      .verify()
      .then(() => console.log("Nodemailer Connected Successfully."))
      .catch((mailError: any) =>
        console.warn(
          "⚠️  Nodemailer warning: Invalid SMTP credentials. Email sending will be disabled until valid credentials are set in .env.",
        ),
      );

    await seedSuperAdmin();
    await seedTesterAdmin();
    await seedTesterDoctor();
    // await reindexAllDoctors();
    await deleteUnverifiedDoctors();
    await reindexDoctorEmbeddings();
  } catch (error) {
    console.error("Error starting the server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
