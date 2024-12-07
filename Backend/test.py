from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from sentence_transformers import SentenceTransformer, util
import json

app = Flask(__name__)
CORS(app)

model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

def load_json(filename):
    with open(filename, 'r') as file:
        return json.load(file)

professors_data = load_json('formatted_professors_bart.json')
professor_embeddings = model.encode(
    [prof["Research Areas"] for prof in professors_data], 
    convert_to_tensor=True
)

def find_most_similar_professor(student_research_interests):
    
    global professor_embeddings  
    
    student_embeddings = model.encode(student_research_interests, convert_to_tensor=True)
    
    average_student_embedding = torch.mean(student_embeddings, dim=0, keepdim=True)
    
    similarities = util.pytorch_cos_sim(average_student_embedding, professor_embeddings)[0]
  
    most_similar_professor_index = torch.argmax(similarities).item()
    most_similar_professor = professors_data[most_similar_professor_index]
    
    return most_similar_professor["Name"], similarities[most_similar_professor_index].item()

@app.route('/double', methods=['GET'])
def double_input():
    user_input = request.args.get('input', type=int)
    if user_input is None:
        return jsonify({"error": "no input provided"}), 400
    result = user_input * 2
    return jsonify({"input": user_input, "doubled": result})

@app.route('/match', methods=['GET'])
def match_professor():
    user_input = request.args.getlist('input') 
    if not user_input:
        return jsonify({"error": "no input provided"}), 400
    
    professor_name, similarity_score = find_most_similar_professor(user_input)
    
    return jsonify({
        "professor": professor_name,
        "similarity_score": round(similarity_score * 100, 2) 
    })

if __name__ == '__main__':
    app.run(debug=True)