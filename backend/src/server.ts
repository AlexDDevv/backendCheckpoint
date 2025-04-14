import "reflect-metadata";
import { datasource } from "./db";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { CountryResolver } from "./resolvers/country";

const initialize = async () => {
    await datasource.initialize();
    console.log("datasource is connected");

    const schema = await buildSchema({
        resolvers: [CountryResolver],
    });

    const server = new ApolloServer({ schema });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 5000 },
    });

    console.log(`GraphQL server ready at ${url}`);
};

initialize();
