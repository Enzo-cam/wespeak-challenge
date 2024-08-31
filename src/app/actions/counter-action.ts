'use server'
import {prisma} from '../../../lib/prisma'
import { revalidatePath } from 'next/cache'

// Funcion para actualizar el contador
// Actualizamos el valor del contador en la base de datos y revlaidamos el cache
// para que asiu los usuarios vean el valor más reciente del contador
export async function updateCounter(increment: number): Promise<{ value: number }> {
  let counter = await prisma.counter.findFirst();
  if (!counter) {
    counter = await prisma.counter.create({
      data: { 
        value: increment
      }
    });
  } else {
    counter = await prisma.counter.update({
      where: { id: counter.id },
      data: { 
        value: counter.value + increment
      },
    });
  }
  // console.log('Counter updateado:', counter.value);
  
  // Aseguramos la revalidez del cache con revalidePath, garantizando que los usuarios vean el valor más reciente del contador
  revalidatePath('/');
  return { value: counter.value };
}

// Funcion para obtener el valor del contador desde la BDD
export async function getCounter(): Promise<{ value: number }> {
  const counter = await prisma.counter.findFirst();
  return {
    value: counter?.value ?? 0
  };
}