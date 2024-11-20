import React from 'react'
import AuthForm from '../AuthForm/AuthForm'

function SigninPage({setUser}) {
  return (
    <AuthForm type="signin" setUser={setUser} />
  )
}

export default SigninPage