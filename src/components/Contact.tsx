import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import { VALIDATION_RULES } from "../constants";
import content from "@/data/content.json";

// Define the form data type
type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

// Create Zod schema for form validation
const createContactSchema = (
  t: (key: string, options?: Record<string, unknown>) => string
) =>
  z.object({
    name: z
      .string()
      .min(1, t("contact.form.validation.nameRequired"))
      .min(
        VALIDATION_RULES.MIN_NAME_LENGTH,
        t("contact.form.validation.nameMinLength", {
          min: VALIDATION_RULES.MIN_NAME_LENGTH,
        })
      ),
    email: z
      .string()
      .min(1, t("contact.form.validation.emailRequired"))
      .email(t("contact.form.validation.emailInvalid")),
    message: z
      .string()
      .min(1, t("contact.form.validation.messageRequired"))
      .min(
        VALIDATION_RULES.MIN_MESSAGE_LENGTH,
        t("contact.form.validation.messageMinLength", {
          min: VALIDATION_RULES.MIN_MESSAGE_LENGTH,
        })
      )
      .max(
        VALIDATION_RULES.MAX_MESSAGE_LENGTH,
        t("contact.form.validation.messageMaxLength", {
          max: VALIDATION_RULES.MAX_MESSAGE_LENGTH,
        })
      ),
  });

