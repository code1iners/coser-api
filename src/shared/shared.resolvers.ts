import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    couserHello: () => "world",
  },
};

export default resolvers;
