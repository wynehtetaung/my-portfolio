import { motion } from 'framer-motion'
import { Code, Database, Globe, Smartphone } from 'lucide-react'
import content from '@/data/content.json'

export default function About() {
  const skillIcons = [Code, Database, Globe, Smartphone];
  const skills = content.about.skills.map((skill, index) => ({
    ...skill,
    icon: skillIcons[index]
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50, y: 30 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <section id="about" className="relative min-h-screen py-12 xs:py-16 sm:py-20 lg:py-24">
      <div className="container px-4 mx-auto xs:px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 text-center xs:mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="mb-3 text-2xl font-bold text-white xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl xs:mb-4 sm:mb-6 lg:mb-6"
          >
            {content.about.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="max-w-4xl px-2 mx-auto text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-slate-300 xs:px-4"
          >
            {content.about.description}
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-4 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xs:gap-6 sm:gap-8 lg:gap-6 xl:gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                x: 10,
                transition: { duration: 0.3 }
              }}
              className="p-4 transition-colors duration-300 border rounded-lg bg-slate-800/50 backdrop-blur-sm xs:p-5 sm:p-6 lg:p-6 xl:p-7 border-slate-700 hover:border-cyan-400"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.6, type: "spring" }}
              >
                <skill.icon className="w-8 h-8 mb-2 xs:w-9 sm:w-10 lg:w-11 xl:w-12 xs:h-9 sm:h-10 lg:h-11 xl:h-12 text-cyan-400 xs:mb-3 sm:mb-3 lg:mb-4" />
              </motion.div>
              <h3 className="mb-2 text-base font-semibold text-white xs:text-lg sm:text-xl lg:text-xl xl:text-2xl xs:mb-2 lg:mb-3">{skill.name}</h3>
              <p className="text-xs xs:text-sm sm:text-sm lg:text-base xl:text-base text-slate-300">{skill.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -100, rotateY: -15 }}
          whileInView={{ 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
            transition: {
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{
            x: 10,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            transition: { duration: 0.3 }
          }}
          className="p-4 mt-8 border rounded-lg xs:mt-12 sm:mt-16 lg:mt-20 xl:mt-24 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm xs:p-6 sm:p-8 lg:p-10 xl:p-12 border-slate-700"
        >
          <motion.h3 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-3 text-xl font-bold text-white xs:text-2xl sm:text-2xl lg:text-3xl xl:text-3xl xs:mb-4 lg:mb-5"
          >
            {content.about.journey.title}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm leading-relaxed text-slate-300 xs:text-base sm:text-base lg:text-lg xl:text-lg"
          >
            {content.about.journey.description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}