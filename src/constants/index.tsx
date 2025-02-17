import { IoTerminal } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaMedium } from "react-icons/fa";

export const Navitems = [
  {
    name: "Portfolio",
    link: "https://tanyaradzwatmushonga.me/",
    icon: <IoTerminal className="text-white w-10 h-10" />,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/tanyaradzwa-t-mushonga-b23745209/",
    icon: <IoLogoLinkedin className="text-white w-10 h-10" />,
  },
  {
    name: "GitHub",
    link: "https://github.com/TanyaMushonga",
    icon: <FaGithub className="text-white w-10 h-10" />,
  },
  {
    name: "Medium",
    link: "https://medium.com/@tanyaradzwatmushonga",
    icon: <FaMedium className="text-white w-10 h-10" />,
  },
];

