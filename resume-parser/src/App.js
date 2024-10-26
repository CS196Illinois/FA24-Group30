import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import { parsePDF } from './utils/parsePDF';

const App = () => {
  const [parsedText, setParsedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const text = await parsePDF(file);
      setParsedText(text);
    } catch (err) {
      setError('Failed to parse the PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Resume Parser</h1>
      <FileUploader onFileUpload={handleFileUpload} />

      {loading && <p>Parsing PDF...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {parsedText && (
        <div>
          <h3>Parsed Resume Text:</h3>
          <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', whiteSpace: 'pre-wrap' }}>{parsedText}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
