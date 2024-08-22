'use client'

import React, {useState, useOptimistic} from 'react';
import { updateCounter } from '../actions/counter-action';

const Counter =  ({initialCount}: {initialCount: number} ) => {
  const [count, setCount] = useState(initialCount);
  const [optimisticCount, setOptimisticCount] = useOptimistic(count);


 const updateCount = async (increment: number) => {
    setOptimisticCount(optimisticCount + increment);
    const newCount = await updateCounter(increment);
    setCount(newCount);
    setOptimisticCount(newCount);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Counter: {optimisticCount}</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => updateCount(1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <button
          onClick={() => updateCount(-1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;