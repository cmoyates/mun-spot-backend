import mongoose, { Document, Schema } from "mongoose";

// RMPRating interface
export interface IRMPRating extends Document {
  query: string,
  rating: string,
  rating_count: string
}

// RMPRating mongoose schema
export const RMPRatingSchema: Schema = new Schema({
    query: { type: String, required: true },
    rating: { type: String, required: true },
    rating_count: { type: String, required: true }
  }, { collection: 'RateMyProf' });
  
// Exporting mongoose model made from the interface
export default mongoose.model<IRMPRating>("RMPRating", RMPRatingSchema);