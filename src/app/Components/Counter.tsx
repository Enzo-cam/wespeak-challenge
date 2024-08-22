
import React from 'react';
import { getCounter, updateCounter } from '../actions/counter-action';

const Counter = async () => {
  const initialCount = await getCounter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Counter: {initialCount}</h1>
      <div className="flex space-x-4">
        <form action={updateCounter.bind(null, 1)}>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Increment
          </button>
        </form>
        <form action={updateCounter.bind(null, -1)}>
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Decrement
          </button>
        </form>
      </div>
    </div>
  );
};

export default Counter;