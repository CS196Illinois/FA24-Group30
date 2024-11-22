import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import re

# Ensure you have downloaded the necessary NLTK resources
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')

# Predefined set of highly specific technical terms for filtering
TECHNICAL_TERMS = {
    "algorithm", "analysis", "api", "arduino", "authentication", "backend", "bootstrap", "c",
    "chartjs", "cloud", "computer", "data", "design", "developer", "dynamic", "embedded",
    "engineering", "evaluation", "firebase", "firebaseauth", "frontend", "integration", "java",
    "javascript", "learning", "machine", "natural", "python", "reactjs", "sass", "science",
    "secure", "system", "vscode", "vuejs", "vuex", "xcode", "accelerometer", "interface",
    "software", "prototype", "evaluation", "storage", "ml", "ai", "databases", "nlp", "big data",
    "microservices", "docker", "kubernetes", "ci/cd", "linux", "networking", "security"
}

# Sample input resumes
resumes = [
    """EDUCATION: University of Illinois Urbana-Champaign, Expected May 2027, 
    Bachelor of Science in Computer Science + Advertising, GPA: 4.0/4.0, James Scholar Honors Student""",
    
    """EXPERIENCE: SHS Connect, Internship, Lincolnshire, IL, Full Stack Mobile App Developer, Team Lead, 
    March 2023 - August 2024, Directed team of 4 to develop an iOS messaging app for communication between deans 
    and 4,000+ students, Automated push notifications with Firebase Cloud Functions (JS), Integrated with APNS, 
    Ensured real-time notifications, Implemented secure user authentication with FirebaseAuth, Automated CSV uploads 
    to Firestore using Firebase Functions.""",

    """EXPERIENCE: Rebels Wrestling, YouTube, Chicago, IL, Content Creator, Graphic Designer, Founder, 
    June 2020 - Present, Created 300+ NCAA wrestling videos, Gained over 7,000+ subscribers, Leveraged SEO and 
    designed thumbnails for 4M+ views, Generated over $10,000+ profit through Google Ads and Sponsorships.""",

    """PROJECTS: Endure Fitness Analyzer, Web App, Full Stack Developer, July 2024 - August 2024, 
    Developed fitness analysis tool with React.js and Chart.js for 100+ users, API integration for targeted muscle groups, 
    Firebase for secure data management.""",

    """PROJECTS: Stevenson Space, School Website, Lincolnshire, IL, Front End Developer, April 2023 - January 2024, 
    Used Vue.js for real-time gym countdown timer, Vuex for state management, and SASS for responsive design, used by 
    4,000+ students and staff.""",

    """PROJECTS: Shin Step Tracker, Personal Project, Chicago, IL, Embedded Systems Engineer, 
    August 2022 - May 2023, Arduino project for runners with overuse injuries, integrated accelerometers, tilt switches, 
    buttons, and LCD displays with 95% accuracy, C/RobotC algorithm for dynamic mileage limits.""",

    """SKILLS: JavaScript (Vue.js, React.js), Swift, Python, Java, C, Bootstrap, XCode, VSCode, 
    Language: English (Native), Spanish (Fluent), Marathi (Native), Hindi (Intermediate)"""
]

# Sample research posting text
research_posting = """
Position Title: Undergraduate Research Assistant - Software Engineering (SWE)

Responsibilities:
- Design and implement software solutions for research experiments, including front-end interfaces and back-end services.
- Develop and optimize algorithms for data analysis, machine learning, and natural language processing.
- Collaborate with team members to test, evaluate, and document research prototypes.
- Integrate and interact with APIs for data collection and system evaluation.
- Assist in the preparation of research papers, presentations, and technical documentation.
"""

# Preprocess and combine text
def preprocess_text(text):
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text).lower()
    return text

# Extract technical keywords
def extract_technical_keywords(text, technical_terms):
    processed_text = preprocess_text(text)
    words = set(processed_text.split())
    return words.intersection(technical_terms)

# Extract general keywords with lemmatization and stopword filtering
def extract_keywords(text):
    lemmatizer = WordNetLemmatizer()
    tokens = word_tokenize(text)
    custom_stop_words = stopwords.words('english') + [
        "experience", "internship", "project", "projects", "created", "gained", "developed",
        "team", "used", "with", "for", "the", "of", "in", "on", "to", "and", "at",
        "software", "app", "applications", "cloud", "data"
    ]
    keywords = [lemmatizer.lemmatize(token) for token in tokens if token.lower() not in custom_stop_words]
    return set(keywords)

if __name__ == "__main__":
    # Preprocess the resume and research posting texts
    combined_resume_text = preprocess_text(" ".join(resumes))
    processed_posting_text = preprocess_text(research_posting)

    # Extract keywords
    resume_keywords = extract_technical_keywords(combined_resume_text, TECHNICAL_TERMS)
    research_posting_keywords = extract_keywords(processed_posting_text)

    # Find missing keywords
    missing_keywords = research_posting_keywords - resume_keywords

    # Print extracted keywords and missing keywords
    print("Extracted Technical Keywords from Resume:")
    print(", ".join(sorted(resume_keywords)))

    print("\nExtracted Keywords from Research Posting:")
    print(", ".join(sorted(research_posting_keywords)))

    print("\nMissing Keywords from Resume (found in Research Posting):")
    print(", ".join(sorted(missing_keywords)))