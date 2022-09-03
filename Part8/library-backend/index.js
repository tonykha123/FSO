const { ApolloServer, gql } = require('apollo-server')
const { books, authors } = require('./db')

const typeDefs = gql`
  type Book {
    title: String!
    author: String!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
  }
`
console.log(books)
const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: () => books,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`listening on ${url}`)
})
