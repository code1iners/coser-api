import { PrismaClient } from "./../node_modules/.prisma/client/index.d";
import { User } from "@prisma/client";

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};

type Context = {
  client: PrismaClient;
  loggedInUser?: User;
};
