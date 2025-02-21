import sys
import json
import os
import numpy as np
import tensorflow as tf
tf.get_logger().setLevel('ERROR') 
import joblib  # To load preprocessing models

absolute_path = "D:\Projects\Freelancing\Influence-of-Bedtime-Mobile-App-Backend\MLModels\sleepPredictor\sleep_model.h5"

model = tf.keras.models.load_model(absolute_path, custom_objects={"mse": tf.keras.losses.MeanSquaredError()})

# Load preprocessing models
scaler = joblib.load("D:\Projects\Freelancing\Influence-of-Bedtime-Mobile-App-Backend\MLModels\sleepPredictor\scaler.pkl")
encoder = joblib.load("D:\Projects\Freelancing\Influence-of-Bedtime-Mobile-App-Backend\MLModels\sleepPredictor\encoder.pkl")

# Define categorical column order (Must match training)
categorical_columns = ["Gender", "BMI Category", "Sleep Disorder"]

def preprocess_input(data):
    try:
        # Extract numerical features
        num_features = np.array([[data["Age"], data["PhysicalActivity"], data["Stress"], data["Steps"]]])
        
        # One-hot encode categorical features
        cat_features = np.array([[data["Gender"], data["BMI"], data["Disorder"]]])
        cat_features_encoded = encoder.transform(cat_features)

        # Combine numerical and categorical features
        combined_features = np.hstack([num_features, cat_features_encoded])

        # Standardize the combined features
        combined_features = scaler.transform(combined_features)

        return combined_features
    except Exception as e:
        return str(e)

def predict(data):
    input_data = preprocess_input(data)
    
    if isinstance(input_data, str):  # If error in preprocessing
        return {"error": input_data}

    # Run model prediction
    predictions = model.predict(input_data)
    sleep_duration = float(predictions[0][0])
    quality_of_sleep = float(predictions[1][0])

    return {"sleep_duration": sleep_duration, "quality_of_sleep": quality_of_sleep}

if __name__ == "__main__":
    # Read input JSON from Node.js
    input_json = sys.stdin.read()
    user_data = json.loads(input_json)

    # Make prediction
    result = predict(user_data)

    # Print JSON output
    print(json.dumps(result))
