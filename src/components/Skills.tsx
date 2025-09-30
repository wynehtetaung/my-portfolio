import { motion } from 'framer-motion'
import { 
  Code, 
  Database, 
  Smartphone, 
  Server, 
  GitBranch,
  Cloud
} from 'lucide-react'
import content from '@/data/content.json'

export default function Skills() {
  const categoryIcons = [Code, Server, Database, Cloud, GitBranch, Smartphone];
  const skillCategories = content.skills.categories.map((category, index) => ({
    ...category,
    icon: categoryIcons[index]
  }));

  const summaryColors: { [key: string]: string } = {
    cyan: 'text-cyan-400',
    purple: 'text-purple-400', 
    green: 'text-green-400',
    orange: 'text-orange-400'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <section id="skills" className="relative min-h-screen py-12 xs:py-16 sm:py-20 lg:py-24">
      <div className="container px-4 mx-auto xs:px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 text-center xs:mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="mb-3 text-2xl font-bold text-white xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl xs:mb-4 sm:mb-6 lg:mb-6"
          >
            {content.skills.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-4xl px-2 mx-auto text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-slate-300 xs:px-4"
          >
            {content.skills.description}
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xs:gap-6 sm:gap-8 lg:gap-6 xl:gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              variants={categoryVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="p-4 transition-all duration-300 border rounded-lg bg-slate-800/50 backdrop-blur-sm xs:p-5 sm:p-6 lg:p-6 xl:p-7 border-slate-700 hover:border-cyan-400"
            >
              <div className="flex items-center mb-4 xs:mb-5 sm:mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 + 0.5, duration: 0.6, type: "spring" }}
                >
                  <category.icon className="w-6 h-6 mr-2 xs:w-7 sm:w-8 lg:w-8 xl:w-9 xs:h-7 sm:h-8 lg:h-8 xl:h-9 text-cyan-400 xs:mr-3" />
                </motion.div>
                <h3 className="text-base font-semibold text-white xs:text-lg sm:text-xl lg:text-xl xl:text-2xl">{category.category}</h3>
              </div>
              
              <div className="space-y-3 xs:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium xs:text-sm sm:text-sm lg:text-base text-slate-300">{skill.name}</span>
                      <span className="text-xs font-semibold xs:text-xs sm:text-xs lg:text-sm text-cyan-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-700">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.5, 
                          duration: 1.2,
                          ease: "easeOut"
                        }}
                        className="relative h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                      >
                        <motion.div
                          animate={{ 
                            boxShadow: [
                              "0 0 0px rgba(6, 182, 212, 0.4)",
                              "0 0 20px rgba(6, 182, 212, 0.6)",
                              "0 0 0px rgba(6, 182, 212, 0.4)"
                            ]
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 rounded-full"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="p-4 mt-8 border rounded-lg xs:mt-12 sm:mt-16 lg:mt-20 bg-gradient-to-r from-slate-800/30 to-slate-900/30 backdrop-blur-sm xs:p-6 sm:p-8 lg:p-10 border-slate-700"
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xs:gap-6">
            {Object.entries(content.skills.summary).map(([key, item]) => (
              <motion.div 
                key={key}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className={`text-2xl xs:text-3xl lg:text-4xl font-bold ${summaryColors[item.color]} mb-1 xs:mb-2`}>
                  {item.value}
                </div>
                <div className="text-xs text-slate-300 xs:text-sm lg:text-base">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}