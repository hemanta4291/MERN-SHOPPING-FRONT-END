import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import useAdmin from '../hooks/useAdmin';
import { deleteUserFetch, fetchUsers } from '../features/admin/adminSlice';
import { useNavigate,useLocation,useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserData = () => {
  const history = useNavigate();
 
  const location = useLocation()
  const dispatch = useDispatch()
    const {users,isLoading:userIsLoading,isError:userIsError} = useSelector((state) => state.admin);
    const isAdmin = useAdmin()

  useEffect(()=>{
    dispatch(fetchUsers())
    // if(isAdmin){
    //   dispatch(fetchUsers())
    // }
    
  },[isAdmin])



  const handleEditRowData = (e,data) =>{
    // console.log(location)
    history(`${location.pathname}/edit/${data._id}`);
  }


  const handleDeleteRowData = (e,data) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserFetch(data._id))
      }
    })
    
  }


  const userColumns = [
    {
      name: '#',
      cell: (row, index) => index + 1,
      maxWidth: "150px"

    },
    {
      
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      width: "250px"

    },
    {
      
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      width: "250px"

    },
    {
      
      name: 'Role',
      selector: row => row.role,
      sortable: true,
      width: "250px"

    },
    {
      name:"Action",
      cell: row => (
        <div className='flex gap-2'>
          <button onClick={(e)=>handleEditRowData(e,row)} className='rounded bg-gray-300 p-2'>Edit</button>
          <button onClick={(e)=>handleDeleteRowData(e,row)} className='rounded bg-red-800 p-2 text-gray-200'>Delete</button>
        </div>
      )
    }
  ]
  return (
    <>
    
    {
  
        users?.length > 0 &&

        <div className='mt-12'>
          <DataTable
            columns={userColumns}
            data={users}
            noDataComponent={<div>No data Found !</div>}
            pagination
            progressPending={userIsLoading}
            // progressComponent={<GlobalLoading imgSize="large" />}
                />
        </div>

     

      }
         </>
  )
}

export default UserData