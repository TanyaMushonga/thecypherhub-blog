import { FaHome } from "react-icons/fa";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType;
}

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: FaHome,
  },
];
