import { useNavigate } from "react-router-dom";
import * as yup from 'yup'
import {useFormik} from "formik"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { signUp } from '../features/auth/signUpSlice'
import { useEffect } from "react";



// sign up schema 

const signUpSchema = yup.object({
  name:yup.string().min(6).max(31).required("Name is Required"),
  email:yup.string().email("Email should be valid").required("Email is Required"),
  password:yup.string().min(6).max(31).required("Password is Required"),
  confirmPassword:yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
})




const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, isError, error, message ,navigateUrl } = useSelector((state) => state.signup);

  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      confirmPassword:''
    },
    validationSchema:signUpSchema,
    onSubmit:(values)=>{
      const {name, email, password,confirmPassword } = values
      dispatch(signUp({ name, email, password,confirmPassword }))
    }
  })


  useEffect(()=>{
    navigateUrl ? navigate("/sign-in") : ''
  },[navigateUrl])


  return (
    <div className='container w-4/12 mx-auto  h-full mt-24 border-2 pt-3 rounded-md border-gray-100'>
      <h2 className='text-center text-3xl '>Sign Up</h2>
      <form onSubmit={formik.handleSubmit} className='relative m-10'>
        <input 
          value={formik.values.name} 
          onChange={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          type="text" 
          className='w-full border-solid border-2 my-4 rounded border-gray-300 p-2 pr-20' 
          placeholder='Name'
          />

          <div className='text-red-600'>
            {formik.touched.name && formik.errors.name}
          </div>

        <input 
           value={formik.values.email} 
           onChange={formik.handleChange("email")}
           onBlur={formik.handleBlur("email")}
          type="email" 
          className='w-full border-solid border-2 my-4 rounded border-gray-300 p-2 pr-20'
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
        <input
           value={formik.values.confirmPassword} 
           onChange={formik.handleChange("confirmPassword")}
           onBlur={formik.handleBlur("confirmPassword")}
          type="password" 
          className='w-full border-solid border-2 my-4 rounded border-gray-300 p-2 pr-20' 
          placeholder='Password'
          />
          <div className='text-red-600'>
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </div>
        <div className='flex justify-center flex-col items-center mt-4'>
          <button disabled={isLoading} className='relative bg-green-700 text-white p-3 w-2/4 rounded' type='submit'>
            {isLoading && 
            <img className='absolute w-7' src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif' width={"40ox"} />
            }
            Sign Up
            </button>
          <Link to="/sign-in" className='block mt-3'>Or Sign In</Link>
          </div>
      </form>
    </div>
  )
}

export default SignUp