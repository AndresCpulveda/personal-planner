import React, { useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { signInWithGooglePopup } from '../utils/firebase/firebase.utils'
import { auth } from '../utils/firebase/firebase.utils'
import { setUser } from '../store/user/user.slice'
const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignInWithGooglePopup = async() => {
    const user = await signInWithGooglePopup()
  }

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
          navigate('/')//Se redirecciona a la pagina de admin
        }, 2000);
      } else {
        //User is signed out
      }
    })
    return () => unsubscribe();
  }, [])

  return (
    <>
      <div className='h-screen flex items-center bg-green-100'>
        <div className="mx-auto w-full overflow-hidden rounded-lg bg-white shadow-2xl sm:max-w-sm">
          <div className="relative p-5">
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-secondary-900">Welcome to the Planner App</h3>
                <div className="mt-2 text-sm">
                  <p>Organize your tasks and optimize your time with this simple too.</p>
                  <p className='text-lg text-gray-700'>Start Now</p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={handleSignInWithGooglePopup}
              type="button"
              className="flex gap-2 w-full items-center justify-center rounded-lg border border-blue-500 bg-white px-5 py-2.5 text-center text-sm font-medium text-blue-500 shadow-sm transition-all hover:bg-blue-700 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-google-filled" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" strokeWidth={0} fill="currentColor" />
              </svg>
            Sign in With Google
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage