import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createItemBySingleUser, deleteItemBySingleUser, getIFetchtemBySingleUser, updateItemBySingleUser } from '../features/item/itemSlice';
import useAuth from '../hooks/useAuth';
import { getData } from '../utils/localStorageConfig';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';


const ModalWrapper = styled.div`
  position: fixed;
  top:0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.5);
`

const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    width:100%;
    max-Width:500px;
    padding:20px 0;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 6px;

`


const UserDashboard = () => {
  const dispatch = useDispatch()
  const isLogin = useAuth()
  const [modalIsOpen, setIsOpen] =useState(false);
  const [name,setName] = useState('')
  const [nameEdit,setNameEdit] = useState('')
  const [edit,setEdit] = useState(null)
  const { isModal, isLoading,isError,error,items:data,message} = useSelector((state) => state.userItems);
 
  

  const openModal = () => {
    setIsOpen(true);
    
  }

  const closeModal = () => {
    setIsOpen(false);
    setEdit(null)
  }


  useEffect(()=>{
    if(isLogin){
      dispatch(getIFetchtemBySingleUser())
    }
   
  },[isLogin])

  
  // edit item
  const handleEditRowData = (e,data) =>{
    setIsOpen(true)
    setEdit(data._id)
    setNameEdit(data.name)
  }


  // add item
  const addItemHandler = (e) => {
    e.preventDefault()
    dispatch(createItemBySingleUser({name}))
    if(!isModal) setIsOpen(false);
  }


  // update item
  const updateItemHandler = (e) =>{
    e.preventDefault()
    dispatch(updateItemBySingleUser({id:edit,name:nameEdit}))
    if(!isModal) setIsOpen(false);
  }

  // delete item
  const handleDeleteRowData = (e,data) =>{
    dispatch(deleteItemBySingleUser(data._id))
  }
  
  

  const columns = [
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
    <div className='container mx-auto'>
          <div className='flex justify-between mt-6 mb-6' >
            <h2 className='text-2xl font-bold'>All Items</h2>
            <input className='border rounded-3xl py-3 px-6 w-4/12' placeholder='search' />
            <button onClick={openModal} type='button' className='bg-green-600 text-white rounded-3xl py-2 px-6 text-base font-bold border-2'>
            Add Product
          </button>
          </div>

          {!isLoading && data.length>0 && 
          <DataTable
          columns={columns}
          data={data}
          // noDataComponent={fetchError && <GlobalError errorText={fetchError} />}
          pagination
          // progressPending={isLoading}
          // progressComponent={<GlobalLoading imgSize="large" />}
        />}


    </div>
    <ModalWrapper className={`${modalIsOpen ? '' : 'hidden'}`}>
        <ModalContainer>
          <form onSubmit={edit ? updateItemHandler : addItemHandler}>
          <div className='flex justify-between mb-10 border-b pb-6 px-5'>
            <h2>{edit ? "Edit" : "Add"} Item</h2>
            <button className='bg-red-700 w-7 h-7  rounded-full flex justify-center items-center text-white pointer' type='button' onClick={closeModal}>X</button>
          </div>
            
            <div className='px-5' style={{height:"calc(400px - 200px)"}}>
            <input autoFocus onChange={(e)=>edit ? setNameEdit(e.target.value) : setName(e.target.value)} value={edit ? nameEdit : name} className='border rounded-md py-3 px-6 w-full' placeholder='Title' />
            </div>
            <div className='flex justify-between border-t pt-6  px-5'>
            <button type="button" className='bg-red-700 rounded-md text-white px-4 py-2' onClick={closeModal}>Close</button>
            <button  className='bg-green-600 rounded-md text-white px-4 py-2' type='submit'>{edit ? "Update" : "Add"}</button>
            </div>
          </form>
        </ModalContainer>
      </ModalWrapper>
    </>
  )
}

export default UserDashboard