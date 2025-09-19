"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    title: "Encurtador de URL",
    description:
      "Um sistema completo de encurtamento de URLs com planos FREE e PRO, integração com Stripe e design moderno.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Stripe", "Prisma"],
    image:
      "https://images.unsplash.com/photo-1523473827534-86c929c13613?auto=format&fit=crop&w=1000&q=80",
    github: "https://github.com/seu-repo",
    demo: "https://seu-projeto.com",
  },
  {
    title: "Painel Administrativo",
    description:
      "Dashboard intuitivo e moderno para gerenciar usuários, produtos e pagamentos.",
    tech: ["React", "Redux", "Material UI", "Node.js"],
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1000&q=80",
    github: "https://github.com/seu-repo",
  },
];

export default function ProjectList() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-12"
        >
          🚀 Projetos Realizados
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              <div className="h-56 w-full overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 flex-grow">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="bg-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <Github size={20} /> Código
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <ExternalLink size={20} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
