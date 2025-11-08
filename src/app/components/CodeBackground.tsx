'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface CodeBackgroundProps {
  code?: string
  speed?: number // pixels por segundo
  opacity?: number
  fontSize?: string
}

/**
 * Fundo animado com código TypeScript rolando — ideal para seções Hero.
 */
const CodeBackground: React.FC<CodeBackgroundProps> = ({
  code = `// Exemplo TypeScript
interface Dev {
  name: string
  skills: string[]
}

const dev: Dev = {
  name: 'José Santan de Jesus',
  skills: ['Next.js', 'TypeScript', 'Tailwind', 'Node.js']
}

export function hello() {
  console.log('Olá, mundo!')
}
`,
  speed = 40,
  opacity = 0.08,
  fontSize = 'text-sm',
}) => {
  // Duração do loop com base na velocidade
  const duration = Math.max(20, Math.round(2000 / Math.max(1, speed)))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      {/* camada escura para contraste */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,${
            opacity * 0.5
          }) 50%, rgba(0,0,0,${opacity}) 100%)`,
        }}
      />

      {/* Código rolando */}
      <motion.div
        className="absolute w-full whitespace-pre text-blue-400/80 font-mono"
        animate={{ y: ['0%', '-50%'] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          lineHeight: '1.4rem',
          fontSize: '0.75rem',
          opacity: 0.7,
        }}
      >
        {Array(20)
          .fill(code)
          .join('\n\n')}
      </motion.div>
    </div>
  )
}

export default CodeBackground
