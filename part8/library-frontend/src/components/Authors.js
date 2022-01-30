import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_AUTHORS } from "../graphql/queries";
import AuthorForm from "./AuthorForm";

const Authors = ({ show, setError }) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const authors = data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>author</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorForm setError={setError} authors={authors} />
    </div>
  );
};

export default Authors;
