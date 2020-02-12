import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import AddUser from './AddUser';
import EditUser from './EditUser';

function App() {
  const [users, setUsers] = useState([])
  const [editing, setEditing] = useState(false)
  const initialUser = {id: '', name: '', bio: ''}
  const [currentUser, setCurrentUser] = useState(initialUser)

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

  const editUser = (user) => {
    setEditing(true);
    setCurrentUser({id: user.id, name: user.name, bio: user.bio})
  }

  const updateUser = (user) => {
    setEditing(false)
    axios.put(`http://localhost:5000/api/users/${user.id}`, user)
    .then(res => {
      const editedUser = users.map(el => el.id === user.id ? user : el)
      setUsers(editedUser)
    })
    .catch(err => console.log(err))
    fetchUsers()
  }

  return (
    <div className="App">
      <div className="user-container">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <h4>{user.bio}</h4>
            <button onClick={() => deleteUser(user.id)}>DELETE</button>
            <button onClick={() => editUser(user)}>Edit</button>
          </div>
        ))}
      </div>
      {editing 
      ?
      <EditUser
      editing={editing}
      setEditing={setEditing}
      updateUser={updateUser}
      currentUser={currentUser}
      />
      :
      <AddUser
      setUsers={setUsers}
      users={users}
      />
      }
    </div>
  );
}

export default App;
