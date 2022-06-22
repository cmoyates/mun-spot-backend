import BannerOffering, { IBannerOffering } from "./models/BannerOffering";
import "./db"
import CalendarCourse, { ICalendarCourse } from "./models/CalendarCourse";
import { getRMPRating, courseSearch, courseAutocomplete } from "./helpers";

export const resolvers = {
    Query: {
        getOfferings: async (_parent: object, { subject, number }: { subject: string, number: string }) => {
            const query = { subject_code: subject, number };
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
        getCourseDetails: async (_parent: object, { subject, number }: { subject: string, number: string }) => {
            const query = { subject, number };
            const courses: ICalendarCourse[] = await CalendarCourse
                .find(query)
                .limit(5)
                .exec();
            return courses;
        },
        courseSearch: async (_parent: object, { query, subject }: { query: string, subject: string }) => {
            return query ? await courseSearch(query, subject) : [];
        },
        courseAutocomplete: async (_parent: object, { subject, number }: { subject: string, number: string }) => {
            return number ? await courseAutocomplete(subject, number) : [];
        }
    }
};