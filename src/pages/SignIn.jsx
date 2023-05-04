import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import {useFormik} from "formik"
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import { signIn } from '../features/auth/signInSlice';


const signInSchema = yup.object({
  email:yup.string().email("Email should be valid").required("Email is Required"),
  password:yup.string().min(6).max(31).required("Password is Required")
})


const SignIn = () => {
  const dispatch = useDispatch()
    const { isLoading} = useSelector((state) => state.auth);

    const formik = useFormik({
      initialValues:{
        email:'',
        password:'',
      },
      validationSchema:signInSchema,
      onSubmit:(values)=>{
        const {email, password } = values
        dispatch(signIn({ email, password }))
      }
    })


    
  
  return (
      <div className='container w-4/12 mx-auto  h-full mt-24 border-2 pt-3 rounded-md border-gray-100'>
          <h2 className='text-center text-3xl '>Login</h2>
          <form onSubmit={formik.handleSubmit} className='relative m-10'>
            <input 
              value={formik.values.email} 
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              type="email" className='w-full border-solid border-2 my-4 rounded border-gray-300 p-2 pr-20' 
              placeholder='Email'
            />
            <div className='text-red-600'>
             {formik.touched.email && formik.errors.email}
            </div>
            <input 
              value={formik.values.password} 
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              type="password" 
              className='w-full border-solid border-2 my-4 rounded border-gray-300 p-2 pr-20'
              placeholder='Password'
             />
              <div className='text-red-600'>
              {formik.touched.password && formik.errors.password}
            </div>
            <div className='flex justify-center flex-col items-center mt-4'>
              <button disabled={isLoading} className=' relative bg-green-700 text-white p-3 w-2/4 rounded' type='submit'>
                {isLoading && 
                    <img className='absolute w-7' src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif' width={"40ox"} />
                }
                Sign In</button>
              <Link to="/sign-up" className='block mt-3'>Or Create Account</Link>
              </div>
          </form>
      </div>
    
  )
}

export default SignIn