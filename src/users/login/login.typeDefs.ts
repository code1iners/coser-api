import { gql } from "apollo-server-core";

export default gql`
  type LoginResponse {
    ok: Boolean!
    token: String
    error: CoserSimpleError
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse!
  }
`;
