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

    type BannerOffering {
        _id: ID,
        prof: String,
        crn: String,
        room: String,
        type: String,
        times: Times,
        notes: [String],
        campus: String,
        subject: String,
        subject_code: String,
        number: String,
        section: String
    }

    type CalendarCourse {
        _id: ID,
        name: String,
        number: String,
        description: String,
        subject: String
    }

    type Query {
        getOfferings(subject: String, number: String): [BannerOffering],
        getCourseDetails(subject: String, number: String): [CalendarCourse]
    }
`;