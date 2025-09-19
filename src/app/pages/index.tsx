import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Seu Nome - Portfólio</title>
        <meta name="description" content="Portfólio de desenvolvedor Fullstack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
        <section className="max-w-4xl text-center py-20">
          <h1 className="text-5xl font-bold mb-4">Olá, eu sou <span className="text-yellow-300">Seu Nome</span></h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Desenvolvedor Fullstack especializado em React, Node.js e TypeScript. Construindo aplicações modernas e performáticas.
          </p>
          <a
            href="#projects"
            className="inline-block px-6 py-3 bg-yellow-400 text-purple-900 font-semibold rounded shadow-lg hover:bg-yellow-300 transition"
          >
            Veja meus projetos
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
