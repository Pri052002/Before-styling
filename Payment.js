import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { payForCourse, fetchModulesByCourseId } from '../BaseAPI';

const Payment = ({ enrollmentId, courseId }) => {
    const [paymentStatus, setPaymentStatus] = useState(false);
    const [error, setError] = useState(null); // State to handle errors
    const navigate = useNavigate();

    // Handle payment
    const handlePayment = () => {
        console.log('Processing payment for enrollment ID:', enrollmentId); // Debugging line
        payForCourse(enrollmentId)
            .then(response => {
                alert('Payment successful!');
                setPaymentStatus(true);
                setError(null); // Clear any previous error
                // Fetch modules here or navigate directly after payment
                navigate(`/modules/${courseId}`); // Navigate to the module display page
            })
            .catch(error => {
                console.error('Error processing payment:', error);
                setError(error.response?.data || 'Payment failed.'); // Capture error message
            });
    };

    return (
        <div>
            {error && <p>{error}</p>} {/* Display error if it exists */}

            {!paymentStatus ? (
                <button onClick={handlePayment}>Pay Now</button>
            ) : (
                <div>
                    <p>Payment Complete!</p>
                    {/* View Modules button is no longer needed here as we're navigating directly after payment */}
                </div>
            )}
        </div>
    );
};

export default Payment;
