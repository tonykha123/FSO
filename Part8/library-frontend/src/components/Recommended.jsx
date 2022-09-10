import React from 'react'

const Recommended = ({ show, user, books }) => {
  if (!show) {
    return null
  }

  const filteredBooks = books.filter((b) =>
    b.genres.includes(user.favouriteGenre)
  )

  const bookElements = filteredBooks ? (
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
  ) : (
    <h2>You dont have a favourite genre</h2>
  )
  

  return (
    <div>
      <h1>Recommended</h1>
      <p>Books in your favourite genre :{user.favouriteGenre}</p>

      {bookElements}
    </div>
  )
}

export default Recommended
