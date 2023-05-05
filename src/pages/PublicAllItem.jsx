import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicItem } from '../features/publicItems/publicItemAPI';
import { getIFetchtems } from '../features/publicItems/publicItemSlice';

const PublicAllItem = () => {
  const dispatch = useDispatch()
  const [search,setSearch] = useState("")
  const { isLoading,isError,error,items:data} = useSelector((state) => state.publicItems);

  useEffect(()=>{
    dispatch(getIFetchtems({search}))
  },[])


  const searchHandler = (e) =>{
    console.log(e.target.value)
    setSearch(e.target.value)
    dispatch(getIFetchtems({search:e.target.value}))
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
  ];


  return (
    <div className='container mx-auto'>
          <div className='flex justify-between mt-6 mb-6' >
            <h2 className='text-2xl font-bold'>All Items</h2>
            <input  value={search} onChange={(e)=>searchHandler(e)} className='border rounded-3xl py-3 px-6' placeholder='search' />
          </div>

          {/* data table */}
      
          <DataTable
          columns={columns}
          data={data}
          noDataComponent={<div>No data Found !</div>}
          pagination
          progressPending={isLoading}
        />

      


    </div>
  )
}

export default PublicAllItem