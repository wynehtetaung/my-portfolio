import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { ANIMATION_DELAYS, Z_INDEX } from "../constants";

export default function Header() {
  const { t } = useTranslation();
  const navItems = ["home", "about", "skills", "projects", "contact"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    console.log("Scrolling to section:", sectionId);

    // Close menu first
    setIsMenuOpen(false);

    // Wait for menu to close, then scroll
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      // console.log("Found element:", element);

      if (element) {
        const headerHeight = 100; // Fixed header height when menu is closed
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight;

        // console.log("Element position:", elementPosition);
        // console.log("Offset position:", offsetPosition);

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 350); // Wait for menu close animation
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800"
      style={{ zIndex: Z_INDEX.HEADER }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <nav className="flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl sm:text-2xl font-bold text-cyan-400"
          >
            {t("common.portfolio")}
          </motion.h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * ANIMATION_DELAYS.SHORT }}
                >
                  <button
                    onClick={() => scrollToSection(item)}
                    className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 capitalize"
                  >
                    {t(`navigation.${item}`, item)}
                  </button>
                </motion.li>
              ))}
            </ul>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageSwitcher />
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: ANIMATION_DELAYS.LONG }}
              onClick={toggleMenu}
              className="p-2 text-slate-300 hover:text-cyan-400 transition-colors relative z-10"
              aria-label={
                isMenuOpen
                  ? t("accessibility.closeMenu", "Close menu")
                  : t("accessibility.openMenu", "Open menu")
              }
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4 border-t border-slate-700 relative"
              style={{ zIndex: Z_INDEX.ELEVATED }}
            >
              <ul className="flex flex-col space-y-4 pt-4">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * ANIMATION_DELAYS.SHORT }}
                  >
                    <button
                      onClick={() => scrollToSection(item)}
                      className="block text-slate-300 hover:text-cyan-400 transition-colors duration-300 py-2 capitalize w-full text-left"
                    >
                      {t(`navigation.${item}`, item)}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
