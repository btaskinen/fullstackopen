import { useState } from "react";
import Filter from "./components/Filter";
import NewEntryForm from "./components/NewEntryForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

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
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
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
