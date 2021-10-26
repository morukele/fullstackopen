import React from "react";

const Persons = ({ person }) => {
  return (
    <div>
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    </div>
  );
};

export default Persons;
