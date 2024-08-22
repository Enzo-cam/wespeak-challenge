'use server'
import { updateCounter as updateCounterLogic, getCounter as getCounterLogic } from '../../../lib/counter-logic';

// Updatiamos el contador en la base de datos
export async function updateCounter(increment: number): Promise<number> {
  try {
    const newValue = await updateCounterLogic(increment);
    return newValue;
  } catch (error) {
    console.error('Error updateando el counter:', error);
    // En caso de que haya error, podríamos retornar un valor por defecto o lanzar un error
    return 0;
  }
}

// Obtenemos el valor del contador de la base de datos
export async function getCounter(): Promise<number> {
  try {
    const value = await getCounterLogic();
    return value;
  } catch (error) {
    console.error('Error getting counter:', error);
    // En caso de que haya error, podríamos retornar un valor por defecto o lanzar un error
    return 0;
  }
}