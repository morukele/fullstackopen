import React from "react";

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  );
};

const Part = ({ name, exercise }) => {
  return (
    <div>
      <p>
        {name} {exercise}
      </p>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercise={part.exercises} key={part.name} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const doSum = () => {
    let s = 0;
    parts.forEach((part) => {
      s += part.exercises;
    });
    return s;
  };
  const sum = doSum();

  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
