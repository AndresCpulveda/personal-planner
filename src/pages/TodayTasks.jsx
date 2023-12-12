
import TodayDue from '../components/TodayDue'
import TodayCompleted from '../components/TodayCompleted'
import ProgressGraph from '../components/ProgressGraph'
import useTasks from '../hooks/useTasks'
import SavingSpinner from '../components/SavingSpinner'
import { AddTaskIcon } from '../components/icons/icons'
import DaySelector from '../components/DaySelector'
import { toggleAddingTask } from '../store/tasks/tasks.slice';
import { useDispatch } from 'react-redux';

function TodayTasks() {
  const dispatch = useDispatch()

  const {loadedTasks} = useTasks();

  return (
    <>
    <section className='w-2/3'>
      <DaySelector />
      <div className='mt-10 mb-2 flex gap-4 items-center'>
        <h2 className='uppercase text-gray-900 text-3xl font-bold'>today´s due tasks</h2>
        <AddTaskIcon iconOptions={{onClick: () => dispatch(toggleAddingTask())}} />
      </div>
      {loadedTasks ? <TodayDue /> : null}

      <div className='mt-10 mb-2'>
        <h2 className='uppercase text-gray-900 text-3xl font-bold'>today`s completed tasks</h2>
      </div>
      {loadedTasks ? <TodayCompleted /> : null}

    </section>
    {/* <section className='w-1/3 flex flex-col'>
      <ProgressGraph />
    </section> */}
    </>
  )
}

export default TodayTasks