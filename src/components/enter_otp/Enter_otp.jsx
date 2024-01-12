import React, { useState } from 'react'
import './Enter_otp.css'
import { HashLink } from 'react-router-hash-link';
import {  useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'
import ReactLoading from 'react-loading';
import { axiosinstance, enterotp_api } from '../../api_list';




const Signup_form = () => {


  //////////////////////////////////////////////////// state variables /////////////////////////
  const [username , setusername] = useState(null)
  const [otp , setotp] = useState(null)
  const [password , setpassword] = useState(null)
  const [loading , setloading] = useState( false )
/////////////////////////////////////////////////////////////////////////////////////////////////
 
/////////////////////////////////////////////////////////////////////////////////////////////////
  const navigate = useNavigate();
  const alert = useAlert()
/////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////   onclick starts here /////////////////////////////
async function reset_password(){

  try {

    let validation_error = false ;

    if( !password || !otp || !username){
     return  alert.show("pls enter all creds")
     
    }

 
    if(password.length<8){
      alert.show("password should have atleast 8 characters" )
      validation_error = true

    }
 
    if(otp.length!=5){
        alert.show("invalid otp" )
        validation_error = true
  
      }
       if(validation_error) {return }
    /////////////////////////////////     input validation ends here ////////////////////////////


   

   /////////////////////////////////////////////////   calling api ///////////////////////////////
   setloading(true)   
   const {data} = await axiosinstance.post(  enterotp_api  , {
      otp: otp,
      password: password,
      username : username
    })

    // console.log("enterotp axios response" , data);
    setloading(false)

    
    

  if(data.error){ return  alert.show(data.mssg)   }

  if(data.success){
     alert.show("password changed successfully") 
     navigate('/signin') }  
  
      
    } catch (error) {

      console.log("error at enter otp function at front end part");
      
    }

  }



  return (  
     
      loading  ?   
            <div> <ReactLoading type={'bubbles'} color={"white"}/> </div>
               
            : 


                           <div className='register'>
                            <div className='register1 flex_row_center'>change_password here</div>
                            <div className='register2  flex_col_center'>
                            <div className='register21'> <input type='text' placeholder='enter your username' onChange={(e)=>{setusername(e.target.value)}}/></div>
                              <div className='register22'> <input type='text' placeholder='enter otp' onChange={(e)=>{setotp(e.target.value)}}/></div>
                              <div className='register23'> <input type="text" placeholder='enter new password' onChange={(e)=>{setpassword(e.target.value)}}/></div>
                              <div className='register24'><button  onClick={reset_password}>Reset_password</button></div>
                            </div>
                            <div className='register3 flex_row_center'>wanna create new account? <HashLink className='redirector' to={'/signup'}> signup here </HashLink></div>
                          </div>
  )
}

export default Signup_form