import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOGIN } from "../graphql/mutations";

const LoginForm = ({ show, setError, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data, setToken]);

  const submit = (e) => {
    e.preventDefault();

    login({ variables: { username, password } });
    setPage("books");

    setUsername("");
    setPassword("");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <h1>Log in</h1>
        <div>
          username:{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
