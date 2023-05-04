import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { signUp } from '../features/auth/signUpSlice'

const SignUp = () => {
  const dispatch = useDispatch()
  const { isLoading, isError, error, message } = useSelector((state) => state.signup);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const resetInput = () =>{
    setName('')
    setEmail('')
    setPassword('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signUp({ name, email, password,confirmPassword }))
     
  }

  useEffect(()=>{
    !isError && resetInput()
  },[isError])


  return (
    <div className='container w-4/12 mx-auto  h-full mt-24 border-2 pt-3 rounded-md border-gray-100'>
      <h2 className='text-center text-3xl '>Sign Up</h2>
      {/* {isLoading && <p>Loading.......</p>}
      {error && <p>{error}</p>}
      {message && <p>{message}</p>} */}
      <form onSubmit={handleSubmit} className='relative m-10 text-center'>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='w-full border-solid border-2 mb-6 rounded border-gray-300 p-2 pr-20' placeholder='Name' />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='w-full border-solid border-2 mb-6 rounded border-gray-300 p-2 pr-20' placeholder='Email' />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='w-full border-solid border-2 mb-6 rounded border-gray-300 p-2 pr-20' placeholder='Password' />
        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className='w-full border-solid border-2 mb-6 rounded border-gray-300 p-2 pr-20' placeholder='Password' />
        <button disabled={isLoading} className='relative bg-green-700 text-white p-3 w-2/4 rounded' type='submit'>
          {isLoading && 
          <img className='absolute w-7' src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif' width={"40ox"} />
          }
          Sign Up
          </button>
        <Link to="/sign-in" className='block mt-3'>Or Sign In</Link>
      </form>
    </div>
  )
}

export default SignUp