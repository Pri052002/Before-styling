import React from 'react';

const UserList = ({ users }) => {
    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.UserId}>{user.Username} - {user.Email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;