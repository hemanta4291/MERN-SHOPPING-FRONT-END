import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { userLoggedOut } from '../features/auth/signInSlice';

const Header = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth);
  const {name,email} = user || {}
  const styleRender = user ? "justify-between" : "justify-center"

  const logOut = () =>{
    dispatch(userLoggedOut())
    // history.replace("/")
  }
    
  return (
    <div className='container mx-auto'>
      <div className={`${styleRender} flex gap-4 border items-center rounded bg-gray-50 p-6 mt-12`}>
        {
          user && 
          <div>
            <img className='w-14 h-14 mb-4' src='https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png' />
            <h2 className='text-sm'><span className='font-bold mr-2'>Name : </span> {name}</h2>
            <h3 className='text-sm'><span className='font-bold mr-2'>Email : </span> {email}</h3>
          </div>
        }
        {!user && 
          <>
          <Link to="/sign-in" className='bg-green-100 rounded-3xl py-2 px-6 text-base font-bold border-2'>
            Sign In
          </Link>
          <Link to="sign-up" className='bg-green-100 rounded-3xl py-2 px-6 text-base font-bold border-2'>
            Sign Up
          </Link>
          </>
        }
        {
          user && 
          <button onClick={logOut} className='bg-green-100 rounded-3xl py-2 px-6 text-base font-bold border-2'>
            Sign Out
          </button>
        }
       

      </div>
    </div>
  )
}

export default Header