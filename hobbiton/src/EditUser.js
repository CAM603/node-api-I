import React, { useState } from 'react';

const EditUser = (props) => {
    const [user, setUser] = useState(props.currentUser)

    const handleChanges = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <form onSubmit={() => props.updateUser(user)}>
                <input
                name="name"
                value={user.name}
                onChange={handleChanges}
                />
                <input
                name="bio"
                value={user.bio}
                onChange={handleChanges}
                />
                <button>Update</button>
            </form>
        </div>
    )
}

export default EditUser;