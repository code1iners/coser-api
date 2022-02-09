import { gql } from "apollo-server-core";

export default gql`
  type QuitResponse {
    ok: Boolean!
    error: CoserSimpleError
  }

  type Mutation {
    quit(id: Int!): QuitResponse!
  }
`;
