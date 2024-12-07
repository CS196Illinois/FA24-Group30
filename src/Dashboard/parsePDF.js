import * as pdfjsLib from 'pdfjs-dist';

// Use the locally hosted worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

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

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(' ');
          parsedText += pageText + '\n';
        }

        resolve(parsedText);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = function (error) {
      reject(error);
    };
  });
};

const getParsedText = async (file) => {
  try {
    const parsedText = await parsePDF(file);
    return parsedText;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
};

// Add a default export
export default getParsedText;
export { parsePDF, getParsedText };