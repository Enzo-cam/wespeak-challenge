'use client'
import React, { useState, useEffect } from 'react';
import { updateCounter, getCounter } from '../actions/counter-action';

const Counter = ({ initialCount = 0 }: { initialCount?: number }) => {
  const [count, setCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  // Obtenemos el valor del contador ni bien se monta el componente
  // para sincronizar el estado local con el valor del servidor
  // Hacemos un "polling" cada 30 segundos para mantener el valor actualizado
  // y limpiamos el intervalo cuando el componente se desmonta
  const fetchCounter = async () => {
    const { value } = await getCounter();
    setCount(value);
  };
  useEffect(() => {
    fetchCounter();
    // Actualizamos el contador cada 30 segundos
    const intervalId = setInterval(fetchCounter, 30000);
    // Limpiamos el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  // Actualización inmediata del estado local seteando el valor del contador
  // y sincronización con el valor del servidor
  // En caso de error, revertimos al valor anterior
  const handleIncrement = async (increment: number) => {
    setCount((prevCount) => prevCount + increment);
    
    setIsLoading(true);
    try {
      // Sincronizamos con el valor del servidor en caso de que haya alguna discrepancia
      const { value } = await updateCounter(increment);
      setCount(value);
    } catch (error) {
      // Si hay algun error volvemos al valor anterior
      console.error('Failed to update counter:', error);
      setCount((prevCount) => prevCount - increment);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Contador: {count}</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => handleIncrement(1)}
          className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 disabled:opacity-50"
          disabled={isLoading}
        >
          Incrementar
        </button>
        <button
          onClick={() => handleIncrement(-1)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          disabled={isLoading}
        >
          Decrementar
        </button>
      </div>
    </div>
  );
};

export default Counter;