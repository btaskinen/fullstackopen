import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import NewEntryForm from "./components/NewEntryForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [notification, setNotification] = useState(null);

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
      if (
        window.confirm(
          `${newName} is already added to phonebook. Do you want to replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.name === newName);
        const updatedPerson = { ...person, number: newNumber };

        personService
          .update(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : returnedPerson
              )
            );
          });
        setNotification(`${newName}'s phone number was successfully updated`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      } else {
        setNewName("");
        setNewNumber("");
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNotification(
          `Person ${newName} was successfully added to the phonebook`
        );
        setTimeout(() => {
          setNotification(null);
        }, 5000);
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

  const deletePerson = (object) => {
    console.log(object);
    if (window.confirm(`Delete ${object.name}?`)) {
      personService.deletePerson(object).then((response) => {
        setPersons(persons.filter((person) => person.id !== object.id));
        setNotification(`${response}`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.includes(filterTerm)
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
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
      <Persons persons={personsToShow} onClick={deletePerson} />
    </div>
  );
};

export default App;
