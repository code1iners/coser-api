import { User } from "./../../../node_modules/.prisma/client/index.d";
import {
  ERROR_USERS_FIND_SERVER_ERROR,
  ERROR_USERS_FIND_NOT_FOUND,
} from "./../../utils/constants";
import { Resolvers } from "../../types";
import client from "../../client";

const resolvers: Resolvers = {
  Query: {
    /**
     * ### Find user by username.
     * @param username Username
     * @returns User | null
     */
    findUserByUsername: async (
      _,
      { username }: { username: string },
      { client }
    ) => {
      return client.user.findUnique({ where: { username } });
    },

    /**
     * ### Find user by user id.
     * @param id User id.
     * @returns User | null
     */
    findUserById: async (_, { id }, { client }) => {
      return client.user.findUnique({ where: { id } });
    },

    findAll: async () => {
      return client.user.findMany({});
    },
  },
};

export default resolvers;
