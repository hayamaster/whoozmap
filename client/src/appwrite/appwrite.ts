import { Client, Account, OAuthProvider } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // The Appwrite API endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your Appwrite project ID

const account = new Account(client);

export { account, OAuthProvider };
