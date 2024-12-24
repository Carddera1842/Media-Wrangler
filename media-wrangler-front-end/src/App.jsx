import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MovieCard from './components/MovieCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h3>Searched: Christmas Movies</h3>
      <MovieCard />
    </>
  )
}

export default App
