import Counter from "./Components/Counter";
import { getCounter } from "./actions/counter-action";

export default async function Home() {
  // Obtenemos el valor inicial del contador desde el servidor
  // y lo pasamos como prop al componente Counter para dar inicio
  const initialCount = await getCounter();

  return (
    <main>
      <Counter initialCount={initialCount} />
    </main>
  );
}