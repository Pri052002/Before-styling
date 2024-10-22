import React, { useState, useEffect } from 'react';

const ModuleList = ({ courseId }) => {
    const [modules, setModules] = useState([]);
    const [error, setError] = useState(null);

    // Fetch modules on component mount
    useEffect(() => {
        fetchModules(courseId);
    }, [courseId]);

    const fetchModules = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:5033/api/modules/course/${courseId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch modules');
            }
            const data = await response.json();
            setModules(data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {modules.length > 0 ? (
                <ul>
                    {modules.map(module => (
                        <li key={module.moduleId}>
                            {module.title} - {module.description}
                            {/* Add buttons to edit or delete here */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No modules available for this course.</p>
            )}
        </div>
    );
};

export default ModuleList;
