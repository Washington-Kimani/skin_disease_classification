import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import { LuStethoscope } from "react-icons/lu";
import { IoHome } from 'react-icons/io5';
import { BiAnalyse } from "react-icons/bi";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <LuStethoscope className="text-2xl text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                SkinCheck
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center justify-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-blue-600"
                }`
              }
            >
              <IoHome />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/predict"
              className={({ isActive }) =>
                `flex items-center justify-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-blue-600"
                }`
              }
            >
              <BiAnalyse />
              <span>Predict</span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <IoHome />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/predict"
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <BiAnalyse />
              <span>Predict</span>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}