import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import keywordsData from './keywords.json';
import professorsData from './professors.json';
import { getParsedText } from './parsePDF'; // Import only the named export

const Dashboard = () => {
  const fileInputRef = useRef(null);
  const [parsedText, setParsedText] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState('');

  // Function to send parsed text to Flask server
  const sendParsedText = async (parsedText) => {
    try {
      const response = await fetch('http://127.0.0.1:5001/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parsedText }),
      });

      const result = await response.json();
      console.log("Server response:", result);
      setKeywords(result.keywords || []); // Update keywords in state
    } catch (error) {
      console.error("Error sending parsed text:", error);
    }
  };

  // Function to handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError('No file selected.');
      return;
    }

    console.log('File selected:', file.name);
    try {
      const text = await getParsedText(file); // Parse the PDF
      setParsedText(text); // Update parsed text
      setError(''); // Clear any previous errors

      // Send parsed text to Flask server
      await sendParsedText(text);
    } catch (err) {
      console.error('Error parsing PDF:', err);
      setError('Failed to parse PDF. Please try again.');
      setParsedText(''); // Clear text on error
    }
  };

  // Function to trigger file input
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
            Extracted Keywords
          </h3>
          {keywords.length > 0 ? (
            <ul className="list-unstyled" style={{ color: '#ffffff' }}>
              {keywords.map((keyword, index) => (
                <li key={index}>{keyword}</li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#aaaaaa' }}>No keywords found.</p>
          )}
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