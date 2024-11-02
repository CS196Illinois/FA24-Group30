import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import re

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

# Define domain-specific keywords for programming
def get_technical_keywords():
    return {
        "javascript", "java", "python", "swift", "c", "firebase", "react", "vue", "html", "css", 
        "bootstrap", "xcode", "vscode", "api", "algorithm", "iot", "embedded", "arduino", "ml", 
        "data science", "machine learning", "cloud computing", "agile", "scrum", "devops", "nosql", "sql"
    }

# Extract keywords using TF-IDF
def extract_keywords(text):
    lemmatizer = WordNetLemmatizer()
    tokens = word_tokenize(text)
    lemmatized_tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in get_custom_stop_words()]
    
    # Create a DataFrame to count keyword occurrences
    keyword_count = pd.Series(lemmatized_tokens).value_counts()
    
    # Assign weights to technical keywords
    tech_keywords = get_technical_keywords()
    keyword_weights = {word: (count * 2 if word in tech_keywords else count) for word, count in keyword_count.items()}
    
    # Convert to DataFrame for easier sorting
    keyword_df = pd.DataFrame(list(keyword_weights.items()), columns=['Keyword', 'Weight'])
    top_keywords = keyword_df.nlargest(10, 'Weight')
    
    return top_keywords

def main():
    combined_text = preprocess_resumes(resumes)
    keywords = extract_keywords(combined_text)
    
    print("Top Technical Keywords Identified:")
    for keyword, weight in keywords.values:
        print(f" - {keyword} (Weight: {weight:.4f})")

if __name__ == "__main__":
    main()