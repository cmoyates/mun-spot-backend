import BannerOffering from "./models/BannerOffering";
import "./db.ts"

export const resolvers = {
    Query: {
        getOfferings: async (_parent: any, { subject_code, number }: { subject_code: string, number: string }) => {
            let query: any = {subject_code}
            if (number) query.number = number; 
            const test = await BannerOffering
            .find(query)
            .limit(5)
            .exec();
            return test;
        }
    }
};