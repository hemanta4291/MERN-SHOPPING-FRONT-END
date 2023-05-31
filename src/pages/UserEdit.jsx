import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate,useNavigate, useParams } from 'react-router-dom'
import { fetchSingleUser } from '../features/admin/singleUserSlice'
import useAdmin from '../hooks/useAdmin'
import { updateUserFetch } from '../features/admin/adminSlice'

const UserEdit = () => {
  const isAdmin = useAdmin()
  const history = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { user, isLoading, isError } = useSelector((state) => state.editUser);
  const {message} = useSelector((state) => state.admin);
  const { email, name, role } = user || {}

  const [userName,setUserName] = useState("")
  const [userEmail,setUserEmail] = useState("")
  const [userRole,setUserRole] = useState("")



  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id))
      
    }
   
  }, [id])

  useEffect(()=>{
    setUserName(name)
      setUserEmail(email)
      setUserRole(role)
  },[user])


  useEffect(()=>{
    if(message){
       history('/user-dashboard')
    }
  },[message])


  const updateForm = (e) =>{
    e.preventDefault()
    dispatch(updateUserFetch({name:userName,role:userRole,id}))
    console.log({userName,userEmail,userRole})
  }

  return isAdmin ? (
    <div className='container mx-auto mt-4'>

      <Link to="/user-dashboard" className='bg-green-100 rounded-3xl py-2 px-6 text-base font-bold border-2'>Back</Link>

      {
        user &&

        <form className='mt-4' onSubmit={updateForm}>
          <label>Name</label>
          <input
            value={userName}
            type="text" className='w-full border-solid border-2 my-4 rounded border-gray-300 p-2 pr-20'
            onChange={(e)=>setUserName(e.target.value)}
          />
          <label>Email</label>
          <input
            value={userEmail}
            onChange={(e)=>setUserEmail(e.target.value)}
            type="email" className='w-full border-solid border-2 my-4 rounded border-gray-300 p-2 pr-20'
          />

          <label>Role</label>
          <div>
          <select  onChange={(e)=>setUserRole(e.target.value)} value={userRole} className='w-full py-3 mt-1'>
            <option value="admin">Admin</option>
            <option value='user'>User</option>
          </select>
          </div>
          {/* <input
            value={userRole}
            type="text" className='w-full border-solid border-2 my-4 rounded border-gray-300 p-2 pr-20'
            onChange={(e)=>setUserRole(e.target.value)}
          /> */}


          <div className='flex justify-center flex-col items-center mt-4'>
            <button disabled={isLoading} className=' relative bg-green-700 text-white p-3 w-2/4 rounded' type='submit'>
              {isLoading &&
                <img className='absolute w-7' src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif' width={"40ox"} />
              }
              Update</button>
            {/* <Link to="/sign-up" className='block mt-3'>Update</Link> */}
          </div>

        </form>
      }

    </div>
  )

    : <Navigate to="/user-dashboard" />
}

export default UserEdit