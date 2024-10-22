import React from 'react';

const Modules = ({ modules }) => {
    return (
        <div>
            <h2>Course Modules</h2>
            <ul>
                {modules.map(module => (
                    <li key={module.moduleId}> {/* Use a unique key */}
                        {module.title} {/* or however you want to display module details */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Modules;
