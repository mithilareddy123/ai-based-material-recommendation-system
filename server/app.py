from flask import Flask, request, jsonify
import flask_cors
import pickle
import pandas as pd
import numpy as np
import json
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
flask_cors.CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192
}

# Initialize the generative AI model
gemini_model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
)

@app.route('/api/v1/predict', methods=['POST'])  # Fixed typo: rooute -> route
def predict():
    try:
        data = request.get_json()

        # Keep a copy of original input for Gemini
        budget = data.get("Project_Budget", "Unknown")
        environment = data["Environment"]
        required_strength = data["Required_Strength"]
        durability = data["Durability_Priority"]
        eco_friendly = data["Eco_Preference"]
        lead_time = data["Max_Lead_Time"]

        # Drop budget before sending to ML model
        model_input = data.copy()
        model_input.pop("Project_Budget", None)

        input_df = pd.DataFrame([model_input])

        # Load model and preprocessors
        model = pickle.load(open("pickle_files/model.pkl", "rb"))
        scaler = pickle.load(open("pickle_files/scaler.pkl", "rb"))
        encoder = pickle.load(open("pickle_files/encoder.pkl", "rb"))

        # Feature mappings
        environment_map = {'Coastal': 0, 'Dry': 1, 'Humid': 2}
        eco_preference_map = {'Yes': 1, 'No': 0}
        required_strength_map = {'Low': 0, 'Medium': 1, 'High': 2}

        input_df['Environment'] = input_df['Environment'].map(environment_map)
        input_df['Required_Strength'] = input_df['Required_Strength'].map(required_strength_map)
        input_df['Eco_Preference'] = input_df['Eco_Preference'].map(eco_preference_map)
        input_df['Durability_Priority'] = scaler.transform(input_df['Durability_Priority'].values.reshape(-1, 1))
        input_df['Max_Lead_Time'] = scaler.transform(input_df['Max_Lead_Time'].values.reshape(-1, 1))

        # Predict top 3 materials
        predictions = model.predict_proba(input_df)[0]
        top_3_indices = np.argsort(predictions)[::-1][:3]
        top_3_materials = encoder.inverse_transform(top_3_indices)

        # Gemini Prompt
        prompt = f"""
            You are a materials science expert helping select construction materials.

            Here are the project requirements:
            - Project Budget: ₹{budget}
            - Environment: {environment}
            - Required Strength: {required_strength}
            - Durability: {durability}/10
            - Eco-Friendly: {eco_friendly}
            - Lead Time: ≤ {lead_time} days

            The machine learning model has suggested the following top 3 materials (in order of suitability):
            1. {top_3_materials[0]}
            2. {top_3_materials[1]}
            3. {top_3_materials[2]}

            Please perform a cost-based and performance-based competitor analysis **only among these three materials**.

            Present your analysis in the following **structured JSON format**:

            {{
            "top_3_predictions": [
                "{top_3_materials[0]}",
                "{top_3_materials[1]}",
                "{top_3_materials[2]}"
            ],
            "competitor_analysis": [
                {{
                "material": "{top_3_materials[0]}",
                "strength": "StrengthLevel",
                "durability": "DurabilityLevel",
                "eco_friendly": "Yes/No",
                "cost_estimate": "CostRange",
                "suitable_for_coastal_environment": "Yes/No",
                "lead_time": "LeadTime",
                "within_budget": "Yes/No",
                "remarks": "Detailed remarks about the material."
                }},
                {{
                "material": "{top_3_materials[1]}",
                "strength": "StrengthLevel",
                "durability": "DurabilityLevel",
                "eco_friendly": "Yes/No",
                "cost_estimate": "CostRange",
                "suitable_for_coastal_environment": "Yes/No",
                "lead_time": "LeadTime",
                "within_budget": "Yes/No",
                "remarks": "Detailed remarks about the material."
                }},
                {{
                "material": "{top_3_materials[2]}",
                "strength": "StrengthLevel",
                "durability": "DurabilityLevel",
                "eco_friendly": "Yes/No",
                "cost_estimate": "CostRange",
                "suitable_for_coastal_environment": "Yes/No",
                "lead_time": "LeadTime",
                "within_budget": "Yes/No",
                "remarks": "Detailed remarks about the material."
                }}
            ]
            }}

            - Mark “Yes” or “No” under **Within Budget** based on whether the material fits within ₹{budget}.
            - The first material in the list is the model’s top recommendation. The others are close alternatives.
            - Use technical reasoning for any trade-offs or advantages in the **remarks** column.
            - The analysis should be concise and technical, focusing only on the three materials mentioned.
            - **Do not include anything else** apart from the structured JSON result above. Avoid any introduction or conclusion.

        """

        gemini_response = gemini_model.generate_content(prompt)
        # result = gemini_response.text
        # cleaned_response = result.strip("json\n").strip("")
        raw_text = gemini_response.text.strip()

        # Clean: strip code block markdown
        if raw_text.startswith("```json"):
            raw_text = raw_text.removeprefix("```json").strip()
        if raw_text.endswith("```"):
            raw_text = raw_text.removesuffix("```").strip()

        parsed_response = json.loads(raw_text)
        return jsonify(parsed_response), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)