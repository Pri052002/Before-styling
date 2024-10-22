import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingUsers = ({ token }) => {
    const [pendingUsers, setPendingUsers] = useState([]);

    useEffect(() => {
        const fetchPendingUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5033/api/registrar/pending-users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPendingUsers(response.data);
            } catch (error) {
                console.error('Error fetching pending users:', error);
            }
        };
        fetchPendingUsers();
    }, [token]);

    return (
        <div>
            <h2>Pending Users</h2>
            <ul>
                {pendingUsers.map((user) => (
                    <li key={user.userId}>
                        {user.username} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PendingUsers;