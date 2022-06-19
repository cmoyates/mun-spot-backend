import BannerOffering, {IBannerOffering} from "./models/BannerOffering";
import "./db"
import CalendarCourse, {ICalendarCourse} from "./models/CalendarCourse";
//import RMPRating from "./models/RMPRating";
import { getRMPRating } from "./helpers";

export const resolvers = {
    Query: {
        getOfferings: async (_parent: any, { subject, number }: { subject: string, number: string }) => {
            let query: any = {subject_code: subject}
            if (number) query.number = number; 
            const offerings: IBannerOffering[] = await BannerOffering
            .find(query)
            .limit(5)
            .exec();
            for await (const offering of offerings) {
                offering.rmp = await getRMPRating(offering.prof_full)
            }
            return offerings;
        },
        getCourseDetails: async (_parent: any, { subject, number }: { subject: string, number: string }) => {
            let query: any = {subject}
            if (number) query.number = number; 
            const courses: ICalendarCourse[] = await CalendarCourse
            .find(query)
            .limit(5)
            .exec();
            return courses;
        }
    }
};