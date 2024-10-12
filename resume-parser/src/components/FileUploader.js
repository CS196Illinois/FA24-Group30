import React, { useState } from 'react';
import { parsePDF } from '../utils/parsePDF'; 

const FileUploader = () => {
  const [resumeDetails, setResumeDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const details = await parsePDF(file);
        setResumeDetails(details);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Error parsing PDF: ' + error.message);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {resumeDetails && (
        <div>
          <h3>Name</h3>
          <p>{resumeDetails.name || 'N/A'}</p>

          <h3>Experience</h3>
          <p>{resumeDetails.experience || 'N/A'}</p>

          <h3>Projects</h3>
          <p>{resumeDetails.projects || 'N/A'}</p>

          <h3>Skills</h3>
          <p>{resumeDetails.skills || 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
