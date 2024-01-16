import React from 'react'
import { signInWithGooglePopup } from '../utils/firebase/firebase.utils'

const LoginPage = () => {

  const handleSignInWithGooglePopup = async() => {
    const user = await signInWithGooglePopup()
    console.log(user);
  }

  return (
    <>
      <button className='rounded border-2 text-blue-500 px-3 py-1 border-blue-500 font-bold' onClick={handleSignInWithGooglePopup}>Sign in With Google</button>
    </>
  )
}

export default LoginPage