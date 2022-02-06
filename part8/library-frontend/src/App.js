import { useApolloClient } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import Recommended from "./components/Recommended";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem("library-user-token"));
    }
  }, [token]);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    client.clearStore();
    setPage("login");
  };

  return (
    <div>
      <div>
        <h1>Why is this not working well</h1>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
        {token ? (
          <button onClick={() => setPage("recommended")}>recommended</button>
        ) : null}
        {token ? <button onClick={() => logout()}>log out</button> : null}
      </div>
      <Notification errorMessage={errorMessage} />
      <Authors show={page === "authors"} setError={notify} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setError={notify} />
      <LoginForm
        show={page === "login"}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />
      {token ? (
        <Recommended show={page === "recommended"} setError={notify} />
      ) : null}
      ;
    </div>
  );
};

export default App;
