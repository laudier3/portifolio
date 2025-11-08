'use client'

import React, { useEffect, useState } from 'react'

interface CodeTypingBackgroundProps {
  code?: string
  typingSpeed?: number
  fontSize?: string
}

export default function CodeTypingBackground({
    code = `// Exemplo TypeScript - Login simples
    interface User {
      email: string;
      password: string;
    }
    
    const users: User[] = [
      { email: 'jose@email.com', password: '123456' },
      { email: 'admin@email.com', password: 'admin123' },
    ];
    
    export function login(email: string, password: string): boolean {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        console.log(\`Bem-vindo, \${user.email}\`);
        return true;
      }
      console.log('Email ou senha inválidos');
      return false;
    }
    
    // Teste rápido
    login('jose@email.com', '123456'); // ✅ Bem-vindo, jose@email.com
    login('teste@email.com', 'abc');   // ❌ Email ou senha inválidos`
    ,
  typingSpeed = 15, // mais rápido
  fontSize = 'text-base', // maior para aparecer mais
}: CodeTypingBackgroundProps) {
  const [displayedCode, setDisplayedCode] = useState('')

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayedCode(code.slice(0, i))
      i++
      if (i > code.length) i = 0
    }, typingSpeed)
    return () => clearInterval(interval)
  }, [code, typingSpeed])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 flex justify-rigth items-rigth">
      <pre
        className={`font-mono ${fontSize} text-green-400 leading-6 whitespace-pre-wrap text-rigth max-w-4xl text-xs`}
        style={{
          opacity: 0.8, // Muito mais visível
          textShadow: `
            0 0 2pxrgb(11, 236, 30),
            0 0 4pxrgb(11, 236, 30),
            0 0 8pxrgb(7, 238, 38),
            0 0 12pxrgb(9, 245, 60)
          `,
          lineHeight: '1em',
        }}
      >
        {displayedCode}
      </pre>

      {/* Gradiente leve atrás para contraste */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"
      />
    </div>
  )
}
