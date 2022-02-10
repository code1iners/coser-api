import { gql } from "apollo-server-core";

export default gql`
  type User @key(fields: "id") {
    id: ID!
    email: String!
    username: String!
    password: String
    createdAt: String
    updatedAt: String
  }
`;
