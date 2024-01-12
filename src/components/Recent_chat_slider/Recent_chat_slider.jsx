import React from 'react'
import './Recent_chat_slider.css'
import { Drawer } from '@mui/material'

import Recent_chat_component from './Recent_chat_component'
import { useSelector  } from 'react-redux'




const Recent_chat_Slider = () => {

 

  const sliderstate = useSelector((state)=> state.sidebar)
 

  

  


  return (
            <Drawer className='drawerparent' variant='persistent' open = { sliderstate.sidebar.isopen  }> 
               
               <div className='dp1 flex-row-center'>
           
                     <Recent_chat_component/>

                   

               </div>

            </Drawer>
  )
}

export default Recent_chat_Slider