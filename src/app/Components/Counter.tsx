'use client'
import React, { useState, useEffect } from 'react';
import { useOptimistic } from 'react';
import { updateCounter, getCounter } from '../actions/counter-action';

const Counter = ({ initialCount }: { initialCount: number }) => {
  const [count, setCount] = useState(initialCount);
  // Seteamos el useOptimistic
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (state, newCount: number) => newCount
  );

  // Chequeamos nuestro contador cada 10 segundos
  // En caso de que el servidor haya cambiado el valor del contador, lo actualizamos
  useEffect(() => {
    const checkCounter = async () => {
      const serverCount = await getCounter();
      setCount(serverCount);
      addOptimisticCount(serverCount);
    };
    // Chequeamos el contador al inicio
    checkCounter();
    const interval = setInterval(checkCounter, 10000);
    return () => clearInterval(interval);
  }, []);

  // Incrementamos el contador y actualizamos el valor en el servidor
  // En caso de error, revertimos el valor del contador
  const handleIncrement = async (increment: number) => {
    const newCount = count + increment;
    addOptimisticCount(newCount);
    setCount(newCount);
    
    try {
      // Actualizamos el contador en el servidor y obtenemos el nuevo valor
      const serverCount = await updateCounter(increment);
      setCount(serverCount);
      addOptimisticCount(serverCount);
    } catch (error) {
      // En caso de q falle la actualización, revertimos el valor del contador al que estaba anteriormente
      setCount(count);
      addOptimisticCount(count);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Counter: {optimisticCount}</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => handleIncrement(1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <button
          onClick={() => handleIncrement(-1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;