"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Image from "next/image";

const techStack = [
    {
        name: "Next.js",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "React.js",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Node.js",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express.js",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "Prisma ORM",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
      },
      {
        name: "PostgreSQL",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "HTML5",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS3",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "TypeScript",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "JavaScript",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "Redux",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
      },
      {
        name: "Nginx",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
      },
      {
        name: "Cloud Computing",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
      },
      {
        name: "Docker",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "Git",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },

      // Novos adicionados
      {
        name: "Tailwind CSS",
        img: "tailwind.svg", //`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg`,
      },
      {
        name: "Stripe",
        img: "stripe.svg", //"https://raw.githubusercontent.com/devicons/devicon/master/icons/stripe/stripe-original.svg",
      },
      {
        name: "Material UI",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
      },
      {
        name: "Bootstrap",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg",
      },
      {
        name: "Styled Components",
        img: "stylend.svg",
      }, // colocar arquivo local em public/projetos/
      {
        name: "API Mercado Pago",
        img: "mercadopago.svg",
      },
  ];
  

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[]; // badges
}

const projects: Project[] = [
  {
    title: "E-commerce Moderno",
    description: "Loja online com carrinho de compras, pagamento integrado e painel administrativo.",
    image: "/projetos/1.jpg",
    link: "https://meuecommerce.com",
    technologies: ["Next.js", "React.js", "Node.js", "Stripe", "Tailwind CSS"],
  },
  {
    title: "Blog Pessoal",
    description: "Blog responsivo com suporte a Markdown e otimização SEO.",
    image: "/projetos/2.jpg",
    link: "https://meublog.com",
    technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Dashboard Admin",
    description: "Painel interativo com gráficos e estatísticas em tempo real.",
    image: "/projetos/3.jpg",
    link: "https://meudashboard.com",
    technologies: ["Next.js", "React.js", "Node.js", "Prisma ORM", "PostgreSQL"],
  },
];

export default function PortfolioSlider() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Meus Projetos</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 5000 }}
        spaceBetween={30}
        slidesPerView={1}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden">
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
                
                {/* Badges de tecnologias */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => {
                    const techInfo = techStack.find(t => t.name === tech);
                    return techInfo ? (
                      <div key={tech} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-sm">
                        <Image src={techInfo.img} alt={tech} width={20} height={20} />
                        {tech}
                      </div>
                    ) : null;
                  })}
                </div>

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
