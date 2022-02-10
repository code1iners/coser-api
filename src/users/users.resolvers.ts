import { Resolvers } from "./../types.d";
const resolvers: Resolvers = {
  User: {
    __resolveReference(user, { fetchUserById }) {
      return fetchUserById(user.id);
    },
  },
};

export default resolvers;
