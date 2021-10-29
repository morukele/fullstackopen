import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import ContactService from "./services/ContactService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    ContactService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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
    var existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatePerson = { ...existingPerson, number: newNumber };
        ContactService.update(existingPerson.id, updatePerson).then(
          (returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : returnedPerson
              )
            );
          }
        );
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      ContactService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (
      window.confirm(
        `are you sure you want to delete ${personToDelete.name} contact ?`
      )
    ) {
      ContactService.remove(personToDelete.id).then((response) =>
        setPersons(persons.filter((p) => p.id !== personToDelete.id))
      );
    }
  };

  const filterContact = (persons, filter) => {
    if (filter === null || filter === "") {
      return (
        <div>
          {persons.map((person) => (
            <Persons
              person={person}
              key={person.name}
              handleDelete={handleDelete}
            />
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
            <Persons
              person={person}
              key={person.name}
              handleDelete={handleDelete}
            />
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
