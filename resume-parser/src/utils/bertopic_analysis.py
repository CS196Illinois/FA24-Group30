from bertopic import BERTopic
from sklearn.feature_extraction.text import CountVectorizer
from nltk.corpus import stopwords
import nltk
import hdbscan

# Ensure NLTK stopwords are downloaded
nltk.download("stopwords")
nltk.download("punkt")

# Text data split into sections
text_sections = [
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

# Configure BERTopic with a custom vectorizer and adjusted HDBSCAN parameters
vectorizer_model = CountVectorizer(stop_words="english", ngram_range=(1, 3), max_features=500)  # Adjusted max_features
topic_model = BERTopic(vectorizer_model=vectorizer_model)

# Create HDBSCAN model with further adjusted parameters
hdbscan_model = hdbscan.HDBSCAN(min_samples=2, min_cluster_size=2)  # Further adjusted parameters
topic_model.hdbscan_model = hdbscan_model

# Fit the model to our data
topics, probabilities = topic_model.fit_transform(text_sections)

# Show topics
topic_info = topic_model.get_topic_info()
print("Topic Info:")
print(topic_info)

# Show keywords for each topic
print("\nKeywords Identified:")
for i in range(len(topic_info)):
    topic_keywords = topic_model.get_topic(i)
    if topic_keywords:  # Check if topic has keywords
        print(f"Topic {i} Keywords:")
        for keyword, weight in topic_keywords:
            print(f" - {keyword} (Weight: {weight})")