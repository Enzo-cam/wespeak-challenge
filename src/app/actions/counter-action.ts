//SV-Action for the counter
'use server'
import {prisma} from '../../../lib/prisma'


// Actualizamos el contador en la base de datos y devolvemos el nuevo valor hacia el counter component
export async function updateCounter(increment: number): Promise<number> {
  let counter = await prisma.counter.findFirst();
  
  // En el caso de que no exista un contador, lo creamos con el valor de increment
  if (!counter) {
    counter = await prisma.counter.create({ data: { value: increment } });
  } else {
    // En el caso de que exista, vamos a ir actualizando el contador
    counter = await prisma.counter.update({
      where: { id: counter.id },
      data: { value: { increment: increment } },
    });
  }
  return counter.value;
}

// Obtenemos el valor del contador desde la base de datos
export async function getCounter(): Promise<number> {
  const counter = await prisma.counter.findFirst();
  const value = counter?.value ?? 0;
  return value;
}