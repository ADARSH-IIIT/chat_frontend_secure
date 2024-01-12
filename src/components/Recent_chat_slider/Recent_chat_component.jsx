import React, { useEffect, useState } from 'react'
import './Recent_chat_component.css'
import IconButton from '@mui/material/IconButton';

import { CgProfile } from "react-icons/cg";
import { FaMoon } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { MdGroupAdd } from "react-icons/md";
import { GiEntryDoor } from "react-icons/gi";
import {FaPersonCircleCheck} from 'react-icons/fa6'
import { IoSearchSharp } from "react-icons/io5";

import { useSelector , useDispatch } from 'react-redux';
import {  SIDEBARclose} from '../../Redux/actionfunction/sidebar_action';
import Chat_info from '../chat_info/Chat_info';

import { PROFILEclose , PROFILEopen} from '../../Redux/actionfunction/profile_action';
import { searchingfalse, searchingtrue } from '../../Redux/actionfunction/searching_user_fun';
import ReactLoading from 'react-loading';


import { axiosinstance, backend_base_url } from '../../api_list';



const Recent_chat_component = () => {

//////////////////////////////////////////////////////////////////// redux /////////////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const searching = useSelector((state)=> state.searching )  
//   const {myinfo} = useSelector((state)=> state.myinfo)

    const issearching = searching.searching.issearching
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////  state variables ////////////////////////////////////////////////////////////////////////////////
    const [inputvalue  , setinputvalue] = useState(null)
    const [loading , setloading] = useState(false)
    const [searcheduser , setsearcheduser] = useState([])
    const [oldfriendlist , setoldfriends] = useState(null)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////   onclick function to search all friends /////////////////////////////////////////////////////
function handleinput(e){

       setloading(true)
       if(e.target.value==""){dispatch(searchingfalse())  ;setinputvalue(null) ; return  }

       dispatch(searchingtrue())
       setinputvalue( e.target.value )

    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////  search button  ////////////////////////////////////////////////////////////////
async function handlesearch(){
       
       if(inputvalue=="" || inputvalue==null) { return }
       setloading(true)

       const {data} = await axiosinstance.get(`${backend_base_url}/user?search=${inputvalue}`)

      

       if(data.error==false) { setsearcheduser(data.mssg) }
       if(data.error==true) { setsearcheduser( [404] ) }

       setloading(false)
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function oldfriends(){
    try {
  
 
      const {data} = await axiosinstance.get(`${backend_base_url}/fetchchats`)
    //   console.log(data.friendsarray);

      setoldfriends(data)
      
    } catch (error) {
      console.log("error at frontend at old friends api call chat profile components");
    }
  }
  


useEffect(()=>{
    oldfriends()

},[])




  return (
    
      <div className='rcc flex-coloumn-center'  onClick={()=>{ dispatch( PROFILEclose() ) }}>

          <div className='rcc1 flex-row-center'>
                 <div className='rcc11 flex-row-center'>
                        <div className='rcc11i flex-row-center'  onClick={(e)=>{ dispatch( PROFILEopen() ) ; e.stopPropagation() }}><IconButton >< CgProfile  className='icon1'/></IconButton></div>
                        <div className='rcc11i flex-row-center'><IconButton >< FiPlusCircle  className='icon1'/></IconButton></div>
                        {/* <div className='rcc11i flex-row-center'><IconButton ><MdGroupAdd  className='icon1'/></IconButton></div> */}
                        {/* <div className='rcc11i flex-row-center'><IconButton >< FaPersonCircleCheck  className='icon1'/></IconButton></div> */}
                        <div className='rcc11i flex-row-center'><IconButton ><FaMoon  className='icon1'/></IconButton></div>
                        <div className='rcc11i flex-row-center'  onClick={()=>{dispatch( SIDEBARclose())}} ><IconButton ><GiEntryDoor className='icon1' /></IconButton> </div>

                 </div>
          </div>

          <div className='rcc2 flex-row-center'>
                 <div className='rcc12 flex-row-center'>
                       <div className='rcc121 flex-row-center'><input type="text" placeholder='search your here' className='rcc-input' onChange={  handleinput   }/></div>
                       <div className='rcc122 flex-row-center' onClick={ handlesearch }><IconButton title="theme">< IoSearchSharp  className='icon1' /></IconButton></div>
                 </div>
          </div>

          <div className='rcc3 flex-coloumn-start'>
                    <div className='rcc31'>

                           
                      { issearching? 
                      
                             ( loading? 
                             
                                  <div   > <ReactLoading type={'bubbles'} color={"white"}/> </div> 
                                        :
                                         searcheduser?.map( (info)=>{ if(info==404){ return <div className='nuf'>no user found</div> } 
                                                                       else return  <Chat_info {...info} key = {info.username} />  }) 
                                                                       
                               )
                             
                              
                               : 
                               
                           
                               oldfriendlist ? 
                                    
                                    oldfriendlist.error ? <div className='nuf'>{oldfriendlist.mssg}</div>  : <>friends list here</>
                                    
                                    :  
                                     
                                     <div   > <ReactLoading type={'bubbles'} color={"white"}/> </div>
                    
                                
                                  
                               

                             }

  



                               
                               
                             
                               
                    </div>
          </div>
      </div>

  )
}

export default Recent_chat_component