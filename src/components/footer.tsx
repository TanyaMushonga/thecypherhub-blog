import { Navitems } from "@/constants";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-4 bg-secondary text-center">
      <div className="flex justify-center space-x-4">
        {Navitems.map((social, index) => (
          <Link
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800"
          >
            <span className="text-white">{social.name}</span>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-white">
        &copy; {new Date().getFullYear()} The dev cycle. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
