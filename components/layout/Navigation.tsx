"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { navItems } from "@/lib/constants/navigation";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Helper to check if link is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`
        sticky top-0 z-50 bg-white border-b transition-shadow duration-200
        ${scrolled ? "shadow-md border-gray-200" : "border-gray-200 shadow-sm"}
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Jakob's Law: Always top-left */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-900 hover:text-emerald-600 transition-colors z-50"
            aria-label="Vietnam Insider - Home"
          >
            <span className="text-emerald-600">Vietnam</span>
            <span>Insider</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setActiveDropdown(item.href)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`
                    text-sm font-medium transition-colors relative py-2
                    ${
                      isActive(item.href)
                        ? "text-emerald-600"
                        : "text-gray-700 hover:text-emerald-600"
                    }
                  `}
                >
                  <span className="flex items-center gap-1">
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                  </span>

                  {/* Active indicator */}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-emerald-600" />
                  )}
                </Link>

                {/* Dropdown Menu - Desktop */}
                {item.hasDropdown && activeDropdown === item.href && (
                  <div className="absolute top-full left-0 pt-2 w-64">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-medium text-gray-900 text-sm">
                            {dropdownItem.label}
                          </div>
                          {dropdownItem.description && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              {dropdownItem.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions - CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/vietnam/itineraries"
              data-cta="primary"
              className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm hover:shadow-md"
            >
              Plan Your Trip
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors z-50"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white lg:hidden shadow-2xl overflow-y-auto">
              <div className="p-6 pt-20">
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <div key={item.href}>
                      {/* Main nav item */}
                      <Link
                        href={item.href}
                        onClick={() =>
                          !item.hasDropdown && setMobileMenuOpen(false)
                        }
                        className={`
                          flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-colors
                          ${
                            isActive(item.href)
                              ? "bg-emerald-50 text-emerald-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }
                        `}
                      >
                        <span>{item.label}</span>
                        {item.hasDropdown && (
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              activeDropdown === item.href ? "rotate-180" : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveDropdown(
                                activeDropdown === item.href ? null : item.href
                              );
                            }}
                          />
                        )}
                      </Link>

                      {/* Dropdown items - Mobile */}
                      {item.hasDropdown && activeDropdown === item.href && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Mobile Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                    <Link
                      href="/vietnam/itineraries"
                      data-cta="primary"
                      className="block w-full px-4 py-3 bg-emerald-600 text-white text-center font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Plan Your Trip
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
