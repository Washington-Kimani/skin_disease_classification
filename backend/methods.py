import tensorflow as tf
import numpy as np
from google import genai
from google.genai import types
import cv2
import tensorflow as tf
import os
import re
import json


# Import utils
from utils import cnn_model, class_names, ALLOWED_EXTENSIONS



# FUNCTION TO CHECK IF IMAGE FORMAT IS ALLOWED
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# FUNCTION TO MAKE THE PREDICTION OF THE IMAGE
def predict_skin_disease(image_path):
    """
    Args:
        image_path: Path to the uploaded image file.
    Returns:
        dict: Contains 'class_label' and 'confidence' or None if error
    """
    img_size = (224, 224, 3)

    # Read the image from the file path
    image = cv2.imread(image_path, cv2.IMREAD_COLOR)

    if image is None:
        print("Failed to load image.")
        return None

    try:
        # Resize image to the desired size
        image = cv2.resize(image, img_size[0:2])
        image = image[:, :, ::-1]  # Convert BGR to RGB

        # Preprocess image for prediction
        image = image / 255.0
        image = np.expand_dims(image, axis=0) 

        # Predict the class probabilities
        prediction = cnn_model.predict(image, verbose=0)[0]
        
        # Get predicted class and confidence
        predicted_class_index = np.argmax(prediction)
        confidence = np.max(prediction) 

        # Validate class index
        if predicted_class_index >= len(class_names):
            print(f"Prediction index out of range: {predicted_class_index}")
            return None

        return {
            'class_label': class_names[predicted_class_index],
            'confidence': float(confidence), 
            # 'all_probabilities': prediction.tolist()  #in case we need to tell other possible diseases
        }

    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return None


# get GEMINI_API_KEY from environment variables
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

def clean_json(markdown_json):
    """Extracts valid JSON from Markdown-wrapped content"""
    # Remove the first and last lines if they contain triple backticks
    cleaned = re.sub(r"```json|```", "", markdown_json).strip()
    return json.loads(cleaned) 

#FUNCTION TO GET THE GEMINI RESPONSE
def get_gemini_response(content):
    if content == 'unknown or normal':
        return 'This is a normal picture or a picture of an object not related to dermatology or skin diseases whatsoever. Thank you.'
    if content:
        client = genai.Client(api_key=GEMINI_API_KEY)

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            config=types.GenerateContentConfig(
                system_instruction='You are dermatologist and expert on skin diseases, a patient sends you a disease name. You will  provide a result in this JSON format {"description": "", "signs":[], "causes":[],"treatments":[]}, WITHOUT ANY OTHER THING. Thank you.'),
            contents=content
        )

        response = clean_json(response.text)

        return response
    else:
        return "Please provide a disease name"