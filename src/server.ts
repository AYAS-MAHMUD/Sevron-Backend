import http from "http";
import app from "./app";

const PORT = process.env.PORT || 5000;

let server: http.Server;

async function bootstrap() {
  try {
    // await mongoose.connect(process.env.DATABASE_URL as string);

    server = app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();

// Unhandled Rejection
// process.on("unhandledRejection", (error) => {
//   console.log("Unhandled Rejection Detected");

//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }

//   process.exit(1);
// });

// // Uncaught Exception
// process.on("uncaughtException", (error) => {
//   console.log("Uncaught Exception Detected");
//   process.exit(1);
// });

// // SIGTERM
// process.on("SIGTERM", () => {
//   console.log("SIGTERM Received");

//   if (server) {
//     server.close();
//   }
// });