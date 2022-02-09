import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

const loadedTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.{ts,js}`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.{ts,js}`);

export const typeDefs = mergeTypeDefs(loadedTypeDefs);
export const resolvers = mergeResolvers(loadedResolvers);
