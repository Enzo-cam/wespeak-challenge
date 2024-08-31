import { getCounter } from "./actions/counter-action";
import Counter from "./Components/Counter";

export default async function Home() {
  const { value } = await getCounter();

  return (
    <main>
      <Counter initialCount={value} />
    </main>
  );
}