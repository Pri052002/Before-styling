// src/components/Certificate.js

import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './Certificate.css'; // Add a CSS file for styling

const Certificate = ({ username, courseTitle }) => {
    const handleDownload = () => {
        const input = document.getElementById('certificate');
        html2canvas(input).then((canvas) => {
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 190; // Adjust width according to your layout
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('certificate.pdf');
        });
    };

    return (
        <div id="certificate" className="certificate">
            <h1>Certificate of Completion</h1>
            <p>This is to certify that</p>
            <h2>{username}</h2>
            <p>has successfully completed the course</p>
            <h2>{courseTitle}</h2>
            <p>Congratulations on your achievement!</p>
            <p>Issued on: {new Date().toLocaleDateString()}</p>
            <button onClick={handleDownload}>Download Certificate</button>
        </div>
    );
};

export default Certificate;
