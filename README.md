# Proyecto Contador con Next.js, Prisma y SQLite

Este proyecto es una aplicación simple de contador construida con Next.js, utilizando Prisma ORM con una base de datos SQLite.

## Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn

## Configuración

1. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/nombre-de-tu-repo.git
   cd nombre-de-tu-repo
   ```

2. Instala las dependencias:
   ```
   npm install
   ```
   o
   ```
   yarn install
   ```

3. Configura la base de datos:
   ```
   npx prisma migrate dev --name init
   ```
   Este comando hará lo siguiente:
   - Crear un nuevo archivo de base de datos SQLite (si no existe)
   - Aplicar todas las migraciones, creando las tablas necesarias
   - Generar el Prisma Client

   Nota: Esto crea una nueva base de datos vacía. No contendrá ningún dato del entorno de desarrollo original.

4. (Opcional) Poblar la base de datos:
   Si tienes un script de semilla (seed), ejecútalo para poblar la base de datos con datos iniciales:
   ```
   npx prisma db seed
   ```

5. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```
   o
   ```
   yarn dev
   ```

6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Base de Datos

Este proyecto utiliza SQLite como base de datos. El archivo de la base de datos (`prisma/dev.db`) se crea localmente cuando ejecutas las migraciones y no se incluye en el repositorio.

Si necesitas reiniciar la base de datos:
1. Elimina el archivo `prisma/dev.db`
2. Ejecuta `npx prisma migrate reset` para aplicar todas las migraciones y opcionalmente ejecutar scripts de semilla

## Prisma Studio

Puedes usar Prisma Studio para ver y editar tu base de datos:

```
npx prisma studio
```

Esto abrirá una ventana del navegador donde podrás interactuar con tus datos.

## Despliegue

Al desplegar este proyecto, asegúrate de que tu entorno de alojamiento soporte SQLite o considera migrar a una solución de base de datos más robusta para uso en producción.

## Solución de Problemas Comunes

- Si encuentras errores relacionados con Prisma, intenta ejecutar `npx prisma generate` para asegurarte de que el cliente de Prisma esté actualizado.
- Si los cambios en la base de datos no se reflejan, prueba ejecutar `npx prisma migrate dev` para aplicar cualquier migración pendiente.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para sugerir cambios o mejoras.

## Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio de GitHub.