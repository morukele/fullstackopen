import anecdotesService from "../services/anecdotes";

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(anecdote);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const increaseVote = (anecdote) => {
  return async (dispatch) => {
    const response = await anecdotesService.updateVotes(anecdote);
    dispatch({
      type: "VOTE",
      data: response,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: "INIT_ANCEDOTES",
      data: anecdotes,
    });
  };
};

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      return state.map((s) => (s.id === id ? { ...s, votes: s.votes + 1 } : s));

    case "NEW_ANECDOTE":
      return [...state, action.data];

    case "INIT_ANCEDOTES":
      return action.data;

    default:
      return state;
  }
};

export default reducer;
