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

    type Query {
        getOfferings(subject_code: String, number: String): [BannerOffering]
    }
`;