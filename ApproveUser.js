import React, { useState } from 'react';
import axios from 'axios';

const ApproveUser = ({ token }) => {
    const [userId, setUserId] = useState('');

    const handleApprove = async () => {
        try {
            await axios.post(`http://localhost:5033/api/registrar/approve/${userId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('User approved successfully!');
        } catch (error) {
            alert('Approval failed. ' + (error.response?.data.message || error.message));
        }
    };

    return (
        <div>
            <h2>Approve User</h2>
            <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="User ID"
                required
            />
            <button onClick={handleApprove}>Approve</button>
        </div>
    );
};

export default ApproveUser;
