
import http from "http"
import app from "./app.js";
import { prisma } from "./app/lib/prisma.js";
import { config } from "./app/config/config.js";


let server : http.Server ;


async function botstrap(){
  try {
    await prisma.$connect();
    console.log("Database Connected");

    server = app.listen(config.PORT,()=>{
      console.log("Server running successfully on port 3000");
    })
  } catch (error) {
    console.log(error)
  }
}

botstrap()

// Unhandle Rejection Error

process.on("unhandledRejection",()=>{
  console.log("Unhandled Rejection Detected");
  if(server){
    server.close(()=>{
        process.exit(1);
        
      });
    }
    process.exit(1);
  
})

// Uncaught Exception
process.on("uncaughtException", () => {
  console.log("Uncaught Exception Detected");
  process.exit(1);
});

// SIGTERM
process.on("SIGTERM", () => {
  console.log("SIGTERM Received");

  if (server) {
    server.close();
  }
});