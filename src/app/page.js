"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  FileText,
  Code2,
  Terminal,
  Database,
  Layout,
  Briefcase,
  GraduationCap,
  Award,
  ChevronRight,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const ROLES = ["Frontend Developer", "React Enthusiast", "UI/UX Lover", "Creative Problem Solver"];

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle, loading, success, error
  const [formMessage, setFormMessage] = useState("");

  // Custom Cursor / Mouse position for background effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Typewriter effect states
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeTimer = setTimeout(() => {
      const fullText = ROLES[roleIndex];
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1500); // pause at end
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(typeTimer);
  }, [currentText, isDeleting, roleIndex]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus("success");
        setFormMessage(data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
        setFormMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setFormStatus("error");
      setFormMessage("Failed to connect to the server.");
    }

    setTimeout(() => {
      setFormStatus("idle");
      setFormMessage("");
    }, 5000);
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-indigo-500/30 overflow-hidden relative">

      {/* Dynamic Background Blob Following Mouse */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen z-0"
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 2 }}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer"
          >
            Nitheenkumar.
          </motion.span>
          <div className="hidden md:flex gap-8 text-sm text-gray-400">
            {["About", "Skills", "Projects", "Experience", "Achievements", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2, color: "#fff" }}
                className="hover:text-white transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 space-y-32">
        {/* 1️⃣ Hero Section */}
        <section className="min-h-[70vh] flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex-1 space-y-6"
          >
            <motion.h2
              variants={slideInLeft}
              className="text-indigo-400 font-medium tracking-wide text-sm md:text-base uppercase flex items-center gap-2"
            >
              <span className="w-12 h-[2px] bg-indigo-500 rounded-full"></span>
              Aspiring Front End Developer
            </motion.h2>
            <motion.h1
              variants={slideInLeft}
              className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-tight"
            >
              Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">Nitheenkumar</span>
            </motion.h1>
            <motion.div variants={slideInLeft} className="h-8">
              <span className="text-xl md:text-2xl font-mono text-cyan-400 border-r-2 border-cyan-400 pr-2 animate-pulse">
                {currentText}
              </span>
            </motion.div>
            <motion.p
              variants={slideInLeft}
              className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mt-4"
            >
              Passionate about crafting pixel-perfect, interactive, and responsive web applications. Turning ideas into beautiful digital experiences.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                View Projects <ExternalLink size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                href="#resume"
                className="px-6 py-3 rounded-full border border-white/20 transition-all flex items-center gap-2 relative overflow-hidden group"
              >
                <FileText size={18} /> View Resume
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-6 py-3 rounded-full border border-white/20 transition-all flex items-center gap-2"
              >
                <Mail size={18} /> Contact Me
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative"
          >
            {/* Animated Orbits */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-10 border border-indigo-500/20 rounded-full border-dashed"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-20 border border-cyan-500/20 rounded-full border-dotted"
            />

            {/* Glowing background blob */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-cyan-600 rounded-full blur-[80px]"
            ></motion.div>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 border border-white/10 bg-[#121212] overflow-hidden group shadow-[0_0_50px_rgba(99,102,241,0.2)]"
            >
              <Image
                src="/profile.jpg"
                alt="Nitheenkumar"
                width={320}
                height={320}
                priority
                className="w-full h-full object-cover object-top rounded-full group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0 bg-[#0a0a0a]"
              />
            </motion.div>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-gray-400 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center p-1"
            >
              <div className="w-1 h-2 bg-indigo-500 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* 2️⃣ About Section */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="scroll-mt-24"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
              ></motion.div>
              <p className="text-gray-400 leading-relaxed text-lg">
                Frontend Developer with hands-on experience in JavaScript, React, and Node.js.
                Skilled in building responsive web applications, API integration, and clean UI development.
              </p>
              <p className="text-gray-400 leading-relaxed text-lg">
                Seeking an opportunity to contribute to modern web projects while expanding technical expertise. I enjoy turning complex problems into simple, beautiful, and intuitive designs.
              </p>
            </motion.div>
            {/* Education Box */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="bg-[#121212] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-xl font-bold">Education</h3>
              </div>
              <div className="space-y-6 border-l-2 border-white/10 pl-6 ml-6">
                <div className="relative">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#121212]"
                  ></motion.span>
                  <div className="text-indigo-400 text-sm font-medium mb-1">2024 – 2026</div>
                  <h4 className="text-lg font-bold text-white">Master of Computer Applications (MCA)</h4>
                  <p className="text-gray-400 text-sm mt-1">Arul Anandar College (Autonomous), Karumathur<br />Madurai Kamaraj University</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-block mt-3 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold"
                  >
                    Degree Awarded with 78% CGPA | Duration: 2024 – 2026
                  </motion.div>
                </div>

                <div className="relative">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#121212]"
                  ></motion.span>
                  <div className="text-indigo-400 text-sm font-medium mb-1">2021 – 2024</div>
                  <h4 className="text-lg font-bold text-white">Bachelor of Science (B.Sc.) in Computer Science</h4>
                  <p className="text-gray-400 text-sm mt-1">Meenakshi Ammal Arts and Science College, Uthiramerur<br />University of Madras</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-block mt-3 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold"
                  >
                    Graduated with a Distinction - 75% CGPA
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 3️⃣ Skills Section */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="scroll-mt-24"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">Technical Arsenal</motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mb-12"
          ></motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="bg-[#121212] border border-white/5 p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] rounded-full group-hover:bg-indigo-500/10 transition-colors duration-500"></div>
              <h3 className="text-xl font-bold flex items-center gap-3 mb-6 relative z-10">
                <Code2 className="text-indigo-400" /> Hard Skills
              </h3>
              <div className="space-y-5 relative z-10">
                {[
                  { name: "HTML5, CSS3, React.js", level: 90 },
                  { name: "JavaScript", level: 85 },
                  { name: "Node.js, REST API", level: 80 },
                  { name: "MySQL", level: 75 },
                  { name: "Git, GitHub, VS Code", level: 85 }
                ].map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-300">{skill.name}</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full relative"
                      >
                        <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20 blur-[2px]"></div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-[#121212] border border-white/5 p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full group-hover:bg-cyan-500/10 transition-colors duration-500"></div>
              <h3 className="text-xl font-bold flex items-center gap-3 mb-6 relative z-10">
                <Layout className="text-cyan-400" /> Soft Skills
              </h3>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {[
                  "Problem Solving", "Communication Skills",
                  "Time Management", "Attention to Detail",
                  "Adaptability", "Team Player"
                ].map((skill, i) => (
                  <motion.div
                    key={skill}
                    custom={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    className="flex items-center gap-3 bg-white/5 p-4 rounded-xl cursor-default"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                    <span className="text-sm font-medium text-gray-300">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 4️⃣ Projects Section */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="scroll-mt-24"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">Featured Projects</motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mb-12"
          ></motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="bg-[#121212] hover:bg-[#161616] transition-colors border border-white/5 rounded-2xl p-8 group relative overflow-hidden"
          >
            {/* Hover dash effect */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent -translate-x-[100%] group-hover:animate-shimmer"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">AAC Alumni Management System</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["React.js", "Node.js", "MySQL"].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://coe.aactni.edu.in/apr26/24MCA514/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-full transition-colors shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              >
                Live Demo <ExternalLink size={16} />
              </motion.a>
            </div>

            <ul className="space-y-3 text-gray-400">
              {[
                "Developed a full-stack alumni platform enabling registration, profile management, and communication.",
                "Built RESTful APIs using Node.js and integrated MySQL for secure data storage.",
                "Implemented responsive UI using React ensuring cross-browser compatibility.",
                "Improved system usability by creating admin features for managing alumni data."
              ].map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3"
                >
                  <ChevronRight size={20} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="bg-[#121212] hover:bg-[#161616] transition-colors border border-white/5 rounded-2xl p-8 group relative overflow-hidden mt-8"
          >
            {/* Hover dash effect */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent -translate-x-[100%] group-hover:animate-shimmer delay-150"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">Smart Government Bus Portal</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["PHP", "JavaScript", "Razorpay", "MySQL", "Tailwind CSS"].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <ul className="space-y-3 text-gray-400">
              {[
                "Engineered a digital web-based ticketing system to replace paper tickets with secure daily, monthly, and yearly e-passes.",
                "Integrated Razorpay Payment Gateway for processing credit cards, UPI, and netbanking transactions securely.",
                "Architected a comprehensive Admin Dashboard featuring user management, bus route network codes, and real-time revenue analytics.",
                "Built an anti-fraud boarding verification system validating user pass expiry and enforcing daily transit limits.",
                "Implemented PHPMailer for automated SMTP triggers confirming user registrations and payment email receipts."
              ].map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3"
                >
                  <ChevronRight size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="bg-[#121212] hover:bg-[#161616] transition-colors border border-white/5 rounded-2xl p-8 group relative overflow-hidden mt-8"
          >
            {/* Hover dash effect */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent -translate-x-[100%] group-hover:animate-shimmer delay-300"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">WheelMasters Bike Showroom System</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["PHP", "JavaScript", "Bootstrap 5", "MySQL", "RBAC"].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <ul className="space-y-3 text-gray-400">
              {[
                "Developed a robust three-tier architecture (Customer, Staff, Admin) with Role-Based Access Control and bcrypt authorization.",
                "Engineered a dynamic customer portal to browse inventory, book test rides, and place multi-payment vehicle orders.",
                "Created an administrative interface with analytics dashboards, inventory management, and extensive daily sales reporting.",
                "Built a dedicated staff portal to manage assigned workflows, process test rides, and generate billing invoices seamlessly.",
                "Designed a fully normalized MySQL relational database schemas with standardized CRUD integrations across models."
              ].map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3"
                >
                  <ChevronRight size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.section>

        {/* 6️⃣ Experience & Achievements */}
        <motion.section
          id="experience"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="scroll-mt-24"
        >
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience</h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mb-12"
              ></motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#121212] border border-white/5 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Full Stack Developer Intern</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <p className="text-gray-400 text-sm">WilTeck • 1 Month • Madurai</p>
                      <span className="text-indigo-400/50 text-[10px] hidden md:inline">•</span>
                      <p className="text-indigo-400/60 text-[10px] font-mono uppercase tracking-wider">ID: WTMDU866</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-3 text-gray-400 text-sm">
                  {[
                    "Developed responsive UI components using HTML, CSS, and JavaScript.",
                    "Debugged and resolved cross-browser UI issues improving application usability.",
                    "Collaborated with developers using Git and GitHub for version control.",
                    "Assisted in backend integration and database operations."
                  ].map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex gap-3"
                    >
                      <div className="w-1.5 h-1.5 mt-2 rounded-full bg-indigo-500 flex-shrink-0"></div>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.div variants={fadeInUp} className="mt-6 pt-6 border-t border-white/5">
                  <a
                    href="/internship_certificate.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium group"
                  >
                    <Award size={16} />
                    View Internship Certificate
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Certifications</h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mb-12"
              ></motion.div>

              <div className="space-y-4">
                {[
                  { title: "Introduction to Front End Development", issuer: "SimpliLearn", date: "2nd March 2026", code: "9911853", color: "cyan", file: "Front_End_Development.pdf" },
                  { title: "Getting Started with NodeJS", issuer: "SimpliLearn", date: "2nd March 2026", code: "9912200", color: "indigo", file: "NodeJS.pdf" },
                  { title: "Azure Fundamentals", issuer: "SimpliLearn", date: "23rd February 2026", code: "9880177", color: "emerald", file: "Azure_Fundamentals.pdf" },
                  { title: "Introduction to the Fundamentals of Databases", issuer: "SimpliLearn", date: "6th March 2026", code: "9927880", color: "purple", file: "Fundamentals_of_Databases.pdf" },
                  { title: "Introduction to MS Excel", issuer: "SimpliLearn", date: "24th June 2025", code: "8509219", color: "blue", file: "Ms_Excel.pdf" }
                ].map((cert, index) => (
                  <motion.div
                    key={cert.title}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="bg-[#121212] border border-white/5 rounded-xl p-6 flex items-center gap-5 hover:border-white/10 transition-colors"
                  >
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-tr from-${cert.color}-500/20 to-${cert.color}-600/20 flex items-center justify-center text-${cert.color}-400 shrink-0`}>
                      <Award size={26} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white leading-snug">{cert.title}</h4>
                      <p className="text-gray-400 text-sm mt-1">Issued by {cert.issuer} • {cert.date}</p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-indigo-400/60 text-[10px] font-mono uppercase tracking-wider">ID: {cert.code}</p>
                        <a
                          href={`/${cert.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors group/link"
                        >
                          View <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 7️⃣ College Events & Achievements */}
        <motion.section
          id="achievements"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="scroll-mt-24"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">College Events & Achievements</motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-12"
          ></motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Achievement 1: International Conference */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-[#121212] border border-white/5 rounded-2xl p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] rounded-full group-hover:bg-amber-500/10 transition-colors duration-500"></div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">International Conference Presentation</h3>
                  <p className="text-gray-400 text-sm mt-1">Arul Anandar College • Feb 2026</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 group-hover:border-amber-500/30 transition-colors">
                  <h4 className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">Paper Title</h4>
                  <p className="text-sm text-gray-300 leading-relaxed italic">
                    &quot;A Comparative Study of Supervised Machine Learning Algorithms for Predictive Modeling in Financial Risk Assessment&quot;
                  </p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Presented a research paper at the International Conference on &quot;IMPACT OF AI IN SPORTS AND COMPUTING&quot; jointly organized by the Dept. of Computer Science and Physical Education.
                </p>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="/Paper_Presentation.jpeg"
                  target="_blank"
                  className="w-full py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                  View Presentation Certificate <ExternalLink size={14} />
                </motion.a>
              </div>
            </motion.div>

            {/* Achievement 2: Smart Techies Award */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-[#121212] border border-white/5 rounded-2xl p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[50px] rounded-full group-hover:bg-orange-500/10 transition-colors duration-500"></div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">Smart Techies - 2025 Award</h3>
                  <p className="text-gray-400 text-sm mt-1">Outstanding Innovation Recognition</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 group-hover:border-orange-500/30 transition-colors">
                  <h4 className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">Project Recognition</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Awarded for exceptional technical skills and originality demonstrated in the project:
                    <strong className="text-white block mt-1">&quot;Digital Permission Management System&quot;</strong>
                  </p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Recognized for outstanding innovation and creativity by the Department of Computer Science and Applications during the college event.
                </p>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="/Smart_Techies.jpeg"
                  target="_blank"
                  className="w-full py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                  View Appreciation Certificate <ExternalLink size={14} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 8️⃣ Resume Section */}
        <motion.section
          id="resume"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="scroll-mt-24"
        >
          <div className="relative bg-gradient-to-r from-indigo-900/40 to-cyan-900/40 border border-white/10 rounded-3xl p-10 md:p-16 overflow-hidden text-center group">
            <div className="absolute inset-0 bg-[#0a0a0a]/20 backdrop-blur-sm"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>
            <motion.div variants={fadeInUp} className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="w-20 h-20 mx-auto bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                <FileText size={40} />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">Resum&eacute;</h2>
              <p className="text-gray-400 text-lg">
                Get a comprehensive overview of my technical skills, experience, and educational background. Feel free to download my resume for your records.
              </p>
              <div className="pt-6 flex flex-wrap justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all font-sans"
                >
                  <FileText size={20} /> View Resume
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(99,102,241,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  href="/resume.pdf"
                  download="Nitheenkumar_Resume.pdf"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all font-sans"
                >
                  <FileText size={20} /> Download PDF
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 9️⃣ Contact Section */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="scroll-mt-24 pb-20 border-t border-white/5 pt-20"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Let&apos;s Work Together</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              I&apos;m currently seeking new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div variants={fadeInUp} className="space-y-8">
              {[
                { icon: Mail, label: "Email", value: "nitheenkumar18@gmail.com", link: "mailto:nitheenkumar18@gmail.com", textColor: "text-indigo-400" },
                { icon: Phone, label: "Phone", value: "+91 7094998196", textColor: "text-emerald-400" },
                { icon: MapPin, label: "Location", value: "Madurai, Tamil Nadu", textColor: "text-cyan-400" }
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-6"
                >
                  <div className={`w-14 h-14 rounded-full bg-white/5 flex items-center justify-center ${item.textColor}`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm font-medium">{item.label}</h4>
                    {item.link ? (
                      <a href={item.link} className="text-xl font-bold text-white hover:text-indigo-400 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-xl font-bold text-white">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.form variants={fadeInUp} className="space-y-4" onSubmit={handleContactSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                placeholder="Name"
                className="w-full bg-[#121212] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500 transition-colors text-white focus:ring-1 focus:ring-indigo-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                placeholder="Email"
                className="w-full bg-[#121212] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500 transition-colors text-white focus:ring-1 focus:ring-indigo-500"
              />
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                required
                placeholder="Message"
                className="w-full bg-[#121212] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500 transition-colors text-white resize-none focus:ring-1 focus:ring-indigo-500"
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus === "loading"}
                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formStatus === "loading" ? "Sending..." : "Send Message"}
                {formStatus !== "loading" && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight size={18} />
                  </motion.div>
                )}
              </motion.button>

              {/* Form Status Messages */}
              {formStatus === "success" && (
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 p-4 rounded-xl">
                  <CheckCircle2 size={18} />
                  <span className="text-sm font-medium">{formMessage}</span>
                </div>
              )}
              {formStatus === "error" && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl">
                  <AlertCircle size={18} />
                  <span className="text-sm font-medium">{formMessage}</span>
                </div>
              )}
            </motion.form>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Nitheenkumar. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-gray-400">
            <motion.a
              whileHover={{ y: -3, color: "white" }}
              href="https://github.com/Nitheenkumar15" target="_blank" rel="noreferrer" className="transition-colors"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              whileHover={{ y: -3, color: "white", scale: 1.1 }}
              href="https://www.linkedin.com/in/nitheenkumar15/" target="_blank" rel="noreferrer" className="transition-colors text-blue-400"
            >
              <Linkedin size={24} />
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
}
