import { gql } from "apollo-server-core";

export default gql`
  type CoserSimpleError {
    code: Int
    message: String
  }

  type Query {
    coserHello: String
  }
`;
