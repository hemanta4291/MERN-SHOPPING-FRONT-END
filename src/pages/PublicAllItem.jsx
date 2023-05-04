import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicItem } from '../features/publicItems/publicItemAPI';
import { getIFetchtems } from '../features/publicItems/publicItemSlice';

const PublicAllItem = () => {
  const dispatch = useDispatch()
  const { isLoading,isError,error,items:data} = useSelector((state) => state.publicItems);

  useEffect(()=>{
    dispatch(getIFetchtems())
  },[])

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

    // {
    //   name: 'Email',
    //   selector: row => row.email,
    //   sortable: true,
    //   width: "300px",
    // },
  ];

  // const data = [
  //   {
  //     name:"hkr",
  //     email:"hkr@gmail.com"
  //   }
  // ]

  return (
    <div className='container mx-auto'>
          <div className='flex justify-between mt-6 mb-6' >
            <h2 className='text-2xl font-bold'>All Items</h2>
            <input className='border rounded-3xl py-3 px-6' placeholder='search' />
          </div>

          {/* data table */}
          {!isLoading && data.length>0 && 
          <DataTable
          columns={columns}
          data={data}
          // noDataComponent={fetchError && <GlobalError errorText={fetchError} />}
          pagination
          // progressPending={isLoading}
          // progressComponent={<GlobalLoading imgSize="large" />}
        />

      }


    </div>
  )
}

export default PublicAllItem