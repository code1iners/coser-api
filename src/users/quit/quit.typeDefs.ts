import { gql } from "apollo-server-core";

export default gql`
  type QuitResponse {
    ok: Boolean!
    error: SimpleError
  }

  type Mutation {
    quit(id: Int!): QuitResponse!
  }
`;
