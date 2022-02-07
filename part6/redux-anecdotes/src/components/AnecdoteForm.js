import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { sendNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";

    props.createAnecdote(anecdote);
    props.sendNotification(`new anecdote ${anecdote}`, 3);
  };

  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  );
};

export default connect(null, { createAnecdote, sendNotification })(
  AnecdoteForm
);
