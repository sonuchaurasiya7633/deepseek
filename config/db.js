import mongoose from "mongoose";

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

let cached = global.mongoose;

export default async function ConnectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error);
    throw error;
  }

  return cached.conn;
}
