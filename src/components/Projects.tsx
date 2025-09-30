import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import content from "@/data/content.json";

export default function Projects() {
  const projects = content.projects.items;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const projectVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
      y: 50,
      rotateY: index % 2 === 0 ? -15 : 15,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen py-12 xs:py-16 sm:py-20 lg:py-24"
    >
      <div className="container px-4 mx-auto xs:px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 text-center xs:mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, x: -100, rotateX: -45 }}
            whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="mb-3 text-2xl font-bold text-white xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl xs:mb-4 sm:mb-6 lg:mb-6"
          >
            {content.projects.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 100, rotateX: 45 }}
            whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="max-w-4xl px-2 mx-auto text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-slate-300 xs:px-4"
          >
            {content.projects.description}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xs:gap-6 sm:gap-8 lg:gap-10 xl:gap-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              custom={index}
              variants={projectVariants}
              whileHover={{
                scale: 1.02,
                x: index % 2 === 0 ? 10 : -10,
                rotateY: index % 2 === 0 ? 5 : -5,
                boxShadow: "0 25px 50px -12px rgba(100, 255, 218, 0.25)",
                transition: { duration: 0.3 },
              }}
              className="overflow-hidden transition-all duration-300 border rounded-lg shadow-lg bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-cyan-400 group hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  initial={{ scale: 1.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  className="object-cover w-full h-32 transition-transform duration-300 xs:h-40 sm:h-48 md:h-44 lg:h-52 xl:h-60 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>

              <div className="p-3 xs:p-4 sm:p-5 lg:p-6 xl:p-6">
                <motion.h3
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                  className="mb-2 text-lg font-bold text-white xs:text-xl sm:text-xl lg:text-2xl xl:text-2xl xs:mb-3 lg:mb-3"
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                  className="mb-3 text-xs text-slate-300 xs:mb-3 lg:mb-4 xs:text-sm sm:text-sm lg:text-base xl:text-base"
                >
                  {project.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1 + 0.6,
                    duration: 0.5,
                    type: "spring",
                  }}
                  className="flex flex-wrap gap-1.5 xs:gap-2 mb-3 xs:mb-4 lg:mb-5"
                >
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.1 + 0.7 + techIndex * 0.05,
                        duration: 0.4,
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-2 xs:px-3 py-0.5 xs:py-1 text-xs xs:text-xs sm:text-xs lg:text-sm bg-cyan-400/20 text-cyan-400 rounded-full cursor-pointer"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.8, duration: 0.6 }}
                  className="flex flex-col gap-2 xs:flex-row xs:gap-3 sm:gap-4 lg:gap-5"
                >
                  <motion.a
                    href={project.github}
                    whileHover={{ x: 5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center xs:justify-start space-x-1.5 xs:space-x-2 text-slate-300 hover:text-white transition-colors py-1.5 xs:py-2 sm:py-0 text-sm xs:text-base"
                  >
                    <Github className="w-4 h-4 xs:w-4 sm:w-5 lg:w-5 xs:h-4 sm:h-5 lg:h-5" />
                    <span className="text-xs xs:text-sm sm:text-sm lg:text-base">
                      {content.common.actions.viewCode}
                    </span>
                  </motion.a>
                  <motion.a
                    href={project.live}
                    whileHover={{ x: 5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center xs:justify-start space-x-1.5 xs:space-x-2 text-slate-300 hover:text-cyan-400 transition-colors py-1.5 xs:py-2 sm:py-0 text-sm xs:text-base"
                  >
                    <ExternalLink className="w-4 h-4 xs:w-4 sm:w-5 lg:w-5 xs:h-4 sm:h-5 lg:h-5" />
                    <span className="text-xs xs:text-sm sm:text-sm lg:text-base">
                      {content.common.actions.viewLive}
                    </span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
