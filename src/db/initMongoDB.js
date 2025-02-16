import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export const initMongoDB = async () => {
  try {
    const user = getEnvVar("MONGODB_USER");
    const pwd = getEnvVar("MONGODB_PASSWORD");
    const url = getEnvVar("MONGODB_URL");
    const db = getEnvVar("MONGODB_DB");

    console.log("Connecting to MongoDB...");
    console.log("MONGODB_USER:", user);
    console.log("MONGODB_URL:", url);
    console.log("MONGODB_DB:", db);

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connection to MongoDB successfully established!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
