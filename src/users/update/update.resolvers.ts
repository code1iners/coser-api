import {
  ERROR_USERS_UPDATE_FAILED,
  ERROR_USERS_FIND_NOT_FOUND,
} from "./../../utils/constants";
import { User } from "./../../../node_modules/.prisma/client/index.d";
import { Resolvers } from "../../types";
import bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    updateUser: async (
      _,
      {
        id,
        email,
        username,
        password,
      }: { id: number; email: string; username: string; password: string },
      { client }
    ) => {
      try {
        // Find user by user's id.
        const foundUser: User | null = await client.user.findUnique({
          where: { id },
        });

        // No user?
        if (!foundUser) {
          console.error("[updateUser]", ERROR_USERS_FIND_NOT_FOUND);
          return {
            ok: false,
            error: {
              code: 500,
              message: ERROR_USERS_FIND_NOT_FOUND,
            },
          };
        }

        // If exists password.
        let newPassword;
        if (password) {
          newPassword = await bcrypt.hash(password, 10);
        }

        // Update user information.
        const updatedUser: User = await client.user.update({
          where: { id },
          data: {
            ...(email && { email }),
            ...(username && { username }),
            ...(password && { password: newPassword }),
          },
        });

        return {
          ok: true,
          data: updatedUser,
        };
      } catch (e) {
        console.error("[updateUser]", e);
        return {
          ok: false,
          error: {
            code: 500,
            message: ERROR_USERS_UPDATE_FAILED,
          },
        };
      }
    },
  },
};

export default resolvers;
