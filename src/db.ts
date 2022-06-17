import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// https://www.youtube.com/watch?v=lNqaQ0wEeAo
const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  retryWrites: false
};

// Check if the env file is populated
const envPopulated: boolean = process.env.MONGO_USERNAME !== undefined && process.env.MONGO_PASSWORD !== undefined && process.env.MONGO_HOST !== undefined;
// Set the URI accordingly
const uri = envPopulated 
  ? `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}.mongodb.net/RePlace` 
  : "mongodb://localhost/RePlace";

const client = new MongoClient(uri, MONGO_OPTIONS)

export default client;