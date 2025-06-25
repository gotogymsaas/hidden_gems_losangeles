import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Hidden Gems LA</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setCount(count + 1)}>
        count is {count}
      </button>
    </div>
  )
}

export default App
