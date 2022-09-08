const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const BooksCollection = require('./models/bookSchema')
const AuthorsCollection = require('./models/authorSchema')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log('error connecting to MongoDB:', err.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthorAge(name: String!, setBornTo: Int!): Author
  }
`
const resolvers = {
  Query: {
    bookCount: async () => BooksCollection.collection.countDocuments(),
    authorCount: async () => AuthorsCollection.collection.countDocuments(),
    allBooks: (parent, args, context) => {
      //the first if statement checks if the author and genre prop exists in the args object.
      //if they exist then return a new array from the filter method
      //where for each book it checks if the books.author is equal to args.author
      //and since the books.genre is an array, we can use the includes method to see if books.genre array includes our passed genre argument
      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.author === args.author && book.genres.includes(args.genre)
        )
      }

      //this if block checks to see if the author prop exists in the args obj
      //if it does exist then it uses the filter method on the books array to return a new
      //array where for each book it checks to see if that specific book.author is equal to the passed argument
      //to not strictly equal we can jsut do includes
      if (args.author) {
        return books.filter((book) => book.author === args.author)
      }
      //the last if block checks to see if the genre prop exists in the args object
      //if it does exist then it uses the filter method on the books array to return a new array
      // for each books.genre array it checks to see if it includes the passed genre argument
      //the filter method returns a new array where all the conditons are met
      if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre))
      }

      //if all the if blocks dont go through then returns books
      return books
    },
    allAuthors: async () => AuthorsCollection.find({}),
  },
  Author: {
    bookCount: (parent, args, context) =>
      //we need a resolver for the Author Schema/type on the bookCount
      //parent of bookCount is author
      //returns a new array through the filter method on the books array
      //for each book sees if the book.author is equal to the parent.name. parent of bookscount is the specific author
      //basically this array is an array of number of books by the specific author

      books.filter((book) => book.author === parent.name).length,
  },

  Mutation: {
    addBook: async (parent, args, context) => {
      //first finds the existing author by querying DB
      let author = await AuthorsCollection.findOne({
        name: args.author,
      })

      if (!author) {
        //if there is no existing author, makes a new author with the name as passed argument
        //if there is existing author, skips this block
        author = new AuthorsCollection({ name: args.author })
        await author.save()
      }
      //new book is just args, and author is author.id
      //saves to db

      const newBook = new BooksCollection({ ...args, author: author.id })
      return newBook.save()
    },

    editAuthorAge: (parent, args, context) => {
      const authorToEdit = authors.find((a) => a.name === args.name)

      if (!authorToEdit) {
        return null
      }

      const updatedAuthor = { ...authorToEdit, born: args.setBornTo }
      //sets authors array to a new array return from map
      //goes thru every author if author.name ===args.name then replace the current iterated author with updated author
      //if not then just make it same
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      )
      return updatedAuthor
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`listening on ${url}`)
})
