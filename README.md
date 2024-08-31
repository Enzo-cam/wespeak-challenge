# Proyecto Contador con Next.js, Prisma y PostgreSQL

App simple de contador construida con Next.js, utilizando Prisma ORM con una base de datos PostgreSQL. 

## Cambios Recientes
- Cambie la BDD  de SQLite a PostgreSQL para mejorar la escalabilidad y el rendimiento y a su vez usar el deploy que brinda Railway.
- Agregue una nueva ruta API para resetear el contador, pensada para ser utilizada con un cron job.

## Prerrequisitos
- Node.js (v14 o superior)
- npm o yarn
- PostgreSQL (instalado localmente o acceso a una instancia remota)

## Configuración
1. Clonar el repo:
   ```
   git clone https://github.com/tu-usuario/nombre-de-tu-repo.git
   cd nombre-de-tu-repo
   ```
2. Instala las dependencias:
   ```
   npm install
   ```
3. Configurar la base de datos:
   - Crea una nueva base de datos en PostgreSQL.
   - Copia el archivo `.env.example` a `.env` y actualiza la `DATABASE_URL` con tus credenciales de PostgreSQL.

4. Aplicar las migraciones:
   ```
   npx prisma migrate dev --name init
   ```
5. Iniciar el servidor de desarrollo:
   ```
   npm run dev
   ```
   o
   ```
   yarn dev
   ```

## API para Resetear el Contador
Implemente una nueva ruta API para resetear el contador, ruta a la cual le pegaré desde un cron job:

```
app/api/reset-counter/route.ts
```

La idea de esta ruta es resetear automáticamente el contador a intervalos regulares. El servicio que utilizo es cron-job.org

## Base de Datos
Este proyecto usa PostgreSQL como base de datos principal. Asegúrate de tener PostgreSQL instalado y configurado correctamente en tu entorno de desarrollo.
Si necesitas reiniciar la base de datos:
1. Dropea y recrea tu base de datos en PostgreSQL
2. Ejecuta `npx prisma migrate reset` para aplicar todas las migraciones y opcionalmente ejecutar scripts de semilla

## Despliegue
Este proyecto está configurado para ser desplegado en Vercel. Asegúrate de configurar las variables de entorno necesarias en tu dashboard de Vercel, incluyendo la `DATABASE_URL` que apunte a tu base de datos de producción PostgreSQL.
Para el reseteo automático del contador en producción, configura un cron job que haga una petición POST a la ruta `/api/reset-counter` de tu aplicación desplegada.

## Notas Adicionales
- La migración a PostgreSQL mejora la escalabilidad y el rendimiento de la aplicación, especialmente en entornos de producción.
- La implementación simplificada con `useState` proporciona un manejo de estado más directo y fácil de entender.
- La nueva ruta API para resetear el contador permite una fácil integración con servicios de cron job para mantenimiento automático.