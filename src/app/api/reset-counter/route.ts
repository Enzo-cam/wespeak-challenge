import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST() {
  try {
    await prisma.counter.updateMany({
      data: { value: 0 },
    });

     // Revalidaremos la página principal para que se actualice el valor del counter
     revalidatePath('/');
    return NextResponse.json({ message: 'Counter reseteado a 0.' }, { status: 200 });
  } catch (error) {
    console.error('Fallo en reset counter:', error);
    return NextResponse.json({ error: 'Hubo un error al setear el counter' }, { status: 500 });
  }
}