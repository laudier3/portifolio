"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// módulos do Swiper
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Projeto 1: E-commerce",
    description: "Uma loja online moderna com carrinho de compras e pagamento integrado.",
    image: "/1.jpg",
    link: "#",
  },
  {
    title: "Projeto 2: Blog Pessoal",
    description: "Um blog para compartilhar conteúdos com suporte a Markdown e SEO.",
    image: "/2.jpeg",
    link: "#",
  },
  {
    title: "Projeto 3: Dashboard Admin",
    description: "Painel administrativo interativo com gráficos e estatísticas em tempo real.",
    image: "/3.jpeg",
    link: "#",
  },
];


export default function PortfolioSlider() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Meus Projetos</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 5000 }}
        spaceBetween={30}
        slidesPerView={1}
        className="rounded-lg overflow-hidden shadow-lg"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full md:w-1/2 relative h-64 md:h-80">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors text-center md:text-left"
                >
                  Ver Projeto
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
