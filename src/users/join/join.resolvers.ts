import bcrypt from "bcrypt";
import { ERROR_USERS_JOIN_UNIQUE_USERNAME } from "./../../utils/constants";
import { Resolvers } from "./../../types.d";
import { User } from "@prisma/client";
import { ERROR_USERS_JOIN_UNIQUE_EMAIL } from "../../utils/constants";

const resolvers: Resolvers = {
  Mutation: {
    join: async (
      _,
      {
        email,
        username,
        password,
        serviceId = "NULL",
      }: {
        email: string;
        username: string;
        password: string;
        serviceId?: string;
      },
      { client }
    ) => {
      try {
        // Check unique email.
        const foundEmail: User | null = await client.user.findUnique({
          where: { email },
        });
        if (foundEmail) {
          console.error("[join]", ERROR_USERS_JOIN_UNIQUE_EMAIL);
          return {
            ok: false,
            error: {
              code: 409,
              message: ERROR_USERS_JOIN_UNIQUE_EMAIL,
            },
          };
        }

        // Check unique username.
        const foundUsername = await client.user.findUnique({
          where: { username },
        });
        if (foundUsername) {
          console.error("[join]", ERROR_USERS_JOIN_UNIQUE_USERNAME);
          return {
            ok: false,
            error: {
              code: 409,
              message: ERROR_USERS_JOIN_UNIQUE_USERNAME,
            },
          };
        }

        // Encrypt password.
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create new user.
        const createdUser: User = await client.user.create({
          data: {
            email,
            username,
            password: encryptedPassword,
            serviceId,
          },
        });

        return {
          ok: true,
          data: createdUser,
        };
      } catch (e) {
        console.error("[join]", e);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Failed user join.",
          },
        };
      }
    },
  },
};

export default resolvers;
