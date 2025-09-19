'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// 🔧 Métricas
const metrics = [
  { title: 'Projetos Concluídos', value: '12', icon: '🛠️' },
  { title: 'Anos de Experiência', value: '3', icon: '📆' },
  { title: 'Tecnologias', value: '15+', icon: '🧠' },
  { title: 'Certificações', value: '4', icon: '📜' },
  { title: 'Clientes Atendidos', value: '10+', icon: '🤝' },
  { title: 'Artigos Publicados', value: '7', icon: '✍️' },
];

// 🔧 Gráfico
const chartData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Commits por mês',
      data: [5, 12, 18, 20, 30, 28, 35],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      tension: 0.4,
    },
  ],
};

// 🔧 Depoimentos
const testimonials = [
  {
    name: 'Carlos Lima',
    role: 'Tech Lead - DevSolutions',
    quote: 'José é um desenvolvedor extremamente dedicado e atento aos detalhes. Foi um prazer trabalhar com ele.',
  },
  {
    name: 'Mariana Duarte',
    role: 'Mentora - Bootcamp Fullstack',
    quote: 'Com iniciativa e consistência, José se destacou no projeto final com soluções inovadoras e elegantes.',
  },
  {
    name: 'Roberto Tavares',
    role: 'Ex-colega de equipe',
    quote: 'Ótimo em colaboração, sempre pronto para ajudar e com uma visão clara de arquitetura de sistemas.',
  },
];

// 🔧 Serviços
const services = [
  { title: 'Desenvolvimento Web', desc: 'Criação de sites e sistemas modernos.', icon: '💻' },
  { title: 'APIs & Integrações', desc: 'APIs escaláveis e integrações robustas.', icon: '🔗' },
  { title: 'UI/UX Design', desc: 'Interfaces intuitivas e responsivas.', icon: '🎨' },
  { title: 'Consultoria Tech', desc: 'Auxílio em arquitetura e boas práticas.', icon: '🧭' },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="font-sans text-gray-200 min-h-screen flex flex-col relative overflow-hidden">
      {/* Futuristic background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-black animate-gradient-x"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 bg-black/60 backdrop-blur-md shadow-md z-10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-indigo-400">José Santan de Jesus</h1>
            <nav className="flex space-x-4 items-center">
              <Link href="#projetos" className="text-indigo-300 hover:text-white">Projetos</Link>
              <Link href="#skills" className="text-indigo-300 hover:text-white">Habilidades</Link>
              <Link href="#servicos" className="text-indigo-300 hover:text-white">Serviços</Link>
              <Link href="#contato" className="text-indigo-300 hover:text-white">Contato</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero com mascote */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-4xl font-bold leading-tight text-white">
                  Olá! Sou José Santan de Jesus, desenvolvedor fullstack
                </h2>
                <p className="text-lg text-gray-300">
                  Transformo ideias em soluções digitais eficientes. Experiência em
                  desenvolvimento web, APIs, integrações e aplicações escaláveis.
                </p>
                <div className="flex gap-4 mt-6">
                  <Link href="#projetos" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transition transform">Ver Projetos</Link>
                  <Link href="#contato" className="border border-indigo-500 text-indigo-300 px-6 py-3 rounded-lg font-medium hover:bg-indigo-800/30 hover:scale-105 transition">Entrar em Contato</Link>
                </div>
              </motion.div>

              {/* Mascote animado */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="flex justify-center"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                  alt="Mascote Dev"
                  className="w-72 h-72 drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]"
                />
              </motion.div>
            </div>
          </section>

          {/* Métricas */}
          <section id="skills" className="py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {metrics.map((m) => (
                <motion.div
                  key={m.title}
                  whileHover={{ scale: 1.05 }}
                  className="bg-black/40 p-6 rounded-lg shadow-lg flex flex-col items-center space-y-2 text-center border border-indigo-500/30"
                >
                  <div className="text-3xl">{m.icon}</div>
                  <p className="text-gray-400">{m.title}</p>
                  <h3 className="text-2xl font-bold text-indigo-300">{m.value}</h3>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Serviços */}
          <section id="servicos" className="py-16">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-white text-center mb-10">Serviços</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((s) => (
                  <motion.div
                    key={s.title}
                    whileHover={{ y: -8 }}
                    className="bg-black/50 rounded-xl p-6 shadow-md text-center space-y-3 border border-purple-500/30"
                  >
                    <div className="text-4xl">{s.icon}</div>
                    <h3 className="font-bold text-lg text-indigo-300">{s.title}</h3>
                    <p className="text-gray-400">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Gráfico */}
          <section className="py-10">
            <div className="max-w-4xl mx-auto px-6 bg-black/50 p-6 rounded-lg shadow border border-indigo-500/30">
              <Line data={chartData} />
            </div>
          </section>

          {/* Depoimentos */}
          <section className="py-16 bg-black/40 border-t border-indigo-500/20">
            <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
              <h2 className="text-3xl font-bold text-white">Recomendações</h2>
              <div className="space-y-4">
                <blockquote className="text-lg italic text-gray-300">
                  “{testimonials[current].quote}”
                </blockquote>
                <p className="font-semibold text-indigo-300">{testimonials[current].name}, <span className="text-gray-400">{testimonials[current].role}</span></p>
              </div>
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-3 h-3 rounded-full ${idx === current ? 'bg-indigo-400' : 'bg-gray-500'}`}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-black/70 border-t border-indigo-500/20" id="contato">
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center text-sm text-gray-400">
            <span>&copy; 2025 José Santan de Jesus</span>
            <div className="space-x-4">
              <a href="mailto:jose@email.com" className="hover:text-indigo-300">Email</a>
              <a href="https://www.linkedin.com/in/josesantan" target="_blank" className="hover:text-indigo-300">LinkedIn</a>
              <a href="https://github.com/josesantan" target="_blank" className="hover:text-indigo-300">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
