import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema, resolvers, typeDefs } from "./schema";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core/dist/plugin/drainHttpServer";
import { graphqlUploadExpress } from "graphql-upload";
import logger from "morgan";
import client from "./client";
import { initEnvironment, ENV_PRODUCTION } from "./utils/envUtils";
import { findUserByToken } from "./utils/useUser";

/**
 * ### Run server.
 */
(async () => {
  try {
    initEnvironment();

    const baseUri = process.env.BASE_URI || "http://localhost";
    const port = process.env.PORT || 3000;
    const uri = `${baseUri}:${port}`;

    const app = express();

    const httpServer = http.createServer(app);

    const apolloServer = new ApolloServer({
      schema,
      context: (ctx) => {
        if (ctx.req) {
          const { authorization } = ctx.req.headers;
          return {
            client,
            loggedInUser: findUserByToken(authorization),
          };
        }
      },
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await apolloServer.start();

    app.use(graphqlUploadExpress());
    app.use(
      process.env.NODE_ENV === ENV_PRODUCTION ? logger("common") : logger("dev")
    );

    apolloServer.applyMiddleware({ app, path: "/graphql" });

    await new Promise((resolve: any) =>
      httpServer.listen({ port: process.env.PORT || 3000 }, resolve)
    );

    console.info(`🚀 Server running at ${uri}${apolloServer.graphqlPath} 🚀`);
  } catch (e) {
    console.error(e);
  }
})();
