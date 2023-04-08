import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import NewEntryForm from "./components/NewEntryForm";
import Persons from "./components/Persons";
import personService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    console.log(persons);
    console.log(newName);
    const isAlreadyInPhoneBook = persons.some(
      (person) => person.name === newName
    );

    console.log(isAlreadyInPhoneBook);

    if (isAlreadyInPhoneBook) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterTermChange = (event) => {
    setFilterTerm(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.includes(filterTerm)
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filterTerm} onChange={handleFilterTermChange} />
      <h2>Add a New Entry</h2>
      <NewEntryForm
        onSubmit={addName}
        nameValue={newName}
        numberValue={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
