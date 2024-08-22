// app/lib/counter-logic.ts
'use server'

import { prisma } from './prisma'

const RESET_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Obtenemos el counter de la base de datos o lo creamos si no existe
async function getOrCreateCounter() {
  try {
    let counter = await prisma.counter.findFirst();
    if (!counter) {
      counter = await prisma.counter.create({
        data: { value: 0, lastUpdated: new Date() }
      });
    }
    return counter;
  } catch (error) {
    console.error('Error al obtener el counter:', error);
    throw error;
  }
}

// Chequeamos si debemos resetear el contador o no comparando la última actualización con el intervalo de reseteo
function shouldResetCounter(lastUpdated: Date | null): boolean {
  if (!lastUpdated) return true;
  const now = new Date();
  return now.getTime() - lastUpdated.getTime() > RESET_INTERVAL;
}

// updateamos el contador en la base de datos
// En caso de que el contador deba ser reseteado, lo reseteamos a 0
// En caso contrario, incrementamos el contador
export async function updateCounter(increment: number): Promise<number> {
  try {
    const counter = await getOrCreateCounter();
    
    // Chequeamos si debemos resetear el contador
    // En caso de que debamos resetearlo, lo reseteamos a 0 y actualizamos la fecha de la última actualización
    if (shouldResetCounter(counter.lastUpdated)) {
      const resetCounter = await prisma.counter.update({
        where: { id: counter.id },
        data: { value: 0, lastUpdated: new Date() }
      });
      return 0;
    } else {
      // En caso contrario, incrementamos el contador y actualizamos la fecha de la última actualización
      const updatedCounter = await prisma.counter.update({
        where: { id: counter.id },
        data: { 
          value: { increment: increment },
          lastUpdated: new Date()
        }
      });
      return updatedCounter.value;
    }
  } catch (error) {
    console.error('error al querer updatear', error);
    throw error;
  }
}

export async function getCounter(): Promise<number> {
  try {
    const counter = await getOrCreateCounter();
    
    if (shouldResetCounter(counter.lastUpdated)) {
      const resetCounter = await prisma.counter.update({
        where: { id: counter.id },
        data: { value: 0, lastUpdated: new Date() }
      });
      console.log('Counter forzado a 0');
      return 0;
    }
    
    return counter.value;
  } catch (error) {
    console.error('Error en traer el counter:', error);
    throw error;
  }
}