const Persons = ({ persons, onClick }) => (
  <>
    {persons.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
        <button type="button" onClick={() => onClick(person)}>
          delete
        </button>
      </p>
    ))}
  </>
);

export default Persons;
