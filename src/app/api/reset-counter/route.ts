import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  
   // Verificar la autenticación del CronSecret(es lo que recomienda vercel)
   const authHeader = request.headers.get('authorization');
   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }
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

// Manejar solicitudes OPTIONS para CORS si es necesario
export async function OPTIONS(request: Request) {
  return NextResponse.json({}, { status: 200 });
}