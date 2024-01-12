import React from 'react'
import './Welcome.css'

import welcomeimg from './welcome.png'

import { useSelector } from 'react-redux'

const Welcome = () => {



const myinfo = useSelector((state)=> state.myinfo)



  return (
    <div className='welcomepage flex-row-center'>
         <div className='wcp1 flex-row-center'>


             Welcome to Translatex.com

          


                
         </div>
    </div>

  
  )
}

export default Welcome