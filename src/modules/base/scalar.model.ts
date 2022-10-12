import { GraphQLScalarType, Kind } from "graphql";

export const Datetime = new GraphQLScalarType({
  name: "Datetime",
  description: "Represents a datetime object",
  serialize(value: any) {
    return value.toISOString();
  },
  parseValue(value: any) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});
