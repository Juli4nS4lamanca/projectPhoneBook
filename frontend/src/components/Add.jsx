import { useState } from 'react'
import servicePersons from '../services/servicePersons'

const Add = ({ persons, setPersons, setType, setMessage }) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const duplicado = persons.some(person => person.name === newName)

    if (duplicado) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }

        servicePersons
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`Updated ${changedPerson.name}'s number`)
            setType('success')
            setTimeout(() => {
              setMessage(null)
              setType(null)
            }, 5000)
          })
          .catch(error => {
            if (error.response?.status === 404) {
              setMessage(`${person.name} has already been removed from the server`)
              setType('error')
              setPersons(persons.filter(p => p.id !== person.id))
            } else {
              const errorMessage = error.response?.data?.error
                ? error.response.data.error
                : 'An unexpected error'
              setMessage(errorMessage)
              setType('error')
            }
            setTimeout(() => {
              setMessage(null)
              setType(null)
            }, 5000)
          })
      }
      return
    }

    servicePersons
      .add(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${personObject.name}`)
        setType('success')
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
      })
      .catch(error => {
        const errorMessage = error.response?.data?.error
          ? error.response.data.error
          : 'An unexpected error'
        setMessage(errorMessage)
        setType('error')
        console.log(error.response.data.error)
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
      })
  }

  const handlePersonChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }
  return (
    <>
      <h2>Add a new person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          phone: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default Add
