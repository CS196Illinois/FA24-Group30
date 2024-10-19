import React from 'react';

function KeywordSearch() {
  return (
    <div className="keyword-search">
      <button className="upload-button">Upload Resume Here</button>
      <div className="matching-keywords">
        <h3>Matching Keywords</h3>
        <p>Here are some research interests we found in your resume:</p>
        {/* Replace with actual keywords */}
        {Array(5).fill().map((_, index) => (
          <p key={index}>Keyword {index + 1}</p>
        ))}
      </div>
      <div className="matching-professors">
        <h3>Matching Professors</h3>
        {Array(3).fill().map((_, index) => (
          <div key={index} className="professor-match">
            <div className="professor-image"></div>
            <p>Professor Info {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeywordSearch;