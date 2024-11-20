import React from 'react'
import AuthForm from "../../block/AuthForm/AuthForm"

function SignupPage({setUser}) {
  return (
    <AuthForm type="signup" setUser={setUser} />
  )
}

export default SignupPage