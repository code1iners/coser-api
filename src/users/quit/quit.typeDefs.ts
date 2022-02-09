import { gql } from "apollo-server-core";

export default gql`
  type QuitResponse {
    ok: Boolean!
    error: CouserSimpleError
  }

  type Mutation {
    quit(id: Int!): QuitResponse!
  }
`;
