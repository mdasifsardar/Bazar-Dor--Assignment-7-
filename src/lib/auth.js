import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_DB_URL);
const db = client.db("bazar_dor");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  // Social Login
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_OAUTH_CLIENT,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    },
  },
  //...
  database: mongodbAdapter(db, {
    client,
  }),
});
