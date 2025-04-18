from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PIL import Image
import uuid
import os

# import methods
from methods import allowed_file, predict_skin_disease, get_gemini_response

app = Flask(__name__)

# Configuration
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Configure CORS
cors = CORS(app, 
            resources={r"/predict": {
                "origins": [
                    "http://localhost:5173",
                    "http://127.0.0.1:5173",
                    "http://192.168.0.122:5173/"
                ],
                "methods": ["POST"],
                "allow_headers": ["Content-Type"]
            }})



# prediction route for making the prediction
@app.route('/predict', methods=['POST'])
def predict():
    # check for the fiel in request
    if 'file' not in request.files:
        return jsonify({'error': 'There was no file provided.'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Empty file name'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error':'Invalid image type'}), 400
    
    try:
        # save the original file
        filename = f'{uuid.uuid4()}.{secure_filename(file.filename).split('.')[-1]}'
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        #call the prediction method
        result = predict_skin_disease(filepath)

        # delete file after use
        os.remove(filepath)

        class_label = result['class_label']

        # call the gemini response method
        content = get_gemini_response(class_label)

        return jsonify({
            'status': 'success',
            'prediction': class_label,
            'confidence': result['confidence']*100,
            'llm_res': content

        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)