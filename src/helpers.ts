import RMPRating, { IRMPRating } from "./models/RMPRating"
import axios from "axios";
import cheerio from "cheerio";
import CalendarCourse, { ICalendarCourse } from "./models/CalendarCourse";

const RMP_URL_PARTS = [
    "https://www.ratemyprofessors.com/search/teachers?query=",
    "&sid=U2Nob29sLTE0NDE=",
]

export const getRMPRating = async (query: string): Promise<IRMPRating> => {
    const cache = await RMPRating.findOne({ query });
    if (cache !== null) {
        return cache;
    }
    const url = `${RMP_URL_PARTS[0]}${query}${RMP_URL_PARTS[1]}`;
    const options = {
        method: 'GET',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    const response = await axios(options);
    const $ = cheerio.load(response.data)
    const data: string = $("script").get()[7].children[0].data
    const idIndex: number = data.indexOf("legacyId")
    const ratingSubstring: string = data.substring(idIndex - 1, idIndex + 60);
    const ratingStrings = ratingSubstring.split(",")
    const noRating = ratingSubstring === "\n          window.__RELAY_STORE__ = {\"client:root\":{\"__id\":";
    const ratingObj = new RMPRating(noRating ? {
        query,
        rating: "N/A",
        rating_count: "N/A",
        legacy_id: "N/A"
    } : {
        query,
        rating: ratingStrings[1].split(":")[1],
        rating_count: ratingStrings[2].split(":")[1],
        legacy_id: ratingStrings[0].split(":")[1]
    })

    await ratingObj.save();
    return ratingObj;
}

export const courseSearch = async (query: string, subject: string | undefined): Promise<ICalendarCourse[]> => {
    const subjectFilter = !subject ? undefined : [{
        text: {
            query: subject,
            path: "subject"
        }
    }]

    const courses: ICalendarCourse[] = await CalendarCourse.aggregate([
        {
            $search: {
                index: 'Calendar Search',
                compound: {
                    must: subjectFilter,
                    should: [
                        {
                            text: {
                                query: query,
                                path: {
                                    wildcard: '*'
                                }
                            }
                        },
                        {
                            autocomplete: {
                                query: query,
                                path: 'name',
                                score: {
                                    boost: {
                                        value: 10
                                    }
                                }
                            }
                        },
                        {
                            autocomplete: {
                                query: query,
                                path: 'description'
                            }
                        },
                        {
                            autocomplete: {
                                query: query,
                                path: 'subject',
                                score: {
                                    boost: {
                                        value: 10
                                    }
                                },
                                fuzzy: {
                                    maxEdits: 1
                                }
                            }
                        },
                        {
                            autocomplete: {
                                query: query,
                                path: 'number',
                                score: {
                                    boost: {
                                        value: 10
                                    }
                                }
                            }
                        },
                    ]
                }
            }
        },
        {
            $limit: 3
        }
    ]);
    return courses;
}

export const courseAutocomplete = async (subject: string, number: string) => {
    const courses: ICalendarCourse[] = await CalendarCourse.aggregate([
        {
            $search: {
                index: 'Calendar Autocomplete',
                compound: {
                    must: [
                        {
                            text: {
                                query: subject,
                                path: 'subject'
                            }
                        },
                        {
                            autocomplete: {
                                query: number,
                                path: 'number'
                            }
                        }
                    ]
                }
            }
        },
        {
            $sort: {
                number: 1
            }
        },
        {
            $limit: 3
        }
    ]);
    return courses;
}