// src/components/ImageClassifier.jsx
import { useState, useRef } from "react";
import axios from "axios";

export default function ImageClassifier() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      const blob = await fetch(selectedImage).then((r) => r.blob());
      formData.append("file", blob, "image.jpg");

      const response = await axios.post(
        import.meta.env.VITE_API_URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPrediction(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Prediction failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl max-h-screen mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Skin Disease Classifier
        <p className="mt-6 text-sm text-gray-500 italic">
          Note: All images are deleted immediately after classification.
        </p>
      </h1>

      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg 
                   hover:border-blue-500 transition-colors bg-gray-50"
        >
          {selectedImage ? "Change Image" : "Upload Image"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {selectedImage && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Preview</h2>
            <img
              src={selectedImage}
              alt="Upload preview"
              className="rounded-lg shadow-md max-h-96 object-contain"
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-lg text-white font-medium 
                        ${
                          isLoading
                            ? "bg-blue-400"
                            : "bg-blue-600 hover:bg-blue-700"
                        } 
                        transition-colors`}
            >
              {isLoading ? "Analyzing..." : "Analyze Image"}
            </button>
          </div>
        )}

        {prediction && (
          <div className="space-y-4 h-[calc(100vh-180px)] overflow-y-auto pr-4">
            <h2 className="text-xl font-semibold text-gray-700">Results</h2>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">
                Prediction status:{" "}
                <span className="text-green-500 italic">
                  {prediction?.status}
                </span>
              </h3>
              <h3 className="text-lg font-medium mb-2">
                Prediction:{" "}
                <span className="text-blue-500">{prediction?.prediction}</span>
              </h3>
              <p className="text-black mb-4 font-medium">
                Confidence:{" "}
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    prediction?.confidence >= 80
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {(prediction?.confidence).toFixed(2)}%
                </span>
              </p>

              {prediction.confidence <= 80 ? (
                <div className="text-amber-600 text-sm mb-4">
                  Note: Confidence level is below 80%. Consider consulting a
                  medical professional.
                </div>
              ) : prediction?.llm_res ===
                "This is a normal picture or a picture of an object not related to dermatology or skin diseases whatsoever. Thank you." ? (
                <div className="mt-4 p-4 bg-teal-50 rounded-lg border border-yellow-200">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">
                    Analysis Result
                  </h3>
                  <p className="text-[#007074] ">{prediction.llm_res}</p>
                </div>
              ) : (
                <div className="mt-4  h-[600px] overflow-auto">
                  <div className="bg-white p- rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                      Medical Analysis
                    </h2>

                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {prediction?.llm_res?.description}
                      </p>
                    </div>

                    {/* Grid Layout for Causes, Signs, and Treatments */}
                    <div className="lg:w-max-[80%] w-[90%] flex flex-col gap-3">
                      {/* Causes */}
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <svg
                            className="w-5 h-5 text-amber-600 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <h3 className="font-medium text-amber-700">
                            Potential Causes
                          </h3>
                        </div>
                        <ul className="list-disc list-inside space-y-1">
                          {prediction?.llm_res?.causes.map((cause, index) => (
                            <li key={index} className="text-gray-600 text-sm">
                              {cause}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Signs & Symptoms */}
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <svg
                            className="w-5 h-5 text-blue-600 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            ></path>
                          </svg>
                          <h3 className="font-medium text-blue-700">
                            Signs & Symptoms
                          </h3>
                        </div>
                        <ul className="list-disc list-inside space-y-1">
                          {prediction?.llm_res?.signs.map((sign, index) => (
                            <li key={index} className="text-gray-600 text-sm">
                              {sign}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Treatments */}
                      <div className="bg-green-50 p-4 rounded-lg md:col-span-2">
                        <div className="flex items-center mb-2">
                          <svg
                            className="w-5 h-5 text-green-600 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <h3 className="font-medium text-green-700">
                            Recommended Treatments
                          </h3>
                        </div>
                        <ul className="list-disc list-inside space-y-1 columns-1 md:columns-2">
                          {prediction?.llm_res?.treatments.map(
                            (treatment, index) => (
                              <li
                                key={index}
                                className="text-gray-600 text-sm mb-2"
                              >
                                {treatment}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="mt-6 text-sm text-gray-500 italic">
                      Note: This analysis is AI-generated and should not replace
                      professional medical advice. Always consult a healthcare
                      provider for proper diagnosis and treatment.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
