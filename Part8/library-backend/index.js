const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const Book = require('./models/bookSchema')
const Author = require('./models/authorSchema')
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
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (parent, args, context) => {
      //the $in in query selects documents where the value of a field is equal to any value in the array
      //so for this, it finds books that are equal to the genres array passed
      //Find returns more than one
      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }

      if (args.author) {
        //if there is an argument of author, run existing author block which queries author collections
        //to find an existing author with the name
        const existingAuthor = await Author.findOne({
          name: args.author,
        })
        if (existingAuthor) {
          //if there is an existing author, checks if there is also args.genre
          if (args.genre) {
            //if there is also args.author with existing author then
            //finds all books in the collection that include the passed argument genre
            //and has the author matching the found author id
            return await Book.find({
              author: existingAuthor.id,
              genres: { $in: [args.genre] },
            }).populate('author')
          }
          //if there is no args.genre then return books collection find
          //where there are all books with the author mnatching the existing author id.
          return await Book.find({
            author: existingAuthor.id,
          }).populate('author')
        }
        //if the passed author argument doesnt match any existing authors, then return null
        return null
      }

      //instead of returning the id, the populate method returns the value in reference
      return await Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (parent, args, context) =>
      await Book.find({ author: parent.id }).countDocuments(),
  },

  Mutation: {
    addBook: async (parent, args, context) => {
      //first finds the existing author by querying DB
      let author = await Author.findOne({
        name: args.author,
      })

      if (!author) {
        //if there is no existing author, makes a new author with the name as passed argument
        //if there is existing author, skips this block
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }

      const newBook = new Book({ ...args, author: author.id })
      try {
        newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return newBook
    },

    editAuthorAge: async (parent, args, context) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        //updates the found user
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`listening on ${url}`)
})
