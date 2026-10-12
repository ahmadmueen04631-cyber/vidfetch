"use client";

// ============================================================
// ClipDown — Header / Navigation
// High-contrast, mobile-optimized header bar
// ============================================================

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const NAV_LINKS = [
  {
    label: "Tools",
    href: "/video-downloader",
    dropdown: [
      { label: "All Tools", href: "/video-downloader" },
      { label: "Instagram Downloader", href: "/instagram-video-downloader" },
      { label: "Reels Downloader", href: "/instagram-reels-downloader" },
      { label: "TikTok Downloader", href: "/tiktok-video-downloader" },
      { label: "YouTube Downloader", href: "/youtube-video-downloader" },
      { label: "YouTube Shorts", href: "/youtube-shorts-downloader" },
      { label: "Twitter / X Downloader", href: "/twitter-video-downloader" },
      { label: "Facebook Downloader", href: "/facebook-video-downloader" },
      { label: "Pinterest Downloader", href: "/pinterest-video-downloader" },
      { label: "Reddit Downloader", href: "/reddit-video-downloader" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track scroll with requestAnimationFrame throttling
  useEffect(() => {
    let ticking = false;
    let prevScrolled = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 10;
          if (isScrolled !== prevScrolled) {
            prevScrolled = isScrolled;
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile & dropdown on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setActiveDropdown(null);
  }

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "bg-[var(--bg-page)]/90 backdrop-blur-md",
          "border-b border-[var(--border-subtle)]",
          "transition-shadow duration-150",
          scrolled ? "shadow-[var(--shadow-sm)]" : ""
        )}
      >
        <div className="container-page">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => {
                setMobileOpen(false);
                setActiveDropdown(null);
              }}
              className="flex items-center gap-2.5 group cursor-pointer relative z-10 select-none"
              aria-label="VidFetch – Return to homepage"
            >
              <LogoMark />
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[var(--text-primary)]">
                Vid<span className="gradient-text">Fetch</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav
              ref={navRef}
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
                  onMouseLeave={() => link.dropdown && handleMouseLeave()}
                >
                  {link.dropdown ? (
                    <button
                      type="button"
                      className={cn(
                        "flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-xl cursor-pointer select-none",
                        "transition-all duration-150",
                        activeDropdown === link.label
                          ? "text-[var(--text-primary)] bg-[var(--bg-surface)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                      )}
                      onClick={() =>
                        setActiveDropdown((prev) =>
                          prev === link.label ? null : link.label
                        )
                      }
                      aria-expanded={activeDropdown === link.label}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <svg
                        className={cn(
                          "w-4 h-4 transition-transform duration-200 text-[var(--text-muted)]",
                          activeDropdown === link.label && "rotate-180 text-[var(--text-primary)]"
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "px-3.5 py-2 text-sm font-medium rounded-xl",
                        "transition-all duration-150",
                        pathname === link.href
                          ? "text-[var(--text-primary)] bg-[var(--bg-surface)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {link.dropdown && activeDropdown === link.label && (
                    <div
                      className={cn(
                        "absolute top-full left-0 mt-1.5 w-60",
                        "bg-[var(--bg-elevated)] border border-[var(--border-subtle)]",
                        "rounded-2xl shadow-[var(--shadow-xl)]",
                        "py-2 px-1.5",
                        "animate-slide-down z-50"
                      )}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className={cn(
                            "flex items-center px-3 py-2 text-sm rounded-xl font-medium",
                            "transition-colors duration-150",
                            pathname === item.href
                              ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-semibold"
                              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2.5">
              <ThemeToggle />

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                className={cn(
                  "md:hidden w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer select-none",
                  "text-[var(--text-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)]",
                  "border border-[var(--border-subtle)] hover:border-[var(--border-default)]",
                  "transition-all duration-150 shadow-xs"
                )}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <span className="relative w-5 h-5 flex flex-col justify-center gap-1.5 pointer-events-none">
                  <span
                    className={cn(
                      "block w-5 h-0.5 bg-[var(--text-primary)] rounded-full",
                      "transition-all duration-250 origin-center",
                      mobileOpen && "rotate-45 translate-y-2"
                    )}
                  />
                  <span
                    className={cn(
                      "block w-5 h-0.5 bg-[var(--text-primary)] rounded-full",
                      "transition-all duration-250",
                      mobileOpen && "opacity-0 scale-x-0"
                    )}
                  />
                  <span
                    className={cn(
                      "block w-5 h-0.5 bg-[var(--text-primary)] rounded-full",
                      "transition-all duration-250 origin-center",
                      mobileOpen && "-rotate-45 -translate-y-2"
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />
          <div
            className={cn(
              "absolute top-16 left-0 right-0 max-h-[85vh] overflow-y-auto",
              "bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)]",
              "shadow-[var(--shadow-xl)]",
              "animate-slide-down"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="container-page py-4" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  {link.dropdown ? (
                    <>
                      <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        {link.label}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "flex items-center px-3 py-2.5 text-sm rounded-xl font-medium",
                              "transition-colors duration-150",
                              pathname === item.href
                                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60"
                                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                            )}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div className="h-px bg-[var(--border-subtle)] my-2" />
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center px-3 py-3 text-sm rounded-xl font-medium",
                        "transition-colors duration-150",
                        pathname === link.href
                          ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

// ── Logo Mark ──────────────────────────────────────────────
function LogoMark() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200 group-hover:scale-105"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="vidfetch-hdr-grad"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* Transparent background, rounded gradient frame */}
      <rect
        x="2.5"
        y="2.5"
        width="27"
        height="27"
        rx="8.5"
        fill="none"
        stroke="url(#vidfetch-hdr-grad)"
        strokeWidth="2.2"
      />

      {/* Theme adaptive download arrow (changes with light/dark theme) */}
      <path
        d="M16 8v10M11.5 13.5L16 18l4.5-4.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[var(--text-primary)] transition-colors duration-150"
      />

      {/* Base tray bar */}
      <path
        d="M10 22h12"
        stroke="url(#vidfetch-hdr-grad)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
