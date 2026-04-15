import WorkersContainer from './components/WorkersContainer'
import WorkerPage from './components/WorkerPage'
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {
  const [workers, setWorkers] = useState([])
  const [monitor, setMonitor] = useState(false)
  useEffect(() => {
    fetch('/api/workers').then(data => data.json()).then(data2 => setWorkers(data2))
  },[monitor])

  const handleDel = (id, setMonitor, setDel) => {
    const option = confirm("This worker profile will be deleted from the collection !!!")
    if (option) {
      fetch(`/api/workers/${id}`, { method: 'DELETE' }).then(data => data.json()).then(() => {
        setMonitor(prev => !prev)
        setDel(prev => !prev)
    })
    }
  }

  return (
    <>
      <Routes>
        <Route path='/' element={ <WorkersContainer  workers={workers} setMonitor={setMonitor} /> } />
        <Route path='/:id' element={ <WorkerPage setMonitor={setMonitor} handleDel={handleDel} /> } />
      </Routes>
    </>
  )
}

export default App
