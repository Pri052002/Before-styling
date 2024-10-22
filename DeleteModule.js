import React, { useState } from 'react';

const DeleteModule = ({ moduleId, onModuleDeleted }) => {
    const [error, setError] = useState(null);

    const handleDeleteModule = async () => {
        try {
            const response = await fetch(`http://localhost:5033/api/modules/${moduleId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete module');
            }

            // Call the callback function to update the list of modules
            onModuleDeleted(moduleId);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <button onClick={handleDeleteModule}>Delete Module</button>
        </div>
    );
};

export default DeleteModule;
