import jwt from "jsonwebtoken";
import client from "../client";

export const findUserByToken = async (token: string | undefined) => {
  try {
    if (!token) return null;
    const { id } = (await jwt.verify(
      token,
      process.env.SECRET_KEY + ""
    )) as any;
    return client.user.findUnique({ where: { id } });
  } catch (e) {
    return null;
  }
};
