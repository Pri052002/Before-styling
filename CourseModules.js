import React from 'react';
import ModuleList from './ModuleList';
import CreateModule from './CreateModule';

const CourseModules = ({ courseId }) => {
    return (
        <div>
            <h2>Course Modules</h2>
            <ModuleList courseId={courseId} />
            <CreateModule courseId={courseId} />
        </div>
    );
};

export default CourseModules;
