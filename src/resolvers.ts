import BannerOffering, { IBannerOffering } from "./models/BannerOffering";
import "./db"
import CalendarCourse, { ICalendarCourse } from "./models/CalendarCourse";
import { getRMPRating, courseSearch } from "./helpers";

export const resolvers = {
    Query: {
        getOfferings: async (_parent: any, { subject, number }: { subject: string, number: string }) => {
            let query: any = { subject_code: subject }
            if (number) query.number = number;
            const offerings: IBannerOffering[] = await BannerOffering
                .find(query)
                .limit(5)
                .exec();
            for await (const offering of offerings) {
                if (offering.rmp !== undefined) continue;
                offering.rmp = await getRMPRating(offering.prof_full);
                await offering.save();
            }
            return offerings;
        },
        getCourseDetails: async (_parent: any, { subject, number }: { subject: string, number: string }) => {
            let query: any = { subject }
            if (number) query.number = number;
            const courses: ICalendarCourse[] = await CalendarCourse
                .find(query)
                .limit(5)
                .exec();
            return courses;
        },
        courseSearch: async (_parent: any, { query, subject }: { query: string, subject: string }) => {
            return query ? await courseSearch(query, subject) : [];
        }
    }
};