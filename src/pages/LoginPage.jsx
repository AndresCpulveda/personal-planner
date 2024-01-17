import React, { useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { signInWithGooglePopup } from '../utils/firebase/firebase.utils'
import { auth } from '../utils/firebase/firebase.utils'
const LoginPage = () => {
  const navigate = useNavigate()

  const handleSignInWithGooglePopup = async() => {
    const user = await signInWithGooglePopup()
  }

  console.log(auth);

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //User is signed in // save to redux
        
        setTimeout(() => {
          navigate('/')//Se redirecciona a la pagina de admin
        }, 2000);
      } else {
        //User is signed out
      }
    })
  }, [])

  return (
    <>
      <button className='rounded border-2 text-blue-500 px-3 py-1 border-blue-500 font-bold' onClick={handleSignInWithGooglePopup}>Sign in With Google</button>
    </>
  )
}

export default LoginPage