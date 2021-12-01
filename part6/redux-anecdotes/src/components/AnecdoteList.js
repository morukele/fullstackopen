import { useDispatch, useSelector } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
  sendNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ ancedote, handleClick }) => {
  return (
    <div>
      <div>{ancedote.content}</div>
      <div>
        has {ancedote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const ancedotes = useSelector((state) => state.ancedote);
  const filter = useSelector((state) => state.filter);
  const sortedAncedotes = ancedotes.sort((a, b) => b.votes - a.votes);

  const filteredAncedotes = sortedAncedotes.filter((sa) =>
    sa.content.toLowerCase().includes(filter)
  );

  const handleVote = (ancedote) => {
    dispatch(increaseVote(ancedote));
    dispatch(sendNotification(`You voted ${ancedote.content}`, 3));
  };

  return (
    <div>
      {filteredAncedotes.map((ancedote) => (
        <Anecdote
          key={ancedote.id}
          ancedote={ancedote}
          handleClick={() => handleVote(ancedote)}
        />
      ))}
    </div>
  );
};

export default Anecdotes;
