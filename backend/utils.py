from tensorflow.keras.models import load_model
import os


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

# load the model
cnn_model = load_model(os.path.join('models', 'skin_disease_cnn.h5'))

# the disease classes list
class_names = ['acne', 'acrochordon', 'actinic keratosis', 'benign tumors', 'bullous', 'candidiasis', 'drug eruption', 'eczema', 'erythma nodesum', 'ichthyosis vulgaris', 'infestations bites', 'keloid', 'lichen', 'lupus', 'measles', 'melanoma', 'melasma', 'moles', 'pseudofolliculitis barbae', 'psoriasis', 'rosacea', 'seborrh keratoses', 'seborrheic dermatitis', 'skin cancer', 'sunlight damage', 'tinea', 'unknown or normal', 'vascular tumors', 'vasculitis', 'vitiligo', 'warts']