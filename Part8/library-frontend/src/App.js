import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { useQuery } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  //this is how to handle the first render where result is loading..
  //this block runs if the response is still loading
  if (
    (result.loading && booksResult.loading) ||
    booksResult.loading ||
    result.loading
  ) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />

      <Books show={page === 'books'} books={booksResult.data.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App