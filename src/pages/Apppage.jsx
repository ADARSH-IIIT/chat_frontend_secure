import React, { useEffect, useState } from 'react'
import './Apppage.css'

import { IconButton } from '@mui/material'
import { CgProfile } from "react-icons/cg";
import { FaMoon } from "react-icons/fa";
// import { FiPlusCircle } from "react-icons/fi";
import { GiExitDoor } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
// import {FaPersonCircleCheck} from 'react-icons/fa6'
import Recent_chat_Slider from '../components/Recent_chat_slider/Recent_chat_slider';
import { useDispatch , useSelector } from 'react-redux';
import { SIDEBARclose , SIDEBARopen } from '../Redux/actionfunction/sidebar_action';
import { AiOutlineLogout } from "react-icons/ai";
import Profile_slider from '../components/Profile_Slider/Profile_slider';
import { PROFILEclose, PROFILEopen } from '../Redux/actionfunction/profile_action';
import Tooltip from '@mui/material/Tooltip';
import { searchingfalse } from '../Redux/actionfunction/searching_user_fun';
import { useNavigate } from 'react-router-dom';
import setmyinfo from '../Redux/actionfunction/myinfo_action';
import ReactLoading from 'react-loading';
import { IoIosInformationCircleOutline } from "react-icons/io";
import FrontEndSocket from '../SOCKET/frontend_socket';


import { logout_api, whoiam_api  , isloggedin_api, axiosinstance } from '../api_list';

const Apppage = ( {Child} ) => {



    const dispatch = useDispatch()
    const navigate = useNavigate()
  const {myinfo} = useSelector((state)=> state.myinfo)



    const [ loggedin , setloggedin ] = useState(false)
    const [loading , setloading] = useState(false)
    


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
   useEffect(()=>{

    /// fronted socket get connected to backend socket , when apppage components gets mounted in    
    FrontEndSocket.connect()
     



    isloggedin()
    whoami()



    // return disconnect_the_socket

   } , [])
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function disconnect_the_socket(){

  // frontend socket get disconnected when apppage component get unmounted
  FrontEndSocket.disconnect()
}



//////////////////////////////////////////////////////   onclick logout function ///////////////////////////////
async function loggedout(){

 try {

  
   setloading(true)
    const {data} = await axiosinstance.get( logout_api )
   setloading(false)
   

    if(data.error==false) { navigate("/signin") }
  
  } catch (error) {
  

  console.log("error at apppage frontend  at onclick logout function");

}

   }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   




////////////////////////////////////////////////////////////////////////////////////////
async function whoami(){

try {
  const {data} = await axiosinstance.get(  whoiam_api   )


  if(data.error==false){
    dispatch( setmyinfo(data.myinfo) )

} } catch (error) {

  console.log("error at app page front end at who am i function");  
}   

    }
/////////////////////////////////////////////////////////////////////////////////////////

    

///////////////////////////////////////////////////////////////////////////////////////////  
async function isloggedin(){
    try {
      setloading(true)
      const { data } = await axiosinstance.get( isloggedin_api  )

      console.log("data from isloggedin api " , data);
      setloading(false)
       if(data.loginerror==false) { setloggedin(true) }
       if(data.loginerror==true) { setloggedin( false ) }

     
      
    } catch (error) {

      console.log("error at front end app page at islogged function ");
      
    }
}



  return ( 
       loggedin ?    
             
               loading ?          
                  <div> <ReactLoading type={'bubbles'} color={"white"}/> </div>


                
                : 
                        <div className='apppage flex-row-center'>

                                <div className='apg1 flex-coloumn-center'>
                                        <div className='apg11 flex-row-center'>
                                            <div className='ap111 flex-row-center'> {myinfo.profile_pic ? <img src={myinfo.profile_pic} alt="404 not found" /> : <div>profile pic</div>} </div>
                                        </div>
                                        <div className='apg12 flex-coloumn-center'>
                                            <div className='apg12i flex-row-center'  onClick={()=>{dispatch(SIDEBARopen())}}><Tooltip title={"get recent chats"} arrow placement='right-end'><IconButton ><GiExitDoor className='icon' /></IconButton> </Tooltip > </div>
                                            <div className='apg12i flex-row-center'  onClick={()=>{dispatch(PROFILEopen())}}><Tooltip title="your profile" arrow placement='right-end'><IconButton    >< CgProfile  className='icon'/></IconButton> </Tooltip ></div>
                                            {/* <div className='apg12i flex-row-center'><Tooltip title="add a friend" arrow placement='right-end'><IconButton >< FiPlusCircle  className='icon'/></IconButton> </Tooltip ></div> */}
                                            {/* <div className='apg12i flex-row-center'><Tooltip title="online users" arrow placement='right-end'><IconButton >< FaPersonCircleCheck  className='icon'/></IconButton> </Tooltip ></div> */}
                                            <div className='apg12i flex-row-center'><Tooltip title="theme" arrow placement='right-end'><IconButton ><FaMoon  className='icon'/></IconButton></Tooltip ></div>
                                            <div className='apg12i flex-row-center'><Tooltip title="setting" arrow placement='right-end'><IconButton >< IoSettingsSharp className='icon'/></IconButton></Tooltip ></div>
                                            <div className='apg12i flex-row-center' onClick={loggedout}><Tooltip title="logout" arrow placement='right-end'><IconButton >< AiOutlineLogout className='icon'/></IconButton></Tooltip ></div>
                                            <div className='apg12i flex-row-center' ><Tooltip title="how to use this app" arrow placement='right-end'><IconButton >< IoIosInformationCircleOutline className='icon'/></IconButton></Tooltip ></div>

                                        </div>
                                </div>




                                <div className='apg2 flex-row-center'  onClick={()=>{dispatch(SIDEBARclose()  )  ;  dispatch( PROFILEclose() )  ; dispatch( searchingfalse() )  }}>
                                      <Child/>
                                </div>


                                <Recent_chat_Slider />    

                                <Profile_slider />
                        </div>

              :  <div>not authorized</div>          
  )
}

export default Apppage