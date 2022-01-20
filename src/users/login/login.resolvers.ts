import {
  ERROR_USERS_LOGIN_INCORRECT_PASSWORD,
  ERROR_USERS_LOGIN_UNIQUE_EMAIL,
} from "./../../utils/constants";
import bcrypt from "bcrypt";
import { Resolvers } from "./../../types.d";
import jwt from "jsonwebtoken";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { email, password }, { client }) => {
      try {
        // Check email is valid.
        const foundUser: { id: number; password: string } | null =
          await client.user.findUnique({
            where: { email },
            select: { id: true, password: true },
          });

        // No user?
        if (!foundUser?.id) {
          console.error("[login]", ERROR_USERS_LOGIN_UNIQUE_EMAIL);
          return {
            ok: false,
            error: {
              code: 404,
              message: ERROR_USERS_LOGIN_UNIQUE_EMAIL,
            },
          };
        }

        // Compare passwords.
        const passwordIsValid = await bcrypt.compare(
          password,
          foundUser?.password
        );
        // Password is valid?
        if (!passwordIsValid) {
          return {
            ok: false,
            error: {
              code: 400,
              message: ERROR_USERS_LOGIN_INCORRECT_PASSWORD,
            },
          };
        }

        // Token sign by user id.
        const token = jwt.sign(
          { id: foundUser?.id },
          String(process.env.SECRET_KEY)
        );

        return {
          ok: true,
          token,
        };
      } catch (e) {
        console.error("[login]", e);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Failed user login.",
          },
        };
      }
    },
  },
};

export default resolvers;
