import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ALL_BOOKS } from "../graphql/queries";

const Books = ({ show }) => {
  const { loading, error, data } = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState("");

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const books = data.allBooks;

  const genres = [
    ...new Set(
      books
        .map((b) => b.genres)
        .flat()
        .map((g) => g.toLowerCase())
    ),
  ];

  const FilteredBooks = ({ genre }) => {
    const filteredBooks = books.filter((b) =>
      b.genres.map((g) => g.toLowerCase()).includes(genre)
    );

    return (
      <div>
        <h3>In genre {genre}</h3>
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>published</th>
            </tr>
            {filteredBooks.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const AllBooks = () => {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <h2>books</h2>

      {genre ? <FilteredBooks genre={genre} /> : <AllBooks />}

      {genres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
