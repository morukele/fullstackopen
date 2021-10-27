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
  const total = parts.reduce((s, p) => {
    return s + parseInt(p.exercises);
  }, 0);

  return (
    <div>
      <p>
        <strong>Number of exercises {total}</strong>
      </p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
