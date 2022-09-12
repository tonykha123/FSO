const { UserInputError, AuthenticationError } = require('apollo-server')
const Book = require('./models/bookSchema')
const Author = require('./models/authorSchema')
const User = require('./models/userSchema')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
require('dotenv').config()

const JWT_SECRET = process.env.SECRET
const PASSWORD = process.env.PASSWORD

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    me: (parent, args, context) => {
      return context.currentUser
    },
    allBooks: async (parent, args, context) => {
      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }

      if (args.author) {
        const existingAuthor = await Author.findOne({
          name: args.author,
        })
        if (existingAuthor) {
          if (args.genre) {
            return await Book.find({
              author: existingAuthor.id,
              genres: { $in: [args.genre] },
            }).populate('author')
          }

          return await Book.find({
            author: existingAuthor.id,
          }).populate('author')
        }

        return null
      }

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
      let author = await Author.findOne({
        name: args.author,
      })

      if (!author) {
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
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
