import React from 'react';

function ProfessorList() {
  return (
    <div className="professor-list">
      {Array(6).fill().map((_, index) => (
        <div key={index} className="professor-card">
          <div className="professor-image"></div>
          <div className="professor-name">John Doe</div>
        </div>
      ))}
    </div>
  );
}

export default ProfessorList;