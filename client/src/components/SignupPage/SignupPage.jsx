import React from 'react'
import AuthForm from '../AuthForm/AuthForm'

function SignupPage({setUser}) {
  return (
    <AuthForm type="signup" setUser={setUser} />
  )
}

export default SignupPage