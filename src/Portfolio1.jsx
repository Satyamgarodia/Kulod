import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code,
  Terminal,
  Zap,
  Server,
  Database,
  Cloud,
  ChevronDown,
  ExternalLink,
  Award,
  Briefcase,
} from "lucide-react";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);

    // Mouse tracking for gradient follow effect
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);

    // Particle canvas animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = "rgba(0, 255, 159, 0.5)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(glitchInterval);
    };
  }, []);

  const skills = [
    { name: "React.js", level: 95, icon: Code },
    { name: "Node.js", level: 90, icon: Server },
    { name: "SQL", level: 88, icon: Database },
    { name: "React Native", level: 85, icon: Terminal },
    { name: "PHP", level: 82, icon: Code },
    { name: "Google Cloud", level: 80, icon: Cloud },
  ];

  const projects = [
    {
      title: "GPMS - Field Sales & Operation Management",
      period: "Dec 2025 - Current",
      status: "Live & Deploying",
      description:
        "Industry-ready SaaS solution streamlining field sales operations with multi-inventory, accounting, vehicles, and payments management.",
      tech: [
        "PostgreSQL",
        "Express.js",
        "React.js",
        "React Native",
        "Google Cloud",
      ],
      gradient: "from-cyan-500 to-blue-600",
      url: "https://portal.garodia.in.net",
    },
    {
      title: "Octa Wipe – Enterprise Bulk System Wiping",
      period: "Oct 2025 - Current",
      status: "In Development",
      description:
        "Single-click bulk wiping solution for Windows & Linux devices. NIST 800-88 & DOD 5220.22-M compliant network boot purge system.",
      tech: ["Python", "Node.js", "Serva", "Ubuntu LTS", "Rust"],
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "UPI Payment Management For SME",
      period: "May 2023 - Mar 2025",
      status: "Deprecated",
      description:
        "Integrated payment solution for multi-counter sales billing with Airtel Payments Bank at low cost for small enterprises.",
      tech: ["PHP", "MySQL", "Linux", "Bootstrap"],
      gradient: "from-green-500 to-emerald-600",
    },
  ];

  const certifications = [
    { name: "Introduction to Networks", org: "Cisco", date: "Jan 2026" },
    {
      name: "Python For Data Science",
      org: "NPTEL - IIT Madras",
      date: "Feb 2024",
    },
    { name: "Ethical Hacking", org: "IIT Bombay", date: "Dec 2022" },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-30"
      />

      {/* Gradient Orb Following Mouse */}
      <div
        className="fixed w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-300 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,159,0.4) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-scan" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div
          className={`max-w-6xl w-full transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Terminal Header */}
          <div className="mb-8 font-mono text-sm text-green-400 opacity-70">
            <span className="animate-pulse">▸</span> Initializing
            portfolio.exe...
            <br />
            <span className="animate-pulse delay-100">▸</span> Loading
            modules...
            <br />
            <span className="animate-pulse delay-200">▸</span> System ready.
          </div>

          {/* Main Name with Glitch */}
          <h1
            className={`text-8xl font-black mb-4 tracking-tighter ${glitchActive ? "glitch" : ""}`}
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            SATYAM
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 animate-gradient">
              GARODIA
            </span>
          </h1>

          {/* Animated Role */}
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="text-green-400 animate-pulse" size={28} />
            <h2
              className="text-3xl font-bold text-green-400"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              SOFTWARE DEVELOPER
            </h2>
          </div>

          {/* Bio with typing effect styling */}
          <p className="text-xl text-gray-300 max-w-4xl leading-relaxed mb-12 font-light">
            Full-stack developer specializing in{" "}
            <span className="text-cyan-400 font-semibold">
              SaaS architecture
            </span>{" "}
            and
            <span className="text-cyan-400 font-semibold">
              {" "}
              enterprise-grade systems
            </span>
            . Building SAP-level workflows with expertise in Node.js, React, and
            Linux system operations. Currently developing{" "}
            <span className="text-green-400 font-semibold">
              NIST SP 800-88 compliant
            </span>{" "}
            bulk data wiping solutions.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="border border-cyan-500/30 bg-cyan-500/5 p-6 rounded-lg backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-cyan-400 mb-2">3+</div>
              <div className="text-gray-400 text-sm">Live Projects</div>
            </div>
            <div className="border border-green-500/30 bg-green-500/5 p-6 rounded-lg backdrop-blur-sm hover:border-green-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-green-400 mb-2">10+</div>
              <div className="text-gray-400 text-sm">Technologies</div>
            </div>
            <div className="border border-purple-500/30 bg-purple-500/5 p-6 rounded-lg backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-purple-400 mb-2">3</div>
              <div className="text-gray-400 text-sm">Certifications</div>
            </div>
          </div>

          {/* Contact Links */}
          <div className="flex gap-6 flex-wrap">
            <a
              href="https://github.com/Satyamgarodia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group"
            >
              <Github
                className="group-hover:text-cyan-400 transition-colors"
                size={20}
              />
              <span className="group-hover:text-cyan-400 transition-colors">
                GitHub
              </span>
            </a>
            <a
              href="https://linkedin.com/in/satyam-garodia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group"
            >
              <Linkedin
                className="group-hover:text-blue-400 transition-colors"
                size={20}
              />
              <span className="group-hover:text-blue-400 transition-colors">
                LinkedIn
              </span>
            </a>
            <a
              href="mailto:Satyamgarodia1@gmail.com"
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
            >
              <Mail
                className="group-hover:text-green-400 transition-colors"
                size={20}
              />
              <span className="group-hover:text-green-400 transition-colors">
                Email
              </span>
            </a>
            <a
              href="tel:+918340370685"
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
            >
              <Phone
                className="group-hover:text-green-400 transition-colors"
                size={20}
              />
              <span className="group-hover:text-green-400 transition-colors">
                Phone
              </span>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="text-cyan-400" size={32} />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-6xl font-black mb-4 flex items-center gap-4"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            <Zap className="text-yellow-400" size={48} />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              SKILLS
            </span>
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            Core technologies & expertise
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, idx) => (
              <div
                key={skill.name}
                className="group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <skill.icon
                      className="text-cyan-400 group-hover:text-green-400 transition-colors"
                      size={24}
                    />
                    <span className="text-xl font-semibold">{skill.name}</span>
                  </div>
                  <span className="text-cyan-400 font-mono">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-green-400 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-cyan-500/50"
                    style={{
                      width: isLoaded ? `${skill.level}%` : "0%",
                      transitionDelay: `${idx * 100}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-6xl font-black mb-4 flex items-center gap-4"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            <Briefcase className="text-purple-400" size={48} />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              PROJECTS
            </span>
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            Building enterprise solutions & innovative tools
          </p>

          <div className="space-y-8">
            {projects.map((project, idx) => (
              <div
                key={project.title}
                className="group border border-gray-800 rounded-2xl p-8 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10"
                style={{ animationDelay: `${idx * 150}ms` }}
                onClick={() => {
                  if (project.url) window.open(project.url, "_blank");
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="font-mono">{project.period}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${project.gradient} text-white`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <ExternalLink
                    className="text-gray-600 group-hover:text-cyan-400 transition-colors"
                    size={24}
                  />
                </div>

                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-sm font-mono text-cyan-400 hover:border-cyan-500 hover:bg-gray-700/80 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-6xl font-black mb-4 flex items-center gap-4"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            <Server className="text-blue-400" size={48} />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              EXPERIENCE
            </span>
          </h2>
          <p className="text-gray-400 mb-12 text-lg">Professional journey</p>

          <div className="border-l-4 border-cyan-500 pl-8 space-y-12">
            <div className="relative">
              <div className="absolute -left-[42px] w-8 h-8 rounded-full bg-cyan-500 border-4 border-black" />
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-2">Software Developer</h3>
                <p className="text-cyan-400 mb-4 font-semibold">
                  Mai Health Inc. • Aug 2024 - Mar 2025
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Led a team as Intermediate React Developer, building
                  efficient, user-friendly web applications. Guided team through
                  modern React development practices to ensure high-quality,
                  scalable solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-6xl font-black mb-4 flex items-center gap-4"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            <Award className="text-green-400" size={48} />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              CERTIFICATIONS
            </span>
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            Continuous learning & professional development
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <div
                key={cert.name}
                className="border border-gray-800 rounded-xl p-6 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/10"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <Award className="text-green-400 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
                <p className="text-cyan-400 text-sm mb-1">{cert.org}</p>
                <p className="text-gray-500 text-sm font-mono">{cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-6xl font-black mb-8"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 animate-gradient">
              LET'S CONNECT
            </span>
          </h2>

          <p className="text-2xl text-gray-300 mb-12">
            Open to opportunities, collaborations, and interesting conversations
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-center gap-4 p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500 transition-all duration-300">
              <Mail className="text-cyan-400" size={28} />
              <div className="text-left">
                <div className="text-xs text-gray-500 mb-1">Email</div>
                <div className="font-mono text-sm">
                  Satyamgarodia1@gmail.com
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-green-500 transition-all duration-300">
              <Phone className="text-green-400" size={28} />
              <div className="text-left">
                <div className="text-xs text-gray-500 mb-1">Phone</div>
                <div className="font-mono text-sm">+91 83403 70685</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-gray-500">
            <MapPin size={20} className="text-cyan-400" />
            <span>Gurgaon, Haryana, India</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 font-mono text-sm">
            © 2026 Satyam Garodia
          </p>
          <p className="text-gray-700 font-mono text-xs mt-2">
            {"</>"} with passion & precision
          </p>
        </div>
      </footer>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap");

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .animate-scan {
          animation: scan 8s linear infinite;
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .glitch {
          animation: glitch 0.3s linear;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
