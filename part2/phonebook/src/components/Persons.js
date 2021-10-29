import React from "react";

const Persons = ({ person, handleDelete }) => {
  return (
    <div>
      <p key={person.name}>
        {person.name} {person.number}{" "}
        <button onClick={() => handleDelete(person.id)}>Delete</button>
      </p>
    </div>
  );
};

export default Persons;
