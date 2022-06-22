import mongoose, { Document, Schema } from "mongoose";

export interface CourseAttributes {
  AR?: string,
  CH?: string,
  CO?: string,
  CR?: string,
  LC?: string,
  LH?: string,
  OR?: string,
  PR?: string,
  UL?: string
}

const CourseAttributesSchema: Schema = new Schema({
  AR: { type: String, required: false },
  CH: { type: String, required: false },
  CO: { type: String, required: false },
  CR: { type: String, required: false },
  LC: { type: String, required: false },
  LH: { type: String, required: false },
  OR: { type: String, required: false },
  PR: { type: String, required: false },
  UL: { type: String, required: false }
})

// CalendarCourse interface
export interface ICalendarCourse extends Document {
  name: string,
  number: string,
  description: string,
  subject: string,
  attributes: CourseAttributes
}

// CalendarCourse mongoose schema
const CalendarCourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  attributes: {type: CourseAttributesSchema, required: true }
}, { collection: 'Calendar' });

// Exporting mongoose model made from the interface
export default mongoose.model<ICalendarCourse>("CalendarCourse", CalendarCourseSchema);