import { useState } from 'preact/hooks'

import './Counter.css'

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className='Counter'>
        <a href='/about'>About</a>
        <a href={`/counter/${count}`}>Counter ID</a>
        <p className='Counter__count'>{count}</p>
        <button onClick={() => setCount(count + 1)}>Increment by 1</button>
    </div>
  )
}
