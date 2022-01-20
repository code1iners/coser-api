import { gql } from "apollo-server-core";

export default gql`
  type JoinResponse {
    ok: Boolean!
    data: User
    error: SimpleError
  }

  type Mutation {
    join(email: String!, username: String!, password: String!): JoinResponse!
  }
`;
