import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MovieDetailCard from './components/MovieDetailCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MovieDetailCard />
    </>
  )
}

export default App
