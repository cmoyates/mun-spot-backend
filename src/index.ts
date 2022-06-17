import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import client from "./db";

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

const app: Application = express();

app.use(cors());
app.use(json())

app.get("/", (_: Request, res: Response) => {
    res.send("The server is running!");
})

var calendarCollection: any;

app.get("/search", async (req: Request, res: Response) => {
    try {
        let result = await calendarCollection.aggregate([
            {
              '$search': {
                'index': 'Calendar Search', 
                'compound': {
                  'should': [
                    {
                      'autocomplete': {
                        'query': `${req.query.term}`, 
                        'path': 'Name', 
                        'score': {
                          'boost': {
                            'value': 20
                          }
                        }
                      }
                    }, {
                      'text': {
                        'query': `${req.query.term}`, 
                        'path': 'Description'
                      }
                    }
                  ]
                }
              }
            }, {
              '$limit': req.query.limit ? parseInt(req.query.limit.toString()) : 5
            }
          ]).toArray();
          res.json(result);
    } catch (e: any) {
        console.log(e)
        res.status(500).send({message: e.message});
    }
})

app.listen(PORT, async () => {
    try {
        await client.connect();
        calendarCollection = client.db("MUNSpot").collection("Calendar");
    } catch (e) {
        console.log(e);
    }
    console.log(`Listening on port ${PORT}...`);
});