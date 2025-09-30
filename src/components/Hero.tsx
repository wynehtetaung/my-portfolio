import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import content from "@/data/content.json";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv-resume.pdf";
    link.download = content.personal.cvFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden sm:px-6 lg:px-8"
    >
      <div className="z-10 w-full px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 100, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            className="mb-4 text-3xl font-bold text-white xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl sm:mb-6 lg:mb-8"
          >
            <motion.span
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
            >
              {content.hero.greeting}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 100, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                delay: 1.2,
                duration: 0.8,
                type: "spring",
                stiffness: 150,
              }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
            >
              {content.hero.name}
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 50, rotateY: -15 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.6,
            type: "spring",
            stiffness: 100,
          }}
          className="max-w-4xl px-4 mx-auto mb-8 text-base xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl text-slate-300 sm:mb-10 lg:mb-12"
        >
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            {content.hero.description.part1}
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            {content.hero.description.part2}
          </motion.span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 2.2,
            type: "spring",
            stiffness: 120,
          }}
          className="flex flex-col items-center justify-center gap-4 px-4 xs:gap-4 sm:flex-row sm:gap-6 lg:gap-8 xl:gap-10"
        >
          <motion.button
            initial={{ opacity: 0, x: -100, rotateZ: -10 }}
            animate={{ opacity: 1, x: 0, rotateZ: 0 }}
            transition={{ delay: 2.4, duration: 0.6, type: "spring" }}
            whileHover={{
              scale: 1.05,
              y: -5,
              rotateZ: 1,
              boxShadow: "0 20px 40px -10px rgba(100, 255, 218, 0.4)",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(content.navigation.scrollToSections.projects)}
            className="w-full px-6 py-3 text-sm font-semibold text-center text-white transition-all duration-300 rounded-lg cursor-pointer xs:px-7 xs:py-3.5 xs:text-base sm:w-auto sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 lg:text-lg xl:px-12 xl:py-4.5 xl:text-lg bg-gradient-to-r from-cyan-500 to-purple-500"
          >
            {content.hero.buttons.viewProjects}
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 100, rotateZ: 10 }}
            animate={{ opacity: 1, x: 0, rotateZ: 0 }}
            transition={{ delay: 2.6, duration: 0.6, type: "spring" }}
            whileHover={{
              scale: 1.05,
              y: -5,
              rotateZ: -1,
              backgroundColor: "rgba(100, 255, 218, 1)",
              color: "rgba(15, 23, 42, 1)",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadCV}
            className="w-full px-6 py-3 text-sm font-semibold text-center transition-all duration-300 border rounded-lg cursor-pointer xs:px-7 xs:py-3.5 xs:text-base sm:w-auto sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 lg:text-lg xl:px-12 xl:py-4.5 xl:text-lg border-cyan-400 text-cyan-400"
          >
            {content.hero.buttons.downloadCV}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 0.8, type: "spring" }}
          className="flex flex-wrap justify-center gap-2 px-4 mt-8 xs:gap-2.5 sm:mt-10 sm:gap-3 lg:mt-12 lg:gap-4 xl:gap-5"
        >
          {content.hero.technologies.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 30, rotateY: -45 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{
                delay: 3.2 + index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 120,
              }}
              whileHover={{
                scale: 1.2,
                y: -5,
                rotateZ: Math.random() * 10 - 5,
                transition: { duration: 0.3 },
              }}
              className="px-3 py-1 text-xs rounded-full xs:px-3.5 xs:py-1 xs:text-sm sm:px-4 sm:py-1.5 sm:text-sm md:px-4 md:py-1.5 md:text-sm lg:px-5 lg:py-2 lg:text-base xl:px-5 xl:py-2 xl:text-base bg-cyan-400/20 text-cyan-400"
            >
              {tech}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0 }}
        animate={{
          opacity: [0, 1, 1, 0.7, 1],
          y: [30, 0, 5, 0, 5],
          scale: [0, 1, 1.1, 1, 1.1],
        }}
        transition={{
          delay: 3.5,
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
        className="absolute transform -translate-x-1/2 cursor-pointer bottom-4 xs:bottom-6 sm:bottom-8 lg:bottom-10 left-1/2"
        onClick={() => scrollToSection(content.navigation.scrollToSections.about)}
      >
        <motion.div
          whileHover={{ scale: 1.2, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDown className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-slate-400" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              opacity: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: -100,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
            className="absolute w-1 h-1 rounded-full bg-cyan-400"
          />
        ))}
      </motion.div>
    </section>
  );
}
