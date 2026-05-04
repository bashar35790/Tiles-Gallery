import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Prevent multiple MongoClient instances during development hot-reloading
const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClientPromise) {
    const mongoClient = new MongoClient(process.env.DATABASE_URI!);
    globalWithMongo._mongoClientPromise = mongoClient.connect();
  }
  // Wait for connection to ensure client is ready, but in this sync context
  // we just use the instance. The connect() promise will resolve in background.
  client = new MongoClient(process.env.DATABASE_URI!); 
} else {
  client = new MongoClient(process.env.DATABASE_URI!);
}

const db = client.db("tiles-gallery");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});
