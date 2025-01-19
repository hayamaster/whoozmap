import { Client, Account, OAuthProvider } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // The Appwrite API endpoint
  .setProject("678c9cc90031aeb4e733"); // Your Appwrite project ID

const account = new Account(client);

export { account, OAuthProvider };
