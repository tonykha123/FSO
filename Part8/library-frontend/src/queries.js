import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      favouriteGenre
      username
    }
  }
`
//the mutation createBook takes in 5 arguments

//then passing said arguments to the addBook
export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`

//the yellow is the function youll be passing back to the mutation
export const EDIT_AGE = gql`
  mutation editAuthorAge($name: String!, $setBornTo: Int!) {
    editAuthorAge(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

// export const LOGIN = gql`
//   mutation login($username: String!, $password: String) {
//     login(username: $username, password: $password) {
//       value
//     }
//   }
// `

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
