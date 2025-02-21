import cv2
import numpy as np
import base64
import sys
import json
from tensorflow.keras.models import load_model

# Load the pre-trained model
new_model = load_model("D:\Projects\Freelancing\Influence-of-Bedtime-Mobile-App-Backend\MLModels\emotionDetector\model_epoch20_Final.h5")

# Load face detection model
faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default')

# Emotion mapping
emotion_dict = {0: "Stress", 1: "Angry", 2: "Happy", 3: "Neutral", 4: "Sad", 5: "Surprise"}

def detect_emotion(image_base64):
    try:
        # Decode base64 image
        image_data = base64.b64decode(image_base64)
        nparr = np.frombuffer(image_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Convert to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = faceCascade.detectMultiScale(gray, 1.1, 4)

        emotion = "Unknown"
        for (x, y, w, h) in faces:
            face_roi = frame[y:y + h, x:x + w]
            face_roi = cv2.resize(face_roi, (224, 224))
            face_roi = np.expand_dims(face_roi, axis=0)
            face_roi = face_roi / 255.0

            predictions = new_model.predict(face_roi)
            emotion_index = np.argmax(predictions)
            emotion = emotion_dict.get(emotion_index, "Neutral")
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
            cv2.putText(frame, emotion, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

        return json.dumps({"emotion": emotion, "message": "Emotion detected."})

    except Exception as e:
        return json.dumps({"error": str(e)})

if __name__ == "__main__":
    try:
        # Read JSON input from Node.js child process
        input_data = sys.stdin.read()
        if input_data:
            data = json.loads(input_data)
            result = detect_emotion(data.get("image", ""))
            sys.stdout.write(result)
            sys.stdout.flush()
    except Exception as e:
        sys.stdout.write(json.dumps({"error": str(e)}))
        sys.stdout.flush()
