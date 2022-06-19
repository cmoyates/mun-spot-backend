import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";


const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

const startServer = async () => {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers
    })
    await server.start()
    server.applyMiddleware({app})

    app.get("/", (req, res) => {
        res.send("The server is running!")
    })

    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
}

startServer()