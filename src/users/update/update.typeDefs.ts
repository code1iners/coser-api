import { gql } from "apollo-server-core";

export default gql`
  type UpdateUserResponse {
    ok: Boolean!
    data: User
    error: CoserSimpleError
  }

  type Mutation {
    updateUser(
      id: Int!
      email: String
      username: String
      password: String
    ): UpdateUserResponse!
  }
`;
