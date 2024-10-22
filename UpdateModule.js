import React, { useState } from 'react';

const UpdateModule = ({ moduleId, initialTitle, initialDescription }) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleUpdateModule = async () => {
        try {
            const updatedModule = {
                moduleId,
                title,
                description,
            };

            const response = await fetch(`http://localhost:5033/api/modules/${moduleId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedModule),
            });

            if (!response.ok) {
                throw new Error('Failed to update module');
            }

            setSuccess('Module updated successfully!');
            setError(null);
        } catch (error) {
            setError(error.message);
            setSuccess(null);
        }
    };

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {success && <p>{success}</p>}
            <h3>Update Module</h3>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleUpdateModule}>Update Module</button>
        </div>
    );
};

export default UpdateModule;
