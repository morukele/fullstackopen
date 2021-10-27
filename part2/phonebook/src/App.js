import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const filterContact = (persons, filter) => {
    if (filter === null || filter === "") {
      return (
        <div>
          {persons.map((person) => (
            <Persons person={person} key={person.name} />
          ))}
        </div>
      );
    } else {
      let list = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

      if (list.length === 0) {
        return (
          <div>
            <p> No contact with this filter found</p>
          </div>
        );
      }

      return (
        <div>
          {list.map((person) => (
            <Persons person={person} key={person.name} />
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a New Number</h2>
      <PersonForm
        handleAdd={handleAdd}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      {filterContact(persons, filter)}
    </div>
  );
};

export default App;
