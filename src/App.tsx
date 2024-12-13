import './App.css'
import { createSignal } from 'solid-js'
// @ts-expect-error Unable to infer type at the moment
import solidLogo from './assets/solid.svg'
import Day12 from "./Day12.tsx";

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <div class="App">App
<Day12 />
    </div>
  )
}

export default App
