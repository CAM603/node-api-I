import React, {useState} from 'react';
import axios from 'axios'

const AddUser = (props) => {
    const [newUser, setNewUser] = useState({
        name: '',
        bio: ''
    })

    const handleChanges = event => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        axios.post(`http://localhost:5000/api/users`, newUser)
        .then(res => {
            let updatedUsers = [...props.users, res.data]
            props.setUsers(updatedUsers)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                name="name"
                type="text"
                onChange={handleChanges}
                value={newUser.name}
                placeholder="name"
                />
                <input
                name="bio"
                type="textarea"
                onChange={handleChanges}
                value={newUser.bio}
                placeholder="bio"
                />
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddUser;