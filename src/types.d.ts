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
  loggedInUser?: User;
};
