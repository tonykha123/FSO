import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { useApolloClient, useQuery } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  //this is how to handle the first render where result is loading..
  //this block runs if the response is still loading
  if (
    (result.loading && booksResult.loading) ||
    booksResult.loading ||
    result.loading
  ) {
    return <div>loading...</div>
  }

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const loginButtons = token ? (
    <>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={logOut}>logout</button>
    </>
  ) : (
    <button onClick={() => setPage('login')}>login</button>
  )

  if (!token) {
    return <LoginForm setToken={setToken} />
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {loginButtons}
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />

      <Books show={page === 'books'} books={booksResult.data.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
