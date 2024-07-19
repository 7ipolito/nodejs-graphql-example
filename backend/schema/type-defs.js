const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }

type Movie{
  id: ID!
  name: String!
  yearOfPublication: Int!
  isInTheaters:Boolean!
}
  type Query{
    users:UsersResult
    user(id: ID!): User!
    movies:[Movie!]!
    movie(name:String!): Movie!
  }

  input CreateUserInput{
    name: String!
    username: String!
    age: Int = 18
    nationality: Nationality = BRAZIL
  }

  input UpdateUsernameInput{
    id:ID!
    newUsername: String!
  }


  type Mutation{
    createUser(input:CreateUserInput!): User!
    updateUsername(input:UpdateUsernameInput!):User
    deleteUser(id: ID!):User
  }


  enum Nationality{
    BRAZIL
    CANADA
    INDIA 
    CHILE
    GERMANY
    ARGENTINA
  }

  type UsersSucessfulResult{
    users: [User!]!
  }


  type UsersErrorsResult{
    message:String!
  }

  union UsersResult = UsersSucessfulResult | UsersErrorsResult 

`


module.exports = { typeDefs }