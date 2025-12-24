import { Navitems } from "@/constants";
import Link from "next/link";
import React from "react";
import { IoTerminal } from "react-icons/io5";

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-secondary border-t border-border/50">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors border border-primary/20">
              <IoTerminal className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-mono font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              The Cypher Hub
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            Empowering developers with the latest insights in System Design,
            DevOps, and Engineering.
          </p>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-4 md:items-end">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Connect
          </h3>
          <div className="flex flex-wrap gap-4">
            {Navitems.map((social, index) => (
              <Link
                prefetch={false}
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.name}
              >
                <span className="hover:scale-110 transition-transform block">
                  {social.icon ? social.icon : social.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} The Cypher Hub. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Built with ❤️ by{" "}
          <Link
            href="https://tanyaradzwatmushonga.me"
            className="hover:text-primary underline decoration-dotted"
          >
            Tanya
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
