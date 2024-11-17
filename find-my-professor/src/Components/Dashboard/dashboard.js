import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  return (
    <div className='dashboard d-flex flex-column vh-100'>
      <header className='header d-flex justify-content-between align-items-center px-4 py-2 bg-dark'>
        <div className='logo text-white fs-4 fw-bold'>FindMyProfessor</div>
        <div className='nav d-flex align-items-center'>
          <button className='btn btn-link text-white fw-medium px-2'>Professors</button>
          <button className='btn btn-link text-white fw-medium px-2'>Dashboard</button>
          <input
            type='text'
            placeholder='Keyword Search'
            className='form-control keyword-search-bar ms-3 bg-secondary text-white border-light rounded'
            style={{ width: '200px' }}
          />
        </div>
      </header>
      <main className='main-content flex-grow-1 d-flex flex-column align-items-center justify-content-center px-4'>
        <div className='upload-section w-75 d-flex justify-content-start mb-4'>
          <button className='btn btn-primary upload-button'>Upload Resume Here</button>
        </div>
        <div className='results d-flex justify-content-between w-100'>
          <div className='keywords-section bg-dark text-white p-3 rounded w-50 me-2 overflow-auto' style={{ height: '400px' }}>
            <h3 className='fw-bold'>Matching Keywords</h3>
            <p>Here are some research interests we found in your resume:</p>
            <ul className='list-unstyled'>
              <li>Keyword 1</li>
              <li>Keyword 2</li>
              <li>Keyword 3</li>
              <li>Keyword 4</li>
              <li>Keyword 5</li>
            </ul>
          </div>
          <div className='professors-section bg-dark text-white p-3 rounded w-50 ms-2 overflow-auto' style={{ height: '400px' }}>
            <h3 className='fw-bold'>Matching Professors</h3>
            <div className='professor-card d-flex align-items-center mb-3'>
              <div className='professor-image bg-secondary rounded-circle' style={{ width: '50px', height: '50px' }}></div>
              <p className='mb-0 ms-3'>Professor Info 1</p>
            </div>
            <div className='professor-card d-flex align-items-center mb-3'>
              <div className='professor-image bg-secondary rounded-circle' style={{ width: '50px', height: '50px' }}></div>
              <p className='mb-0 ms-3'>Professor Info 2</p>
            </div>
            <div className='professor-card d-flex align-items-center mb-3'>
              <div className='professor-image bg-secondary rounded-circle' style={{ width: '50px', height: '50px' }}></div>
              <p className='mb-0 ms-3'>Professor Info 3</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
