import { Outlet, NavLink, useNavigate} from 'react-router-dom'
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase/firebase.utils'
import { setUser } from '../store/user/user.slice'
import { useDispatch } from 'react-redux'

function MainLayout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const activeStyle = 'block p-4 bg-white border-b-2 border-gray-800 font-semibold'

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(authUser) => {
      if (authUser) {
        dispatch(setUser(authUser))
        const firebaseIdToken = await authUser.getIdToken();
        const res = await fetch('http://localhost:3000/api/users/sign-google-user', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${firebaseIdToken}`,
            "Contant-Type": 'application/json',
          },
          body: JSON.stringify(authUser)
        })

        const data = await res.json()
        console.log(data);
        setTimeout(() => {
          navigate('/dashboard')//Se redirecciona a la pagina de admin
        }, 2000);
      } else {
        //User is signed out
      }
    })
    return () => unsubscribe();
  }, [])

  return (
    <>
      <header className='flex bg-slate-100'>
        <nav>          
          <ul className='flex'>
            <li className='text-gray-800'>
              <NavLink
                to='/'
                className={({ isActive, isPending }) => isActive ? activeStyle : "block p-4 font-semibold" }>Todays Tasks
              </NavLink>
            </li>
            <li className='text-gray-800'>
              <NavLink
                to={'/tasks'}
                className={({ isActive, isPending }) => isActive ? activeStyle : "block p-4 font-semibold"}>All Tasks
              </NavLink>
            </li>
            <li className='text-gray-800'>
              <NavLink
                to={'/reports'}
                className={({ isActive, isPending }) => isActive ? activeStyle : "block p-4 font-semibold"}>Reports
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout