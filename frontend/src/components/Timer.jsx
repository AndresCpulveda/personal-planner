import {useRef, useState} from 'react'

function Timer() {

  const [timerActive, setTimerActive] = useState(false)
  const [timerPaused, setTimerPaused] = useState(true)
  const [timer, setTimer] = useState(0)

  const timeRef = useRef(null)

  const handleStart = () => {
    setTimerActive(true)
    setTimerPaused(false)
    timeRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handlePause = () => {
    setTimerActive(false)
    setTimerPaused(true)
    clearInterval(timeRef.current)
  }

  const handleReset = () => {
    setTimerActive(false)
    setTimerPaused(true)
    clearInterval(timeRef.current)
    setTimer(0)
  }
  const minutes = `0${Math.floor(timer / 60)}`
  const seconds = `0${timer % 60}`.slice(-2)

  return (
    <>
      <div className='flex gap-2'>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <p>{`${minutes}.${seconds}`}</p>
        {timerPaused ? 
          <span onClick={() => handleStart()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:scale-110 transition-all">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
          </span>
        :
          <span onClick={() => handlePause()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:scale-110 transition-all">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
          </span>
        }
        <span onClick={() => handleReset()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${timerActive ? 'invisible' : 'visible'} hover:scale-110 transition-all cursor-pointer`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </span>
      </div>
    </>
  )
}

export default Timer