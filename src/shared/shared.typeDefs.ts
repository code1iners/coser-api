import { gql } from "apollo-server-core";

export default gql`
  type CouserSimpleError {
    code: Int
    message: String
  }

  type Query {
    couserHello: String
  }
`;
