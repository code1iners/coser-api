import { gql } from "apollo-server-core";

export default gql`
  type JoinResponse {
    ok: Boolean!
    data: User
    error: CoserSimpleError
  }

  type Mutation {
    join(
      email: String!
      username: String!
      password: String!
      serviceId: String
    ): JoinResponse!
  }
`;
