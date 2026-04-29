"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

type Props = {
  logo: { main: string; accent: string; suffix: string };
  ctaLabel: string;
};

const LINKS: [string, string][] = [
  ["Travaux", "#work"],
  ["Services", "#services"],
  ["Process", "#process"],
  ["Avis", "#avis"],
  ["À propos", "#about"],
  ["Contact", "#contact"],
];

export function Nav({ logo, ctaLabel }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? "14px 0" : "22px 0",
        background: scrolled ? "rgba(10,9,8,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--line)"
          : "1px solid transparent",
        transition: "all 0.35s ease",
      }}
    >
      <div
        className="container-page"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo size={22} {...logo} />
        <div
          className="nav-links"
          style={{ display: "flex", gap: 8, alignItems: "center" }}
        >
          {LINKS.map(([l, h]) => (
            <a
              key={h}
              href={h}
              style={{
                fontSize: 13,
                padding: "8px 14px",
                color: "var(--ink-dim)",
                borderRadius: 999,
                transition: "color 0.2s",
              }}
            >
              {l}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="btn btn-primary"
          style={{ padding: "10px 18px", fontSize: 13 }}
        >
          {ctaLabel}
          <svg
            className="btn-arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M5 12h14M13 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
