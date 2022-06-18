import mongoose, { Document, Schema } from "mongoose";

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
  sunday: { type: Array<String>, required: true },
  monday: { type: Array<String>, required: true },
  tuesday: { type: Array<String>, required: true },
  wednesday: { type: Array<String>, required: true },
  thursday: { type: Array<String>, required: true },
  fFriday: { type: Array<String>, required: true },
  saturday: { type: Array<String>, required: true }
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
  section: string
};

// BannerOffering mongoose schema
const BannerOfferingSchema: Schema = new Schema({
  prof: { type: String, required: true },
  prof_full: { type: String, required: true },
  crn: { type: String, required: true },
  room: { type: String, required: true },
  type: { type: String, required: true },
  times: { type: TimesSchema, required: true },
  notes: { type: Array<String>, required: true },
  campus: { type: String, required: true },
  subject: { type: String, required: true },
  subject_code: { type: String, required: true },
  number: { type: String, required: true },
  section: { type: String, required: true }
}, { collection: 'Banner' });

// Exporting mongoose model made from the interface
export default mongoose.model<IBannerOffering>("BannerOffering", BannerOfferingSchema);