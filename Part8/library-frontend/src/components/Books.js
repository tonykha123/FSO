import { useState } from 'react'

const Books = ({ books, show }) => {
  const [genre, SetGenre] = useState('all')
  if (!show) {
    return null
  }

  //unique values
  //new set is only unique values
  //new set takes an array and returns an object of unique values only
  //spreading takes the object and returns it into individual values
  //flatmap is the same as map but flattens it out to one value
  //by putting the results into an array , it divides by the space
  const genres = [...new Set(books.flatMap((book) => book.genres))]
  //same a map but flats it out to one level

  const filteredBooks = books.filter((book) =>
    genre === 'all' ? book : book.genres.includes(genre)
  )

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Filter books by genre</h3>

      <select
        onChange={(e) => {
          SetGenre(e.target.value)
        }}
      >
        {genres.map((g) => {
          return <option value={g}>{g}</option>
        })}
        <option value="all">All Genres</option>
      </select>

      {genres.map((g) => (
        <button
          key={g}
          onClick={() => {
            SetGenre(g)
          }}
        >
          {g}
        </button>
      ))}
      <button
        onClick={() => {
          SetGenre('all')
        }}
      >
        All Genres
      </button>
    </div>
  )
}

export default Books
