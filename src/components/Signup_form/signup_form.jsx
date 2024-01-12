import React, { useState } from 'react'
import './signup_form.css'
import { HashLink } from 'react-router-hash-link';
import validator from 'validator';
import {  useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'
import ReactLoading from 'react-loading';

import { axiosinstance, signup_api } from '../../api_list';


const Signup_form = () => {

  ////////////// state variables ////////////////////////////
  const [username , setusername] = useState(null)
  const [email , setemail] = useState(null)
  const [password , setpassword] = useState(null)
  const [ loading , setloading] = useState(false)

 
  //////////////////////////////////////////////////////////////////////
  const navigate = useNavigate();
  const alert = useAlert()
//////////////////////////////////////////////////////////////////////////////




////////////////////////////////// onclick function //////////////////////////
 async function register(){

  try {

    let validation_error = false ;

      /////////////////// input field validation starts here/////////////////////////

    if(!username || !password || !email){
     return alert.show("pls enter all creds")
     
    }

    if(username.length<4){
      alert.show("username should have atleast 4 characters" )
     validation_error = true

    }

    if(password.length<8){
      alert.show("password should have atleast 8 characters" )
      validation_error = true

    }
 
    if(!validator.isEmail(email)){
      alert.show( "invalid email address" )
     validation_error = true

    }

      if(validation_error){ return }

      /////////////////// input field validation ends here/////////////////////////
      
      setloading(true)
      const {data} = await axiosinstance.post(  signup_api , {
      email: email,
      password: password,
      username : username
    })

    setloading(false)
     

    // console.log("signup response for axios" , data );

    
    

    if(data.error){ return  alert.show(data.mssg)   }


     alert.show("registration done successfully")
     navigate('/app/welcome') 
   
      
    } catch (error) {

      console.log("error at signup form component at front end part");
      
    }

  }

  /////////////////////////////////////////   registeration onclick function ends here ///////////////////////////


  return (


   loading? 

      <div><ReactLoading type={'bubbles'} color={"white"}/></div>  
      
      : 

      <div className='register'>
          <div className='register1 flex_row_center'>Register_here</div>
          <div className='register2  flex_col_center'>
                <div className='register21'><input type="text" placeholder="enter username"  onChange={(e)=>{setusername(e.target.value)}}/></div>
                <div className='register22'> <input type='email' placeholder='enter your email' onChange={(e)=>{setemail(e.target.value)}}/></div>
                <div className='register23'> <input type="text" placeholder='enter password' onChange={(e)=>{setpassword(e.target.value)}}/></div>
                <div className='register24'><button  onClick={register}>Register</button></div>
          </div>
          <div className='register3 flex_row_center'>already have an account? <HashLink to={'/signin'} className='redirector'> login </HashLink></div>
      </div>
  )
}

export default Signup_form