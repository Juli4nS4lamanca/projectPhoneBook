import Person from "./Person"
import BtnDelete from "./BtnDelate"

const Persons = ({ persons, query, setPersons, setType, setMessage }) => {

  const listPersons = query => {
    return persons.filter(el => el.name.toLowerCase().includes(query.toLowerCase()))
  }
  return (
    <>
      {listPersons(query).map(person => (
        <div key={person.id}>
          <Person person={person} />
          <BtnDelete persons={persons} person={person} setPersons={setPersons}
            setType={setType} setMessage={setMessage} />
        </div>
      ))}
    </>
  )
}

export default Persons
