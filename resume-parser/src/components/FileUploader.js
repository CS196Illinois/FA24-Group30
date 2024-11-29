import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    onFileUpload(file);  // Send the file to the parent component for processing
  }, [onFileUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf'
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed gray', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      <p>Drag & drop a PDF resume here, or click to select one</p>
    </div>
  );
};

export default FileUploader;
