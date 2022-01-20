import {
  ERROR_USERS_QUIT_FAILED,
  ERROR_USERS_FIND_NOT_FOUND,
} from "./../../utils/constants";
import { Resolvers } from "./../../types.d";

const resolvers: Resolvers = {
  Mutation: {
    quit: async (_, { id }: { id: number }, { client }) => {
      try {
        // Find user by user's id.
        const foundUser = await client.user.findUnique({ where: { id } });
        // No user?
        if (!foundUser) {
          console.error("[quit]", ERROR_USERS_FIND_NOT_FOUND);
          return {
            ok: false,
            error: ERROR_USERS_FIND_NOT_FOUND,
          };
        }

        // Delete user.
        await client.user.delete({ where: { id } });

        return {
          ok: true,
        };
      } catch (e) {
        console.error("[quit]", e);
        return {
          ok: false,
          error: ERROR_USERS_QUIT_FAILED,
        };
      }
    },
  },
};

export default resolvers;
