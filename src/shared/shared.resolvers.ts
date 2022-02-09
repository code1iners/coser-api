import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    coserHello: () => "world",
  },
};

export default resolvers;
