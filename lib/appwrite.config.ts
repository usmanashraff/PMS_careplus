import * as sdk from "node-appwrite";

const client = new sdk.Client().setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!) // Your project ID
    .setKey(process.env.NEXT_PUBLIC_API_KEY!); // Your secret API key



export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);