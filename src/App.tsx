import "./App.css";
import { createSignal, Show, Suspense } from "solid-js";
// @ts-expect-error Unable to infer type at the moment
import solidLogo from "./assets/solid.svg";
import { Day12 } from "./Day12.tsx";
import { fileToMatrix } from "./helpers.ts";
import { createResource } from "solid-js";

const fetchMatrix = async (filename: number) => await fileToMatrix(filename);

function App() {
  const [day, dayset] = createSignal(12);
  const [matrix] = createResource(day, fetchMatrix);

  return (
    <div class="App">
      <Show when={matrix()}>{value => <Day12 data={value()} />}</Show>
    </div>
  );
}

export default App;
