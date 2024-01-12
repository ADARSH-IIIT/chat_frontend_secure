import React, { useState } from 'react'
import './Reset_form.css'
import validator from 'validator';
import {  useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'
import ReactLoading from 'react-loading';

import { axiosinstance, resetpassword_api } from '../../api_list';


const Reset_form = () => {

 //////////////////////////////////////////////////// state variables ////////////////////////////////
  const [email , setemail] = useState(null)
  const [loading , setloading] = useState(false) 
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  
//////////////////////////////////////////////////////////////////////////////////////////////////
  const navigate = useNavigate();
  const alert = useAlert()
///////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////   onclick send otp starts here //////////////////////////////////
async function sendotp(){

  try {

    if(!email){
     return  alert.show("pls enter email")
     
    }
 
    if(!validator.isEmail(email)){
     return  alert.show( "invalid email address" )
    

    }
 
    alert.show("otp has been requested")
    setloading(true)

   ////////////////////////// calling api //////////////////// 
   const {data} = await axiosinstance.post(  resetpassword_api  , {
      email: email
      
    })

    setloading(false)

    // console.log("resetpassword axios response" , data);
  
    if(data.error){ return  alert.show( data.mssg)   }


     alert.show("otp sent successfully to mail id") 
     navigate('/enterotp')  
  
      
    } catch (error) {

      console.log("error at request otp page at front end part");
      
      
    }

  }


  //////////////////////////////////////////////////   onclick ends here ////////////////////////////



  return (

         loading  ? 

             <div> <ReactLoading type={'bubbles'} color={"white"}/> </div>

                 : 
                    <div className='register'>
                      <div className='register1 flex_row_center'>Request_Otp</div>
                      <div className='register2  flex_col_center'>
                        <div className='register22'> <input type='email' placeholder='enter your email' onChange={(e)=>{setemail(e.target.value)}}/></div>
                        <div className='register24'><button  onClick={sendotp}>Request Otp</button></div>
                      </div>
                    </div>
  )
}

export default Reset_form