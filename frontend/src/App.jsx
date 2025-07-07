import { useState, useEffect } from 'react'
import Add from './components/Add'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notificacion from './components/Notification'
import servicePersons from './services/servicePersons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  const hook = () => {
    servicePersons
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }

  useEffect(hook, [])

  const [filter, setFilter] = useState('')

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notificacion message={message} type={type} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Add persons={persons} setPersons={setPersons}
        setType={setType} setMessage={setMessage} />
      <h2>Numbers</h2>
      <Persons persons={persons} query={filter}
        setPersons={setPersons} setType={setType} setMessage={setMessage} />
    </>
  )
}

export default App
