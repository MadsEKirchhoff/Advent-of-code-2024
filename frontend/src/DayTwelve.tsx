import { createSignal } from 'solid-js'

function DayTwelve() {
  const [count, setCount] = createSignal(0)
  const {result} = day12b()

  return (
    <div>
      <h1>result</h1>
    </div>
  )
}

export default DayTwelve
