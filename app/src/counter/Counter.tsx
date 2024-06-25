import { useState } from 'preact/hooks'

import './Counter.css'

export default function Counter() {
  const [count, setCount] = useState(0);

  const serverFunction = () => {
    'use server';

    console.log('Hello from server')
  }
  
  const handleClick = () => {
    serverFunction()
    setCount(count + 1)
  }

  return (
    <div className='Counter'>
        <a href='/about'>About</a>
        <a href={`/counter/${count}`}>Counter ID</a>
        <p className='Counter__count'>{count}</p>
        <button onClick={handleClick}>Increment by 1</button>
    </div>
  )
}
