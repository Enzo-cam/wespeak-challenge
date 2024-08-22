import Counter from "./Components/Counter";
import { getCounter } from "./actions/counter-action";

export default async function Home() {
  const initialCount = await getCounter();

  return (
    <main>
      <Counter initialCount={initialCount} />
    </main>
  );
}