import mongoose, { Document, Schema } from "mongoose";

// CalendarCourse interface
export interface ICalendarCourse extends Document {
  name: string,
  number: string,
  description: string,
  subject: string,
};

// CalendarCourse mongoose schema
const CalendarCourseSchema: Schema = new Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String, required: true },
  }, { collection: 'Calendar' });
  
  // Exporting mongoose model made from the interface
  export default mongoose.model<ICalendarCourse>("CalendarCourse", CalendarCourseSchema);