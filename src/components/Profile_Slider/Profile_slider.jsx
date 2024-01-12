import { Drawer } from '@mui/material'
import React from 'react'

import './Profile_slider.css'

import Profile_comp from './Profile_comp'
import { useSelector } from 'react-redux'



const Profile_slider = () => {


    const profilestate = useSelector( (state)=> state.profile )


  return (
    <Drawer className='pfs' variant='persistent' open = { profilestate.profile_slider.isopen  } anchor={"right"}> 
               
    <div className='pfs1 flex-row-center'>

          < Profile_comp  />

    </div>

 </Drawer>
  )
}

export default Profile_slider