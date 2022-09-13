import { useState } from 'react'
import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'
import { useMutation } from '@apollo/client'
import { updateCache } from '../App'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBookFunction] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      return console.log(error.graphQLErrors[0].message)
    },
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook)
    },
  })

  if (!props.show) {
    return null
  }

  //useMutation hook, the first value from the array is the function that causes said mutation

  const submit = async (event) => {
    event.preventDefault()

    createBookFunction({ variables: { title, author, published, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
