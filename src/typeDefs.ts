import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Times {
        sunday: [String],
        monday: [String],
        tuesday: [String],
        wednesday: [String],
        thursday: [String],
        friday: [String],
        saturday: [String]
    }

    type RMPRating {
        _id: ID,
        query: String,
        rating: String,
        rating_count: String
    }

    type BannerOffering {
        _id: ID,
        prof: String,
        prof_full: String,
        crn: String,
        room: String,
        type: String,
        times: Times,
        notes: [String],
        campus: String,
        subject: String,
        subject_code: String,
        number: String,
        section: String,
        rmp: RMPRating
    }

    type CourseAttributes {
        AR: String,
        CH: String,
        CO: String,
        CR: String,
        LC: String,
        LH: String,
        OR: String,
        PR: String,
        UL: String
    }

    type CalendarCourse {
        _id: ID,
        name: String,
        number: String,
        description: String,
        subject: String,
        attributes: CourseAttributes
    }

    type Query {
        getOfferings(subject: String!, number: String!): [BannerOffering],
        getCourseDetails(subject: String!, number: String!): [CalendarCourse],
        courseSearch(query: String!, subject: String): [CalendarCourse],
        courseAutocomplete(subject: String!, number: String): [CalendarCourse]
    }
`;