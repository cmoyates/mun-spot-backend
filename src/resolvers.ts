import BannerOffering from "./models/BannerOffering";
import "./db.ts"
import CalendarCourse from "./models/CalendarCourse";

export const resolvers = {
    Query: {
        getOfferings: async (_parent: any, { subject, number }: { subject: string, number: string }) => {
            let query: any = {subject_code: subject}
            if (number) query.number = number; 
            const offerings = await BannerOffering
            .find(query)
            .limit(5)
            .exec();
            return offerings;
        },
        getCourseDetails: async (_parent: any, { subject, number }: { subject: string, number: string }) => {
            let query: any = {subject}
            if (number) query.number = number; 
            const courses = await CalendarCourse
            .find(query)
            .limit(5)
            .exec();
            return courses;
        }
    }
};