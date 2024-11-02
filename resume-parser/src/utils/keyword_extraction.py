import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import re
from collections import defaultdict

# Ensure you have downloaded the necessary NLTK resources
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')

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

# Preprocess and combine resumes
def preprocess_resumes(resumes):
    combined_text = "\n".join(resumes)
    combined_text = re.sub(r'[^a-zA-Z0-9\s]', '', combined_text).lower()
    return combined_text

# Custom stop words for technical resumes
def get_custom_stop_words():
    custom_stop_words = set(stopwords.words('english'))
    additional_stop_words = {
        "experience", "internship", "project", "projects", "created", "gained", "developed",
        "team", "used", "with", "for", "the", "of", "in", "on", "to", "and", "at",
        "software", "app", "applications", "cloud", "data"
    }
    return custom_stop_words.union(additional_stop_words)

# Define domain-specific keywords for programming, grouped by category
def get_technical_keywords():
    return {
        "programming_languages": {"javascript", "java", "python", "swift", "c", "c++", "ruby", "go"},
        "frameworks": {"react", "vue", "angular", "django", "flask", "bootstrap", "sass"},
        "databases": {"firebase", "mongodb", "mysql", "postgresql", "sqlite"},
        "tools": {"xcode", "vscode", "git", "docker", "kubernetes"},
        "methodologies": {"agile", "scrum", "devops", "waterfall", "test-driven"},
        "concepts": {"api", "algorithm", "iot", "embedded", "machine learning", "data science", "cloud computing"}
    }

# Extract keywords using TF-IDF
def extract_keywords(text):
    lemmatizer = WordNetLemmatizer()
    tokens = word_tokenize(text)
    lemmatized_tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in get_custom_stop_words()]

    # Create a dictionary to count keyword occurrences by category
    keyword_categories = defaultdict(lambda: {"count": 0, "words": set()})
    tech_keywords = get_technical_keywords()

    # Count occurrences of each token in the appropriate category
    for token in lemmatized_tokens:
        for category, keywords in tech_keywords.items():
            if token in keywords:
                keyword_categories[category]["count"] += 1
                keyword_categories[category]["words"].add(token)  # Add the token to the words set
                break  # Stop after finding the first matching category

    return keyword_categories

def main():
    combined_text = preprocess_resumes(resumes)
    keywords = extract_keywords(combined_text)

    print("Top Technical Keywords Identified by Category:")
    for category, data in keywords.items():
        print(f" - {category.capitalize()}: {data['count']}")
        print(f"   Keywords: {', '.join(data['words'])}")

if __name__ == "__main__":
    main()