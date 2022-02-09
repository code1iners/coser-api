import { gql } from "apollo-server-core";

export default gql`
  type LoginResponse {
    ok: Boolean!
    token: String
    error: CouserSimpleError
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse!
  }
`;
