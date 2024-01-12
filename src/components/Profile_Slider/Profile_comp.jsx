import React, { useRef, useState } from 'react'
import './Profile_comp.css'
import { useSelector } from 'react-redux'
import { SiPhotobucket } from "react-icons/si";
import { IconButton } from '@mui/material'
import { useAlert } from 'react-alert';
import ReactLoading from 'react-loading';
import { FaPenAlt } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';

import { useDispatch } from 'react-redux';
import { PROFILEclose } from '../../Redux/actionfunction/profile_action';
import { axiosinstance, update_profile_api  , update_username_api } from '../../api_list';






const Profile_comp = (  ) => {


  const alert = useAlert()
  const dispatch = useDispatch()

  const usernameref = useRef(null)


 const cloud_name = "adarshtech251"
 const  upload_preset = "chat_app"


  const {myinfo} = useSelector((state)=> state.myinfo)

  const [image , setimage] = useState()

  const [hasselectedimage , sethasselectedimage] = useState(false)

  const [loading , setloading] = useState(false)

  const [ changeusername , setchangeusername ] = useState(true)


  const [newusername , setnewusername] = useState(false)


  let x = myinfo.username 

  function choosefile(event){

    try {
      event.preventDefault()
      console.log("running choosefile function");
   const file = event.target.files[0];
   setimage(file);
   sethasselectedimage(true)
   alert.show(  `you have chosen  ${event.target.files[0].name}`  )
    } catch (error) {

      console.log("error to choose profile photo at frontend profile component");
      
    }
  
    
  }   





  async function submitimage(){
    
    

    try {

      const selectedimage = new FormData();
      selectedimage.append("file", image);
 
      selectedimage.append("upload_preset", upload_preset )
      selectedimage.append("folder", "chat_app_user_profile_pic");
      
      setloading(true)
      const {data} = await axiosinstance.post( `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`  ,  selectedimage )
      setloading(false)
      sethasselectedimage(false)



      console.log(data.url);

      const newresp = await axiosinstance.post(  update_profile_api , { profile_pic_url : data.url  })

      console.log(newresp.data);

      alert.show(newresp.data.mssg)



    } catch (error) {

      console.log("error at submit image at frontend at profile component");

      
      
    }

  }



  function handlenewusername(e){
    if(e.target.value == "") { return setnewusername( " ") } 
      setnewusername(e.target.value)

  }


 let value = newusername ? newusername  : myinfo.username
 



async function saveusername(){

  

  setchangeusername(true)


  if(value == myinfo.username){   dispatch(PROFILEclose())  ;   ; return alert.show("old and new username are same :) ") }

  if(newusername==false || newusername==" "  ){    dispatch(PROFILEclose())   ; return alert.show("pls enter new and valid username") }

  if(newusername.length < 4) {           dispatch(PROFILEclose())    ; return alert.show("new username must have char more than 3") }

  if(newusername==myinfo.username){          dispatch(PROFILEclose())     ; return alert.show("old and new username are same :) ") }



  const {data} = await axiosinstance.post( update_username_api , {newusername : newusername } )

  console.log(data);

  console.log(newusername);

  dispatch(PROFILEclose())

  alert.show(data.mssg)



 }




  return (

    <div className='pc flex-coloumn-start'>
        <div className='pc1 flex-row-center'>
            <div className='pc11 flex-row-center'> <img src={myinfo.profile_pic} alt="404 not found" height={"100%"} width={"100%"}  /> </div>  
        </div>

        <div className='pc2 flex-row-center username'>  
              <input type="text" value={  value  }  className='i'  disabled = {changeusername}  ref={usernameref} onChange={handlenewusername} />  
                { changeusername? <div onClick={()=>{      usernameref.current.focus()     ;setchangeusername(false) ;  }}   > <Tooltip > <IconButton> <FaPenAlt className='icon' /> </IconButton>  </Tooltip >  </div> :  <button  className='savebutton' onClick={saveusername}>save</button>
 } </div>
        <div className='pc2 flex-row-center'> {myinfo.email}</div>


      { hasselectedimage ? 

              loading ?     <div> <ReactLoading type={'bubbles'} color={"white"}/> </div>        : <div  onClick={ submitimage  }  ><IconButton> <button className='submiticon' > click to submit profile pic </button> </IconButton></div> 
          
              :


            <div className=' profilepic flex-coloumn-center'>
            <label htmlFor="choosefile">< SiPhotobucket  className='icon2'/></label>
            <label htmlFor="choosefile" className='upf'>update profile photo</label>
         </div>    }
       


        <div className='pc2 flex-row-center'><input type="file"  className='choosefile' id='choosefile'  onChange={ choosefile }/></div>

    </div>
  )
  
}

export default Profile_comp