import BannerOffering, { IBannerOffering } from "./models/BannerOffering";
import "./db";
import CalendarCourse, { ICalendarCourse } from "./models/CalendarCourse";
import { getRMPRating, courseSearch, courseAutocomplete } from "./helpers";

type GetOfferingsQuery = {
  subject_code: string;
  number: string;
  campus?: string;
};

export const resolvers = {
  Query: {
    getOfferings: async (_parent: object, query: GetOfferingsQuery) => {
      const offerings: IBannerOffering[] = await BannerOffering.find(query)
        .sort({
          year: -1,
          term: -1,
        })
        .exec();
      for await (const offering of offerings) {
        if (offering.rmp !== undefined || !offering.prof_full) continue;
        offering.rmp = await getRMPRating(offering.prof_full);
        await offering.save();
      }
      const offeringsMap: Map<string, IBannerOffering[]> = new Map<
        string,
        IBannerOffering[]
      >();
      offerings.forEach((offering) => {
        const offeringGroupString = `${offering.year}-${offering.term}-${offering.campus}`;
        if (offeringsMap.get(offeringGroupString)) {
          offeringsMap.get(offeringGroupString)?.push(offering);
        } else {
          offeringsMap.set(offeringGroupString, [offering]);
        }
      });
      return offeringsMap.values();
    },
    getCourseDetails: async (
      _parent: object,
      query: { subject: string; number?: string }
    ) => {
      const courses: ICalendarCourse[] = await CalendarCourse.find(query)
        .limit(5)
        .exec();
      return courses;
    },
    courseSearch: async (
      _parent: object,
      { query, subject }: { query: string; subject: string }
    ) => {
      return query ? await courseSearch(query, subject) : [];
    },
    courseAutocomplete: async (
      _parent: object,
      { subject, number }: { subject: string; number: string }
    ) => {
      return number ? await courseAutocomplete(subject, number) : [];
    },
  },
};
