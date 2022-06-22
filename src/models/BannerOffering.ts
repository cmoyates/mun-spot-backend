import mongoose, { Document, Schema } from "mongoose";
import {IRMPRating, RMPRatingSchema} from "./RMPRating";

export interface Times {
  sunday: string[],
  monday: string[],
  tuesday: string[],
  wednesday: string[],
  thursday: string[],
  friday: string[],
  saturday: string[]
}

const TimesSchema: Schema = new Schema({
  sunday: { type: Array<string>, required: true },
  monday: { type: Array<string>, required: true },
  tuesday: { type: Array<string>, required: true },
  wednesday: { type: Array<string>, required: true },
  thursday: { type: Array<string>, required: true },
  friday: { type: Array<string>, required: true },
  saturday: { type: Array<string>, required: true }
})

export interface ReservedFor {
  degree?: string[],
  major?: string[],
  minor?: string[]
}

const ReservedForSchema: Schema = new Schema({
  degree: { type: Array<string>, required: false },
  major: { type: Array<string>, required: false },
  minor: { type: Array<string>, required: false }
})

// BannerOffering interface
export interface IBannerOffering extends Document {
  prof: string,
  prof_full: string
  crn: string,
  room: string,
  type: string,
  times: Times,
  notes: string[],
  campus: string,
  subject: string,
  subject_code: string
  number: string,
  section: string,
  rmp?: IRMPRating,
  associated_sections: string[],
  cross_listed: string[],
  reserved_for: ReservedFor,
  year: number,
  term: number
}

// BannerOffering mongoose schema
const BannerOfferingSchema: Schema = new Schema({
  prof: { type: String, required: true },
  prof_full: { type: String, required: true },
  crn: { type: String, required: true },
  room: { type: String, required: true },
  type: { type: String, required: true },
  times: { type: TimesSchema, required: true },
  notes: { type: Array<string>, required: true },
  campus: { type: String, required: true },
  subject: { type: String, required: true },
  subject_code: { type: String, required: true },
  number: { type: String, required: true },
  section: { type: String, required: true },
  rmp: { type: RMPRatingSchema, required: false },
  associated_sections: { type: Array<string>, required: true },
  cross_listed: { type: Array<string>, required: true },
  reserved_for: { type: ReservedForSchema, required: true },
  year: { type: Number, required: true },
  term: { type: Number, required: true }
}, { collection: 'Banner' });

// Exporting mongoose model made from the interface
export default mongoose.model<IBannerOffering>("BannerOffering", BannerOfferingSchema);