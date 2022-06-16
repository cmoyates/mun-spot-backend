import express, { Application, Request, Response } from "express";


const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;


const app: Application = express();

app.get("/", (_: Request, res: Response) => {
    res.send("The server is running!");
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));