import React, { useState } from 'react'
import './signin_form.css'
import { HashLink } from 'react-router-hash-link';
import validator from 'validator';
import {  useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'
import ReactLoading from 'react-loading';



import { axiosinstance, creds_compare_api , set_jwt_api } from '../../api_list';

const Signin_form = () => {

  ///////////////////////////////////////////////// state variables ///////////////////////////
  const [email , setemail] = useState(null)
  const [password , setpassword] = useState(null)
  const [loading , setloading] = useState(false)
///////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////// 
  const navigate = useNavigate();
  const alert = useAlert()
/////////////////////////////////////////////////////////////////////////////////////////////////////






/////////////////////////////////////////// onclick login function starts here/////////////////////////
 async function login(){


  try {

    let validation_error = false ;

    if( !password || !email){
     return  alert.show("pls enter all creds")
    }

 
    if(password.length<8){
      alert.show("password should have atleast 8 characters" )
      validation_error = true

    }
 
    if(!validator.isEmail(email)){
      alert.show( "invalid email address" )
     validation_error = true

    }


    if(validation_error) {return }
    

      setloading(true)
   const {data} = await axiosinstance.post(  creds_compare_api  , {
      email: email,
      password: password,
    })


    
    // console.log("signin axios response" , resp);

    if(data.error){     setloading(false)     ; return  alert.show(data.mssg)   }

    


    if(data.success){


      

      let {data} = await axiosinstance.post(   set_jwt_api  , { email : email } , { withCredentials : true } )
   

      // fetch(  set_jwt_api , {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json, text/plain, */*",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: email,
          
      //   }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => console.log(data))
      //   .catch((err) => {
      //     console.log(err);
      //    });
  
// const data = await   fetch(  set_jwt_api , {
//   method: "POST",
//   headers: {
//     Accept: "application/json, text/plain, */*",
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     email: email,
    
//   }),
// })


      
      if(data.error){   setloading(false)  ;return alert.show(data.mssg) }

      if(data.success) { 
                 setloading(false)
                 navigate('/app/welcome') 
                 return alert.show(data.mssg)
      }



    }
 
    
    } catch (error) {

      console.log("error at signin form comp at front end part");
      console.log(error);

     
      
    }

  }



  ///////////////////////////////////       onclick login ends here ////////////////////////////////////



  return (

          loading ?

             <div><ReactLoading type={'bubbles'} color={"white"}/></div>  
            
             : 

                <div className='register'>
                  <div className='register1 flex_row_center'>Login_here</div>
                  <div className='register2  flex_col_center'>
                    <div className='register22'> <input type='email' placeholder='enter your email' onChange={(e)=>{setemail(e.target.value)}}/></div>
                    <div className='register23'> <input type="text" placeholder='enter password' onChange={(e)=>{setpassword(e.target.value)}}/></div>
                    <div className='register24'><button  onClick={login}> Login </button></div>
                  </div>
                  <div className='register3 flex_row_center'>forgot password? <HashLink className='redirector' to={'/resetpassword'}> reset password </HashLink></div>
                </div>
  )
}

export default Signin_form