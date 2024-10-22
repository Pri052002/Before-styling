import React, { useState } from 'react';
import { enrollInCourse } from '../BaseAPI';
import Payment from './Payment';

const Enrollment = ({ courseId, studentId }) => {
    const [enrollment, setEnrollment] = useState(null);
    const [error, setError] = useState(null); // State to handle errors

    const handleEnroll = () => {
        enrollInCourse(studentId, courseId)
            .then(response => {
                console.log('Enrollment response:', response.data); // Log response
                setEnrollment(response.data);
                setError(null); // Clear error if enrollment was successful
            })
            .catch(error => {
                console.error('Error enrolling in course:', error);
                setError(error.response.data || 'Enrollment failed.'); // Capture error message
            });
    };

    return (
        <div>
            {error && <p>{error}</p>} {/* Display error if it exists */}
            {!enrollment ? (
                <button onClick={handleEnroll}>Enroll</button>
            ) : (
                <div>
                    <h4>Enrolled in {enrollment.courseTitle}</h4>
                    <p>Price: ${enrollment.coursePrice}</p>
                    <Payment enrollmentId={enrollment.enrollmentId} courseId={enrollment.courseId}/> {/* Pass the correct enrollmentId */}
                </div>
            )}
        </div>
    );
};

export default Enrollment;