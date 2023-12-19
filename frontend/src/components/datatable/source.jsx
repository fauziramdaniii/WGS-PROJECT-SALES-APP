import { useEffect, useState } from 'react'
import useUserStore from '../../stores/user/AddUserStore'

const fetchUserData = async () => {
  const { getUser } = useUserStore()

  try {
    const response = await getUser()
    // console.log(response)
    const users = response.data

    const userColumns = [
      // Define your columns based on the structure of the data
      { field: 'No', headerName: 'No', width: 70 },
      // {
      //   field: 'user',
      //   headerName: 'User',
      //   width: 230,
      //   renderCell: params => {
      //     return (
      //       <div className='cellWithImg'>
      //         {/* Assuming you have an 'img' property in your user data */}
      //         <img className='cellImg' src={params.row.img} alt='avatar' />
      //         {params.row.username}
      //       </div>
      //     )
      //   }
      // },
      {
        field: 'email',
        headerName: 'Email',
        width: 230,
        justifyContent: 'center'
      },
      {
        field: 'fullname',
        headerName: 'Name',
        width: 150
      },
      {
        field: 'city',
        headerName: 'City',
        width: 150
      },
      // {
      //   field: 'status',
      //   headerName: 'Status',
      //   width: 160,
      //   renderCell: params => {
      //     return (
      //       <div className={`cellWithStatus ${params.row.status}`}>
      //         {params.row.status}
      //       </div>
      //     )
      //   }
      // },
      {
        field: 'roles',
        headerName: 'Role',
        width: 150
      }
    ]

    const userRows = users.map(user => ({ id: user.id, ...user }))
    console.log(userRows)
    return { userColumns, userRows }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error // Rethrow the error to be caught by the calling component
  }
}

export default fetchUserData
