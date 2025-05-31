"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Menu,
  ChevronDown,
  Home,
  User,
  Briefcase,
  Package,
  Users,
  MessageSquare,
  HelpCircle,
  Mail,
} from "lucide-react"
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode
  children?: Array<{
    label: string;
    href: string;
  }>;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeSection: string;
}

const MobileSubmenuItem: React.FC<{
  item: NavItem;
  onClose: () => void;
}> = ({ item, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-gray-200 hover:text-white hover:bg-white/10 py-3 px-4 rounded-xl transition-all text-lg font-medium border border-transparent hover:border-white/10"
      >
        <span>{item.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1 mt-1"
          >
            {item.children &&
              item.children.map((child, index) => (
                <a
                  key={index}
                  href={child.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = child.href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                      const yOffset = -80;
                      const y =
                        targetElement.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;
                      window.scrollTo({ top: y, behavior: "auto" });
                    }
                    onClose();
                  }}
                  className="flex items-center text-gray-300 hover:text-white hover:bg-white/10 py-2 px-6 rounded-xl transition-all text-base w-full border border-transparent hover:border-white/5"
                >
                  {child.label}
                </a>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Menu Component
const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  activeSection,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[99999] flex items-center justify-center overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative w-[95%] max-w-lg bg-gray-900/80 backdrop-blur-lg border border-white/10 rounded-2xl p-6 my-4 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="absolute right-4 top-4">
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-white hover:bg-white/10 rounded-full w-10 h-10 p-0 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex justify-center mb-8 mt-2">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-heading tracking-tighter">
                Test<span className="font-light">Labs</span>
              </span>
            </div>

            <nav className="space-y-3">
              {navItems.map((item, index) =>
                item.children ? (
                  <MobileSubmenuItem
                    key={index}
                    item={item}
                    onClose={onClose}
                  />
                ) : (
                  <a
                    key={index}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const targetId = item.href.substring(1);
                      const targetElement = document.getElementById(targetId);
                      if (targetElement) {
                        const yOffset = -80;
                        const y =
                          targetElement.getBoundingClientRect().top +
                          window.pageYOffset +
                          yOffset;
                        window.scrollTo({ top: y, behavior: "auto" });
                      }
                      onClose();
                    }}
                    className={cn(
                      "flex items-center w-full justify-center text-gray-200 hover:text-white hover:bg-white/10 py-4 px-4 rounded-xl transition-all text-lg font-medium border border-transparent hover:border-white/10",
                      activeSection === item.href.substring(1)
                        ? "bg-white/10 text-white border-white/20"
                        : ""
                    )}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </a>
                )
              )}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
    const [isHovered, setIsHovered] = useState(false)
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);
const [isExpanded, setIsExpanded] = useState(false)

  const navItems: NavItem[] = [
    { label: "Home", href: "#home", icon: <Home className="w-4 h-4" /> },
    { label: "About", href: "#about", icon: <User className="w-4 h-4" /> },
    { label: "Services", href: "#services", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Products", href: "#products", icon: <Package className="w-4 h-4" /> },
    { label: "Team", href: "#team", icon: <Users className="w-4 h-4" /> },
    { label: "Testimonials", href: "#testimonials", icon: <MessageSquare className="w-4 h-4" /> },
    { label: "FAQ", href: "#faq", icon: <HelpCircle className="w-4 h-4" /> },
    { label: "Contact", href: "#contact", icon: <Mail className="w-4 h-4" /> },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for navbar highlighting
      const sections = [
        "home",
        "about",
        "services",
        "products",
        "team",
        "testimonials",
        "faq",
        "contact",
      ];
      let currentSection = "home";

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            currentSection = sectionId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Use requestAnimationFrame for better scroll performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const targetId = href.substring(1); // Remove the '#'
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const yOffset = 0; // Offset for fixed header
      const y =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      // Use smooth scrolling with a polyfill for better performance
      if ("scrollBehavior" in document.documentElement.style) {
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      } else {
        // Fallback for browsers that don't support smooth scrolling
        window.scrollTo(0, y);
      }
    }

    if (isMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  // Enhance scroll behavior
  useEffect(() => {
    // Add event listeners to all anchor links - use instant scrolling
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const yOffset = -80; // Offset for fixed header
            const y =
              targetElement.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;
            window.scrollTo({ top: y, behavior: "auto" });
          }
        }
      });
    });

    // Clean up
    return () => {
      anchorLinks.forEach((anchor) => {
        anchor.removeEventListener("click", () => {});
      });
    };
  }, []);


  //  Added professional staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94], // Professional easing curve
        staggerChildren: 0.1, // Stagger effect for professional entrance
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <>
      {isMobile ? (
        // Mobile Navbar
        <motion.nav
          ref={navRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-white/5"
           style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
          }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <a
              href="#home"
              className="flex items-center nav-item"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
            >
              <div className="relative">
                
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur"></div>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-heading tracking-tight relative">
                  Test<span className="font-light">Labs</span>
                </span>
              </div>
            </a>

            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
               className="text-white hover:bg-white/10 rounded-xl w-12 h-12 p-0 flex items-center justify-center transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </motion.nav>
      ) : (
        // Desktop Navbar
         <motion.nav
          ref={navRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="fixed right-2 top-6 z-50"
          style={{
            position: "fixed",
            right: "0.5rem",
            top: "1.5rem",
            zIndex: 50,
          }}
          onMouseEnter={() => {
            setIsHovered(true)
            setIsExpanded(true)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
            setIsExpanded(false)
          }}
        >
          <div className="relative">
            {/* Ambient background glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-3xl blur-xl opacity-60" />

            {/* Logo Section */}
            <motion.div
              variants={itemVariants}
              className="relative mb-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl" />

              <div className="relative px-4 py-4">
                <a
                  href="#home"
                  className="flex items-center justify-center group"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("#home")
                  }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-xl blur-sm"
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        opacity: isHovered ? 0.8 : 0.4,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 font-heading tracking-tight relative z-10 group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                      {isExpanded ? (
                        <>
                          Test<span className="font-light">Labs</span>
                        </>
                      ) : (
                        "TL"
                      )}
                    </span>
                  </div>
                </a>
              </div>
            </motion.div>

           
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-gray-800/20 rounded-2xl" />

             
              <motion.div
                className="relative overflow-hidden"
                animate={{
                  width: isExpanded ? "170px" : "60px", 
                  height: "auto",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  overflow: "hidden",
                }}
              >
                <nav className="flex flex-col space-y-2 p-3">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.substring(1)

                    return (
                      <motion.div key={index} variants={itemVariants} className="relative">
                       
                        {!isExpanded && (
                          <div
                            className="absolute top-0 left-0 w-full h-full"
                            onMouseEnter={() => {
                             
                            }}
                          />
                        )}

                        <motion.a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection(item.href)
                          }}
                          className={cn(
                            "relative flex items-center rounded-xl transition-all duration-300 text-sm font-medium",
                            isActive
                              ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 shadow-lg"
                              : "text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20",
                           
                            !isExpanded ? "justify-center px-2 py-3" : "justify-start px-3 py-3",
                          )}
                          whileHover={{ x: isExpanded ? -4 : 0, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          style={{
                        
                            overflow: "hidden",
                          }}
                        >
                          {/* Background gradient on hover */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                          />

                          {/* Icon - Always visible and centered when collapsed */}
                          <motion.span
                            className={cn(
                              "transition-all duration-300 flex-shrink-0",
                              isActive ? "text-blue-400" : "text-gray-400 group-hover:text-white",
                            )}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.icon}
                          </motion.span>

                      
                          {isExpanded && <span className="ml-3 whitespace-nowrap">{item.label}</span>}

                          {/* Active indicator */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                layoutId="navbar-indicator"
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full shadow-lg"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{
                                  type: "spring",
                                  bounce: 0.3,
                                  duration: 0.6,
                                }}
                              />
                            )}
                          </AnimatePresence>
                        </motion.a>

                      
                        {!isExpanded && (
                          <div className="fixed left-[calc(100%+12px)] top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <motion.div
                              className="bg-gray-900/95 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg border border-white/20 opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 shadow-lg"
                              initial={{ opacity: 0, x: -10, scale: 0.9 }}
                              whileHover={{ opacity: 1, x: 0, scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.label}
                              <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900/95"></div>
                            </motion.div>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </nav>
              </motion.div>
            </motion.div>

            {/* Connecting line between logo and navigation */}
            <motion.div
              className="absolute right-6 top-[88px] w-px h-3 bg-gradient-to-b from-white/20 to-transparent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>
        </motion.nav>
      )}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
      />
    </>
  );
};

export default Navbar;
