import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS, ME } from "../graphql/queries";
import { get } from "lodash";

const Recommended = ({ show }) => {
  const result = useQuery(ALL_BOOKS);
  const { loading, error, data } = useQuery(ME);

  const me = get(data, "me");

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredBooks = result.data.allBooks.filter((b) =>
    b.genres.map((g) => g.toLowerCase()).includes(me.favoriteGenre)
  );

  return (
    <div>
      <h1>Recommendations</h1>
      <p>
        {me.username} these books are in your favorite genre:{" "}
        <b>{me.favoriteGenre}</b>{" "}
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
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

export default Recommended;
