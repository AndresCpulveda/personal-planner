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
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser))
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
      <button className='rounded border-2 text-blue-500 px-3 py-1 border-blue-500 font-bold' onClick={handleSignInWithGooglePopup}>Sign in With Google</button>
    </>
  )
}

export default LoginPage