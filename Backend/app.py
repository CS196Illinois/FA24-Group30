from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/double', methods = ['GET'])
def double_input():
    user_input = request.args.get('input', type = int)
    if user_input is None:
        return jsonify({"error": "no input provided"}), 400
    result = user_input * 2
    return jsonify({"input": user_input, "doubled": result})
if __name__ == '__main__':
    app.run(debug=True)
