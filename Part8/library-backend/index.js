const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const Book = require('./models/bookSchema')
const Author = require('./models/authorSchema')
const User = require('./models/userSchema')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.SECRET
const PASSWORD = process.env.PASSWORD

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log('error connecting to MongoDB:', err.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }
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
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthorAge(name: String!, setBornTo: Int!): Author
    createUser(username: String, favouriteGenre: String!): User
    login(username: String, password: String!): Token
  }
`
const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    me: (parent, args, context) => {
      return context.currentUser
    },
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
    addBook: async (parent, args, { currentUser }) => {
      //first finds the existing author by querying DB
      let author = await Author.findOne({
        name: args.author,
      })

      // if (!currentUser) {
      //   throw new AuthenticationError('Not Authorized, Please login')
      // }

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

    editAuthorAge: async (parent, args, { currentUser }) => {
      const author = await Author.findOne({ name: args.name })

      if (!currentUser) {
        throw new AuthenticationError('Not Authorized, Please login')
      }

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

    createUser: async (parent, args, context) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      })

      return user.save().catch((err) => {
        throw new UserInputError(err.message, { invalidArgs: args })
      })
    },

    login: async (parent, args, context) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== PASSWORD) {
        throw new UserInputError(`Wrong Credentials`)
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`listening on ${url}`)
})
