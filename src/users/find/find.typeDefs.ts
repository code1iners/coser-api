import { gql } from "apollo-server-core";

export default gql`
  type Query {
    findUserByUsername(username: String!): User
  }

  type Query {
    findUserById(id: Int!): User
  }
`;
