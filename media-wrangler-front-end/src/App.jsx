import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReviewForm from './components/ReviewForm'
import BasicReviewForm from './components/BasicReviewForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ReviewForm />
      <br />
      <br />
      <br />
      <BasicReviewForm  />
    </>
  )
}

export default App
