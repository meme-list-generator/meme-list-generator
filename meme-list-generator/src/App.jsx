import { useState } from 'react'
import Meme from "./components/Meme"
import Header from './components/Header'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Meme />
    </div>
  )
}
export default App
