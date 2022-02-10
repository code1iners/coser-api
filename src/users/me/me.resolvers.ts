import { Resolvers } from "./../../types.d";
const resolvers: Resolvers = {
  Query: {
    me: (_, __, { loggedInUser }) => loggedInUser,
  },
};

export default resolvers;
