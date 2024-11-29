import * as pdfjsLib from 'pdfjs-dist';

// Set the workerSrc globally to avoid issues with the PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Parse PDF to extract text
const parsePDF = async (file) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  return new Promise((resolve, reject) => {
    reader.onload = async function () {
      try {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        if (!pdf || !pdf.numPages) {
          reject(new Error('Failed to load PDF document or no pages found.'));
          return;
        }

        let parsedText = '';

        // Loop through all the pages
        for (let i = 1; i <= pdf.numPages; i++) { // Start from page 1
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();

          // Extract text from each page
          const pageText = textContent.items.map((item) => item.str).join(' ');
          parsedText += pageText + '\n';
        }

        resolve(parsedText);
      } catch (error) {
        reject(error); // Catch any errors during parsing
      }
    };

    reader.onerror = function (error) {
      reject(error);
    };
  });
};


// Important 
// Important 
// Important 
// USE THIS TO SEND PARSED TEXT -> THIS SHOULD BE SENT TO keyword_extraction.py
// Function to handle file parsing and return parsed text 
// Important 
// Important 
// Important 
const getParsedText = async (file) => {
  try {
    const parsedText = await parsePDF(file);
    return parsedText; // Return the parsed text for further processing
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
};

export { parsePDF, getParsedText };