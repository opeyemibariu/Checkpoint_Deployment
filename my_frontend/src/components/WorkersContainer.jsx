import WorkerCard from './WorkerCard'
import AddWorkerCard from './AddWorkerCard'

const WokersContainer = ({workers, setMonitor}) => {
  return (
    <>
      <h1 style={{textAlign: 'center', margin: '60px 0', fontSize: '3rem'}}>Your Workers</h1>
      { workers?.map(worker => <WorkerCard key={worker._id} worker={worker}/>) }
      <AddWorkerCard setMonitor={setMonitor}/>
    </>
  )
}

export default WokersContainer