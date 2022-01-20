import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    hello: () => "world",
  },
};

export default resolvers;
