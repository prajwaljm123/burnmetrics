from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to call the external API
def call_external_api(activity):
    api_key = 'AIzaSyBe_uKiZ9KIcUmqvvk0CaJ-261_nL2lLGU'  # Replace with your actual API key
    url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'

    headers = {
        'Content-Type': 'application/json',
    }

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

    response = requests.post(url, headers=headers, json=data, params={'key': api_key})
    
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to call external API"}

def calculate_calories(activity, duration, intensity, weight):
    met = 0  # Metabolic Equivalent of Task (MET)

    # Assign MET values based on activity and intensity
    if activity.lower() == "running":
        met = 6 if intensity == "light" else 10 if intensity == "moderate" else 12
    elif activity.lower() == "swimming":
        met = 5 if intensity == "light" else 8 if intensity == "moderate" else 10
    elif activity.lower() == "weightlifting":
        met = 3 if intensity == "light" else 6 if intensity == "moderate" else 8
    else:
        met = 4  # Default MET for other activities

    # Calories burned = MET * weight (kg) * duration (hours)
    return round(met * weight * (duration / 60), 2)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    activity = data.get('activity')
    duration = data.get('duration')
    intensity = data.get('intensity')
    weight = data.get('weight')

    calories_burned = calculate_calories(activity, duration, intensity, weight)
    external_info = call_external_api(activity)

    return jsonify({'calories': calories_burned, 'external_info': external_info})

if __name__ == '__main__':
    app.run(debug=True)
