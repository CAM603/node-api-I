import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import AddUser from './AddUser';

function App() {
  const [users, setUsers] = useState([])
  const [editing, setEditing] = useState(false)

  const fetchUsers = () => {
    axios.get('http://localhost:5000/api/users')
    .then(res => setUsers(res.data))
    .catch(err => console.log(err))
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
    .then(res => {
      console.log(res)
      const updatedUsers = users.filter(user => user !== res.data)
      setUsers(updatedUsers)
      fetchUsers()
    })
    .catch(err => console.log(err))
  }
  return (
    <div className="App">
      <div className="user-container">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <h4>{user.bio}</h4>
            <button onClick={() => deleteUser(user.id)}>DELETE</button>
            <button>Edit</button>
          </div>
        ))}
      </div>
      <AddUser
      setUsers={setUsers}
      users={users}
      />
    </div>
  );
}

export default App;
