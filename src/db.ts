import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// https://www.youtube.com/watch?v=lNqaQ0wEeAo
const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false
};

// Check if the env file is populated
const envPopulated: boolean = process.env.MONGO_USERNAME !== undefined && process.env.MONGO_PASSWORD !== undefined && process.env.MONGO_HOST !== undefined;
// Set the URI accordingly
const uri = envPopulated 
  ? `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}.mongodb.net/MUNSpot` 
  : "mongodb://localhost/MUNSpot";
// Connect using the URI and options
mongoose.connect(uri, MONGO_OPTIONS);
const db = mongoose.connection;

// Add some listeners
db.on("error", (error: any) => console.log("Error: " + error));
db.once("open", () => console.log("Connected to Database"));

// Export db
export default db;