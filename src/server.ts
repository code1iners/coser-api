require("dotenv").config();
import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./schema";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core/dist/plugin/drainHttpServer";
import { graphqlUploadExpress } from "graphql-upload";
import logger from "morgan";

// Server start.
runServer();

/**
 * ### Server running function.
 */
async function runServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  app.use(graphqlUploadExpress());
  app.use(
    process.env.NODE_ENV === "production" ? logger("common") : logger("dev")
  );

  apolloServer.applyMiddleware({ app, path: "/graphql" });

  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );

  console.info("Server running 🚀");
}
