import { useState } from 'preact/hooks'

import './Counter.css'

type CounterProps = {
  posts: { title: string, body: string }[]
}

export default function Counter({ posts }: CounterProps) {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div className='Counter'>
      <h1>{JSON.stringify(posts)}</h1>
      <div className='Counter__nav'>
        <a href='/about'>About</a>
      </div>
      <div className='Counter__control'>
        <p className='Counter__control__count'>{count}</p>
        <button className='Counter__control__btn' onClick={handleClick}>+</button>
      </div>
    </div>
  )
}
