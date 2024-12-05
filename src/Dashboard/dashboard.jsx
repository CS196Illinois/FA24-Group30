import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import keywordsData from './keywords.json'; // Import JSON file for keywords
import professorsData from './professors.json'; // Import JSON file for professors

const Dashboard = () => {
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
        >
          Upload Resume Here
        </button>
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
    </main>
  );
};

export default Dashboard;
