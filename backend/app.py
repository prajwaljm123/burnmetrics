from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to call the external API for activity details
def call_external_api(activity):
    api_key = 'YOUR_API_KEY'  # Replace with your actual API key
    url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={api_key}'

    headers = {'Content-Type': 'application/json'}
    data = {
        "contents": [
            {
                "parts": [
                    {
                        "text": f"Provide detailed information about {activity}."
                    }
                ]
            }
        ]
    }

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to call external API"}

# Function to calculate calories burned
def calculate_calories(activity, duration, intensity, weight):
    try:
        duration = float(duration)
        weight = float(weight)
    except ValueError:
        return "Invalid input. Duration and weight should be numbers."

    met = 0  # Metabolic Equivalent of Task (MET)
    if activity.lower() == "running":
        met = 6 if intensity == "light" else 10 if intensity == "moderate" else 12
    elif activity.lower() == "swimming":
        met = 5 if intensity == "light" else 8 if intensity == "moderate" else 10
    elif activity.lower() == "weightlifting":
        met = 3 if intensity == "light" else 6 if intensity == "moderate" else 8
    else:
        met = 4  # Default MET for other activities

    # Calculate calories burned
    return round(met * weight * (duration / 60), 2)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    
    # Extract fields from the request
    activity = data.get('activity')
    duration = data.get('duration')
    intensity = data.get('intensity')
    weight = data.get('weight')

    # Check for missing fields
    if not all([activity, duration, intensity, weight]):
        return jsonify({'error': 'Missing required fields'}), 400

    # Validate the input data types
    try:
        duration = float(duration)
        weight = float(weight)
    except ValueError:
        return jsonify({'error': 'Duration and weight should be numbers'}), 400

    # Calculate calories burned based on user input
    calories_burned = calculate_calories(activity, duration, intensity, weight)

    # Get detailed information from the external API
    external_info = call_external_api(activity)

    # Format the response in a clear and structured manner
    response = {
        'calories_burned': calories_burned,
        'activity': activity,
        'duration': duration,
        'intensity': intensity,
        'weight': weight,
        'message': f"Based on your input, you burned {calories_burned} calories.",
        'external_info': external_info
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
