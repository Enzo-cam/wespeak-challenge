'use client'
import React, { useState } from 'react';
import { useOptimistic } from 'react';
import { updateCounter } from '../actions/counter-action';

const Counter = ({ initialCount }: { initialCount: number }) => {
  const [count, setCount] = useState(initialCount);
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (state, newCount: number) => newCount
  );

  const handleIncrement = async (increment: number) => {
    const newCount = count + increment;
    addOptimisticCount(newCount);
    setCount(newCount);
    
    try {
      // Hacemos el intento de actualizar el contador en el servidor y obtenemos el nuevo valor para mostrarlo
      const serverCount = await updateCounter(increment);
      setCount(serverCount);
      addOptimisticCount(serverCount);
    } catch (error) {
      // En caso de error, revertiremos el cambio 
      setCount(count);
      addOptimisticCount(count);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Contador: {optimisticCount}</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => handleIncrement(1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Incrementar en 1
        </button>
        <button
          onClick={() => handleIncrement(-1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrementar por 1
        </button>
      </div>
    </div>
  );
};

export default Counter;