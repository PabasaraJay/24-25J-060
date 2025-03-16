
import sys
import os
import pandas as pd
import joblib

# Load the trained model
def load_model(model_path):
    return joblib.load(model_path)


def preprocess_input_data(model,user_input):
    # Convert user input to DataFrame
    user_input_df = pd.DataFrame([user_input])

    # Ensure all required columns are present
    missing_columns = [col for col in model.feature_names_in_ if col not in user_input_df.columns]
    if missing_columns:
        missing_df = pd.DataFrame(0, index=user_input_df.index, columns=missing_columns)
        user_input_df = pd.concat([user_input_df, missing_df], axis=1)

    # Reorder columns to match training data
    user_input_df = user_input_df[model.feature_names_in_]

    return user_input_df

def main():

    # Load the saved model
    script_dir = os.path.dirname(os.path.abspath(__file__))  # Directory of the Python script
    model_path = os.path.join(script_dir, "predict_bedtime_xgboost_model.pkl") 

    model = load_model(model_path)

    # Parse command-line arguments
    user_input = {
        'Age': int(sys.argv[1]),
        'Gender_Male': int(sys.argv[2]),
        'Gender_Female': int(sys.argv[3]),
        'Work_Environment_Impact_Neutral': int(sys.argv[4]),
        'Work_Environment_Impact_Positive': int(sys.argv[5]),
        'Physical_Activity_Hours': float(sys.argv[6]),
        'Stress_Level': int(sys.argv[7]),
        'BMI_Category_Overweight': int(sys.argv[8]),
        'BMI_Category_Underweight': int(sys.argv[9]),
        'Technology_Usage_Hours': int(sys.argv[10]),
        'Social_Media_Usage_Hours': float(sys.argv[11]),
        'Gaming_Hours': int(sys.argv[12]),
        'Screen_Time_Hours': int(sys.argv[13]),
        'Sleep_Hours': int(sys.argv[14])
    }

    # user_input = {
    #     'Age': 17,
    #     'Gender_Male': 1,
    #     'Gender_Female': 0, 
    #     'Work_Environment_Impact_Neutral': 1,
    #     'Work_Environment_Impact_Positive': 0,
    #     'Physical_Activity_Hours': 6.35, # need
    #     'Stress_Level': 6, 
    #     'BMI_Category_Overweight': 1, 
    #     'BMI_Category_Underweight': 0,
    #     'Technology_Usage_Hours': 2,
    #     'Social_Media_Usage_Hours': 1.5,
    #     'Gaming_Hours': 0,
    #     'Screen_Time_Hours': 0,
    #     'Sleep_Hours': 0
    # }

    user_input_df = preprocess_input_data(model,user_input)

    # Make prediction
    predicted_bedtime_duration = model.predict(user_input_df)

    print(predicted_bedtime_duration[0])

    sys.stdout.flush()

if __name__ == "__main__":
    main()