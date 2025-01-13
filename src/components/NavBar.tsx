"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-secondary backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link className="text-white" href="/">
            The Dev Cycle
          </Link>
        </div>

        {/* Search Field */}
        <div className="hidden md:flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-md px-4 py-2 text-gray-800 focus:outline-none"
          />
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <FaTimes className="text-white" />
          ) : (
            <FaBars className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex pb-4 px-5">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-l-md px-4 py-2 text-gray-800 flex-grow focus:outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-r-md">
            <FaSearch />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
