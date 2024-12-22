import { FaHome } from "react-icons/fa";
import { IoTerminal } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaMedium } from "react-icons/fa";

export const items = [
  {
    title: "Home",
    href: "/",
    icon: <FaHome />,
  },
  {
    title: "Portfolio",
    href: "https://tanya-mushonga.vercel.app/",
    icon: <IoTerminal />,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/tanyaradzwa-t-mushonga-b23745209/",
    icon: <IoLogoLinkedin />,
  },
  {
    title: "GitHub",
    href: "https://github.com/TanyaMushonga",
    icon: <FaGithub />,
  },
  {
    title: "Medium",
    href: "https://medium.com/@tanyaradzwatmushonga",
    icon: <FaMedium />,
  },
];

export const dummyContent = [
  {
    title: "How whatsapp was able to scale to 50 bilion messages a day",
    author: "Tanya Mushonga",
    subtitle: "#1: learn more - whatsapp engineering concepts",
    date: "2024-12-08",
    description: (
      <>
        <p>
          Sit duis est minim proident non nisi velit non consectetur. Esse
          adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
          Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat incididunt
          incididunt enim magna id est qui sunt fugiat. Laboris do duis pariatur
          fugiat Lorem aute sit ullamco. Qui deserunt non reprehenderit dolore
          nisi velit exercitation Lorem qui do enim culpa. Aliqua eiusmod in
          occaecat reprehenderit laborum nostrud fugiat voluptate do Lorem culpa
          officia sint labore. Tempor consectetur excepteur ut fugiat veniam
          commodo et labore dolore commodo pariatur.
        </p>
        <p>
          Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad
          veniam in commodo id reprehenderit adipisicing. Proident duis
          exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
        </p>
        <p>
          Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod
          reprehenderit deserunt amet laborum consequat adipisicing officia qui
          irure id sint adipisicing. Adipisicing fugiat aliqua nulla nostrud.
          Amet culpa officia aliquip deserunt veniam deserunt officia
          adipisicing aliquip proident officia sunt.
        </p>
      </>
    ),
    introduction: <h1 className="text-xl font-bold mb-5">Introduction</h1>,
    badge: "React",
    image: "/blog_covers/devops.webp",
  },
];
