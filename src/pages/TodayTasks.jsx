

import TodayDue from '../components/TodayDue'
import TodayCompleted from '../components/TodayCompleted'
import ProgressGraph from '../components/ProgressGraph'
import useTasks from '../hooks/useTasks'
import SavingSpinner from '../components/SavingSpinner'
import { AddTaskIcon } from '../components/icons'

function TodayTasks() {

  const {setAddingTodayTask, loadedTasks} = useTasks();

  return (
    <>
    <section className='w-2/3'>
      <div className='mt-10 mb-2 flex gap-4 items-center'>
        <h2 className='uppercase text-gray-900 text-3xl font-bold'>today´s due tasks</h2>
        <AddTaskIcon iconOptions={{onClick: () => setAddingTodayTask(true)}} />
      </div>
      {loadedTasks ? <TodayDue /> : null}

      <div className='mt-10 mb-2'>
        <h2 className='uppercase text-gray-900 text-3xl font-bold'>today`s completed tasks</h2>
      </div>
      {loadedTasks ? <TodayCompleted /> : null}

    </section>
    <section className='w-1/3 flex flex-col'>
      <ProgressGraph />
    </section>
    </>
  )
}

export default TodayTasks