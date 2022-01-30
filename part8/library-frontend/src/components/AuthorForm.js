import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { EDIT_AUTHOR } from "../graphql/mutations";
import { ALL_AUTHORS } from "../graphql/queries";

const AuthorForm = ({ setError, authors }) => {
  const [name, setName] = useState(authors[0].name);
  const [year, setYear] = useState("");

  const [changeBirthYear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (e) => {
    e.preventDefault();

    changeBirthYear({ variables: { name, setBornTo: year } });

    setYear("");
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("Author not found");
    }
  }, [result.data, setError]);

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          Name:{" "}
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          Birth Year:{" "}
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(parseInt(target.value))}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default AuthorForm;