export default function Contact() {
  const { t } = useTranslation();
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const contactSchema = createContactSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Auto-reset form and hide success message after 5 seconds
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000); // Hide success message after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: content.contact.info.email,
    },
    {
      icon: Phone,
      label: "Phone",
      value: content.contact.info.phone,
    },
    {
      icon: MapPin,
      label: "Location",
      value: content.contact.info.location,
    },
  ];

  const socialLinks = content.contact.social.links.map((link) => ({
    href: link.url,
    label: link.name,
    iconPath: link.iconPath,
  }));

  const formFields = content.contact.form.fields;

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv-resume.pdf";
    link.download = content.personal.personalCvFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("idle");

    try {
      // EmailJS configuration
      const result = await emailjs.send(
        content.contact.emailjs.serviceId,
        content.contact.emailjs.templateId,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_email: content.contact.emailjs.toEmail,
        },
        content.contact.emailjs.publicKey
      );

      console.log("Email sent successfully:", result);
      setSubmitStatus("success");

      // Use reset with explicit default values to ensure proper clearing
      reset({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Email send failed:", error);
      setSubmitStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      id="contact"
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
            initial={{ opacity: 0, x: -100, rotateZ: -5 }}
            whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="mb-3 text-2xl font-bold text-white xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl xs:mb-4 sm:mb-6 lg:mb-6"
          >
            {content.contact.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 100, rotateZ: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="max-w-4xl px-2 mx-auto text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-slate-300 xs:px-4"
          >
            {content.contact.description} {content.contact.description2}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xs:gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.h3
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-4 text-xl font-bold text-white xs:text-2xl sm:text-2xl lg:text-3xl xl:text-3xl xs:mb-5 sm:mb-6 lg:mb-7"
            >
              {content.contact.info.title}
            </motion.h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-4 xs:space-y-6 lg:space-y-8"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  variants={itemVariants}
                  whileHover={{
                    x: 10,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  className="flex items-center space-x-3 cursor-pointer xs:space-x-4"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1 + 0.5,
                      duration: 0.6,
                      type: "spring",
                    }}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg xs:w-9 sm:w-10 lg:w-11 xl:w-12 xs:h-9 sm:h-10 lg:h-11 xl:h-12 bg-cyan-400/20"
                  >
                    <info.icon className="w-4 h-4 xs:w-4 sm:w-5 lg:w-5 xl:w-6 xs:h-4 sm:h-5 lg:h-5 xl:h-6 text-cyan-400" />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 xs:text-xs sm:text-sm lg:text-sm xl:text-base">
                      {info.label}
                    </p>
                    <p className="text-sm font-semibold text-white break-all xs:text-sm sm:text-base lg:text-base xl:text-lg">
                      {/* {info.label === "Phone"
                        ? `<a href="tel:${info.value}">${info.value}</a>`
                        : info.label === "Email"
                        ? `<a href="mailto:${info.value}">${info.value}</a>`
                        : info.value} */}
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8"
            >
              <motion.h4
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="mb-3 text-base font-semibold text-white xs:text-lg sm:text-xl lg:text-xl xl:text-2xl xs:mb-4 lg:mb-5"
              >
                {content.contact.social.title}
              </motion.h4>

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      initial={{ opacity: 0, y: 30, scale: 0 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 1 + index * 0.1,
                        duration: 0.5,
                        type: "spring",
                      }}
                      whileHover={{
                        scale: 1.1,
                        y: -5,
                        rotate: 5,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-10 h-10 transition-colors duration-300 rounded-lg sm:w-12 sm:h-12 bg-slate-800 hover:bg-cyan-400 group"
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover:text-slate-900"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-label={social.label}
                      >
                        <path d={social.iconPath} />
                      </svg>
                    </motion.a>
                  ))}
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 30, scale: 0 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3, duration: 0.5, type: "spring" }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(100, 255, 218, 0.4)",
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadCV}
                  className="flex items-center justify-center xs:justify-start space-x-1.5 xs:space-x-2 px-3 xs:px-4 py-2 xs:py-2.5 lg:py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold text-xs xs:text-sm lg:text-base hover:opacity-90 transition-all duration-300 cursor-pointer w-full xs:w-auto"
                >
                  <Download className="w-3 h-3 xs:w-4 lg:w-5 xs:h-4 lg:h-5" />
                  <span>{content.contact.social.resumeButton}</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            whileHover={{
              x: -5,
              boxShadow: "0 25px 50px -12px rgba(100, 255, 218, 0.25)",
              transition: { duration: 0.3 },
            }}
            className="p-4 border rounded-lg bg-slate-800/50 backdrop-blur-sm xs:p-6 sm:p-8 lg:p-10 xl:p-12 border-slate-700"
          >
            <motion.h3
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-4 text-xl font-bold text-white xs:text-2xl sm:text-2xl lg:text-3xl xl:text-3xl xs:mb-5 lg:mb-6"
            >
              {content.contact.form.title}
            </motion.h3>

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 mb-6 border rounded-lg bg-green-500/20 border-green-500/50"
              >
                <p className="text-sm text-green-400">
                  {content.contact.form.success}
                </p>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 mb-6 border rounded-lg bg-red-500/20 border-red-500/50"
              >
                <p className="text-sm text-red-400">
                  {content.contact.form.error}
                </p>
              </motion.div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 xs:space-y-6 lg:space-y-8"
            >
              {formFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-slate-300 mb-1.5 xs:mb-2 text-xs xs:text-sm sm:text-sm lg:text-base">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      {...register(field.name as keyof ContactFormData)}
                      rows={5}
                      className={`w-full px-3 xs:px-4 py-2 xs:py-3 bg-slate-700 border rounded-lg text-white focus:outline-none transition-all duration-300 resize-none text-sm xs:text-sm sm:text-base lg:text-lg ${
                        errors[field.name as keyof ContactFormData]
                          ? "border-red-500 focus:border-red-400"
                          : "border-slate-600 focus:border-cyan-400"
                      }`}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      {...register(field.name as keyof ContactFormData)}
                      type={field.type}
                      className={`w-full px-3 xs:px-4 py-2 xs:py-3 bg-slate-700 border rounded-lg text-white focus:outline-none transition-all duration-300 text-sm xs:text-sm sm:text-base lg:text-lg ${
                        errors[field.name as keyof ContactFormData]
                          ? "border-red-500 focus:border-red-400"
                          : "border-slate-600 focus:border-cyan-400"
                      }`}
                      placeholder={field.placeholder}
                    />
                  )}
                  {errors[field.name as keyof ContactFormData] && (
                    <p className="mt-1.5 xs:mt-2 text-red-400 text-xs xs:text-xs sm:text-sm lg:text-base">
                      {errors[field.name as keyof ContactFormData]?.message}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 xs:px-6 sm:px-7 py-2.5 xs:py-3 lg:py-3.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold transition-all duration-300 text-sm xs:text-base lg:text-base ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-90 hover:shadow-lg"
                }`}
              >
                {isSubmitting
                  ? content.common.loading
                  : content.contact.form.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
