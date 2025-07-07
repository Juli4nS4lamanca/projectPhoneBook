import servicePersons from "../services/servicePersons"

const BtnDelete = ({ person, persons, setPersons, setMessage, setType }) => {
  const deletePerson = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      servicePersons
        .deleteService(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setMessage(`${person.name} is deleted`)
          setType('error')
          setTimeout(() => {
            setMessage(null)
            setType(null)
          }, 5000)
        })
        .catch(error => {
          console.error(error)
          setMessage(`${person.name} was already removed from server`)
          setType('error')
          setTimeout(() => {
            setMessage(null)
            setType(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <>
      <button onClick={deletePerson}>Delete</button>
    </>
  )

}

export default BtnDelete
