'use client'
import { useEffect, useState } from 'react';

export default function Example() {
  const [time, setTime] = useState<number | null>(null);
  
  useEffect(() => {
    setTime(Date.now());
  }, []);
  
  return <p>{time ?? 'Carregando...'}</p>;
}
