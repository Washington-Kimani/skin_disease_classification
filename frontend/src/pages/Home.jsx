import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io5";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Skin Disease Classification Made Simple
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get instant analysis of skin conditions using our Deep Learning
            classification model. Upload an image and receive immediate
            insights.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link
              to="/predict"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid gap-8 md:grid-cols-3 md:mt-24">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
              <IoIcons.IoFlashOutline className="text-2xl"/>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              Fast Analysis
            </h3>
            <p className="mt-2 text-gray-500">
              Get results in seconds with our optimized machine learning models.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
              <IoIcons.IoCheckmarkCircleOutline className="text-2xl" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              Accurate Results
            </h3>
            <p className="mt-2 text-gray-500">
              Powered by state-of-the-art deep learning algorithms trained on
              medical data.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
              <IoIcons.IoLockClosed className="text-2xl" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              Secure & Private
            </h3>
            <p className="mt-2 text-gray-500">
              Your data is encrypted and never stored on our servers.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to Check Your Skin?
            </h2>
            <p className="mt-4 text-blue-100">
              Upload an image now and get instant analysis from our AI system.
            </p>
            <div className="mt-8">
              <Link
                to="/predict"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
              >
                Analyze Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}