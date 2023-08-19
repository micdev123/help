import { Client, Account, Databases, Storage,  ID, Permission, Role, Query } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_PROJECT_ID);


// Initializing Account
const account = new Account(client);

// Initializing Database
const database = new Databases(client);

// Initializing Storage Bucket
const storage = new Storage(client);

export { account, database, storage, ID, Permission, Role, Query };