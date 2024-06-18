import Counter from './Counter'

import './Home.css'

export default function Home() {
  return (
    <div className='Home'>
       <a href='/about'>About</a>
       <Counter/>
    </div>
  )
}
