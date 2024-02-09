import json
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/compute', methods=['POST'])
def compute_astrology_chart():
    data = request.get_json()
    result = {'data': data}  # Replace with actual computation logic
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5001)
