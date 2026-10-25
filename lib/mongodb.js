import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

export default async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable.");
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri)
      .then((instance) => instance);
  }

  try {
    cached.connection = await cached.promise;
    // console.log("Connected to MongoDB: ", cached.connection.connection.name);
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.connection;
}
