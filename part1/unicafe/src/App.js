import React, { useState } from "react";

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h3>No feedback given</h3>
      </div>
    );
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} sign={"%"} />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value, sign = null }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {sign}
      </td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let total = good + bad + neutral;
  let average = (1 * good + 0 * neutral - 1 * bad) / total;
  let positive = (good / total) * 100;

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>

      <div>
        <Button text="Good" handleClick={handleGood} />
        <Button text="Neutral" handleClick={handleNeutral} />
        <Button text="Bad" handleClick={handleBad} />
      </div>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
