import * as pdfjsLib from 'pdfjs-dist';

// Set the workerSrc globally to avoid issues with the PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const parsePDF = async (file) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  return new Promise((resolve, reject) => {
    reader.onload = async function () {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      let parsedText = '';

      try {
        // Loop through all the pages
        for (let i = 1; i <= pdf.numPages; i++) { // Start from 1
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();

          // Extract text from each page
          const pageText = textContent.items.map((item) => item.str).join(' ');
          parsedText += pageText + '\n';
        }
      } catch (error) {
        reject('Error extracting text from PDF: ' + error.message);
      }

      const resumeData = extractResumeData(parsedText);
      resolve(resumeData);
    };

    reader.onerror = function (error) {
      reject('File read error: ' + error.message);
    };
  });
};

// Function to extract structured data from the parsed text
const extractResumeData = (text) => {
  const resumeData = {
    name: '',
    experience: '',
    projects: '',
    skills: '',
  };

  // Regular expressions to match the relevant sections
  const nameRegex = /^(.*?)(?=\s+EDUCATION)/m;  // Assuming EDUCATION comes after NAME
  const experienceRegex = /EXPERIENCE\s+(.*?)(?=\s+PROJECTS)/ms; // Match between EXPERIENCE and PROJECTS
  const projectsRegex = /PROJECTS\s+(.*?)(?=\s+SKILLS)/ms; // Match between PROJECTS and SKILLS
  const skillsRegex = /SKILLS\s+(.*)$/m; // Match everything after SKILLS

  const nameMatch = text.match(nameRegex);
  const experienceMatch = text.match(experienceRegex);
  const projectsMatch = text.match(projectsRegex);
  const skillsMatch = text.match(skillsRegex);

  if (nameMatch) {
    resumeData.name = nameMatch[0].trim();
  }
  if (experienceMatch) {
    resumeData.experience = experienceMatch[1].trim();
  }
  if (projectsMatch) {
    resumeData.projects = projectsMatch[1].trim();
  }
  if (skillsMatch) {
    resumeData.skills = skillsMatch[1].trim();
  }

  return resumeData;
};

export { parsePDF };
