import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import keywordsData from './keywords.json';
import professorsData from './professors.json';
import { getParsedText } from './parsePDF'; // Import only the named export

const Dashboard = () => {
  const fileInputRef = useRef(null);
  const [parsedText, setParsedText] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError('No file selected.');
      return;
    }

    console.log('File selected:', file.name);
    try {
      const text = await getParsedText(file); // Use getParsedText
      setParsedText(text); // Update parsed text
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error parsing PDF:', err);
      setError('Failed to parse PDF. Please try again.');
      setParsedText(''); // Clear text on error
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <main
      className="main-content flex-grow-1 d-flex flex-column align-items-center justify-content-start px-4"
      style={{
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
        height: '100vh',
        paddingTop: '20px',
      }}
    >
      <div
        className="upload-section w-75 d-flex justify-content-center mb-4"
        style={{ marginTop: '20px' }}
      >
        <button
          className="btn text-white"
          style={{
            backgroundColor: '#3c3c3c',
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid #ffffff',
          }}
          onClick={triggerFileInput}
        >
          Upload Resume Here
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </div>
      <div className="results d-flex justify-content-between w-100 px-5 mt-4">
        <div
          className="keywords-section p-4 rounded"
          style={{
            backgroundColor: '#2b2b2b',
            width: '45%',
            borderRadius: '10px',
            overflow: 'auto',
            height: '500px',
          }}
        >
          <h3 className="fw-bold" style={{ color: '#ffffff' }}>
            Matching Keywords
          </h3>
          <p style={{ color: '#aaaaaa' }}>
            Here are some research interests we found in your resume:
          </p>
          <ul className="list-unstyled" style={{ color: '#ffffff' }}>
            {keywordsData.keywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>
        <div
          className="professors-section p-4 rounded"
          style={{
            backgroundColor: '#2b2b2b',
            width: '45%',
            borderRadius: '10px',
            overflow: 'auto',
            height: '500px',
          }}
        >
          <h3 className="fw-bold" style={{ color: '#ffffff' }}>
            Matching Professors
          </h3>
          {professorsData.professors.map((professor, index) => (
            <div
              className="professor-card d-flex align-items-center mb-3"
              key={index}
              style={{
                backgroundColor: '#3c3c3c',
                padding: '15px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={professor.image}
                alt={professor.name}
                className="rounded-circle"
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  backgroundColor: '#5a5a5a',
                }}
              />
              <p className="mb-0 ms-3" style={{ color: '#ffffff' }}>
                {professor.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        className="parsed-text-section mt-4 p-4 rounded"
        style={{
          backgroundColor: '#2b2b2b',
          width: '90%',
          color: '#ffffff',
          maxHeight: '300px',
          overflow: 'auto',
        }}
      >
        <h3 className="fw-bold">Parsed Resume Text</h3>
        {error ? (
          <p style={{ color: '#ff6b6b' }}>{error}</p>
        ) : (
          <p style={{ whiteSpace: 'pre-wrap' }}>{parsedText}</p>
        )}
      </div>
    </main>
  );
};

export default Dashboard;