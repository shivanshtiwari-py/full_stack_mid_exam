"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Story", href: "/story" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "glass-nav py-3.5 shadow-lg border-b border-white/10"
            : "bg-transparent py-5"
        )}
      >
        <Container size="large">
          <div className="flex items-center justify-between">
            {/* Official Brand Logo */}
            <Link
              href="/"
              className="group flex items-center gap-3 text-xl font-black tracking-wider text-white select-none z-50"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-ember-glow border border-[#F2660A]/40 transition-transform duration-300 group-hover:scale-105 bg-black flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="The Angaar Labs Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                  priority
                />
              </div>
              <span className="font-heading font-extrabold tracking-tight text-xl sm:text-2xl">
                ANGAAR<span className="text-[#F2660A]">LABS</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-[#1A1614]/80 p-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-inner">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    className={cn(
                      "relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-150 z-10 select-none",
                      isActive
                        ? "text-white bg-[#F2660A] shadow-ember-glow"
                        : "text-[#A8A29E] hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Action CTA & Mobile Toggle */}
            <div className="flex items-center gap-4 z-50">
              <Link href="/contact" className="hidden sm:block">
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowUpRightIcon className="w-4 h-4" />}
                >
                  Start a Project
                </Button>
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl bg-[#1A1614] border border-white/10 text-[#F5F5F4] hover:text-[#F2660A] hover:border-[#F2660A]/40 transition-colors focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                  <span
                    className={cn(
                      "w-5 h-0.5 bg-current rounded-full transition-all duration-300 absolute",
                      mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
                    )}
                  />
                  <span
                    className={cn(
                      "w-5 h-0.5 bg-current rounded-full transition-all duration-300 absolute",
                      mobileMenuOpen ? "opacity-0" : "opacity-100"
                    )}
                  />
                  <span
                    className={cn(
                      "w-5 h-0.5 bg-current rounded-full transition-all duration-300 absolute",
                      mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Full-Screen Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-[#0C0A09]/95 backdrop-blur-3xl flex flex-col justify-between pt-28 pb-10 px-6 sm:px-10 overflow-y-auto animate-in fade-in duration-300">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#7C2D12]/30 rounded-full blur-[100px] pointer-events-none" />

          <nav className="flex flex-col gap-3 relative z-10">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={cn(
                    "group flex items-center justify-between p-4 rounded-2xl transition-all duration-150",
                    isActive
                      ? "bg-[#1A1614] border border-[#F2660A]/40 text-white shadow-ember-glow"
                      : "text-[#A8A29E] hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
                    {item.name}
                  </span>
                  {isActive ? (
                    <div className="w-3 h-3 rounded-full bg-[#F2660A] shadow-ember-glow animate-pulse" />
                  ) : (
                    <ArrowUpRightIcon className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#F2660A]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10 relative z-10 mt-6">
            <p className="text-xs uppercase tracking-widest text-[#A8A29E] font-semibold mb-3">
              Ready to transform your studio vision?
            </p>
            <Link href="/contact" className="w-full">
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center text-lg py-4 shadow-ember-lg"
                rightIcon={<ArrowUpRightIcon className="w-5 h-5" />}
              >
                Start a Project
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
