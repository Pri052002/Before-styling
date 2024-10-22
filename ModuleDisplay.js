import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchModulesByCourseId } from '../BaseAPI';
import Certificate from './Certificate';

const ModuleDisplay = () => {
    const { courseId } = useParams();
    const [modules, setModules] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCourseComplete, setIsCourseComplete] = useState(false);
    const [username] = useState('Your Name'); // Replace with actual username logic
    const [courseTitle] = useState('Course Title'); // Replace with actual course title logic
    const navigate = useNavigate();

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await fetchModulesByCourseId(courseId);
                setModules(response.data);
            } catch (error) {
                console.error('Error fetching modules:', error);
                setError(error.message);
            }
        };

        fetchModules();
    }, [courseId]);

    const handleNext = () => {
        if (currentIndex < modules.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleCompleteCourse = () => {
        setIsCourseComplete(true);
    };

    return (
        <div>
            {error && <p>{error}</p>}
            {isCourseComplete ? (
                <Certificate username={username} courseTitle={courseTitle} />
            ) : (
                <>
                    {modules.length > 0 ? (
                        <div>
                            <h2>{modules[currentIndex].title}</h2>
                            <p>{modules[currentIndex].description}</p>

                            <button onClick={handleNext} disabled={currentIndex >= modules.length - 1}>
                                Next
                            </button>

                            {currentIndex === modules.length - 1 && (
                                <button onClick={handleCompleteCourse}>Complete Course</button>
                            )}
                        </div>
                    ) : (
                        <p>No modules available for this course.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ModuleDisplay;
