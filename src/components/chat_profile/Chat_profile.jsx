import React, { useEffect, useState } from 'react'
import { IoMdSend } from "react-icons/io";
import './Chat_profile.css'
import Sender_mssg from '../Sender_mssg/Sender_mssg';
import Receiver_mssg from '../Receiver_mssg/Receiver_mssg';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { useDispatch , useSelector } from 'react-redux';
import currentreceiver from '../../Redux/actionfunction/current_receiver';
import ScrollToBottom from 'react-scroll-to-bottom';
import FrontEndSocket from '../../SOCKET/frontend_socket';

import { CiMicrophoneOn } from "react-icons/ci";

import { ENGLISH , HINDI } from '../../Redux/actionfunction/your_language';
import { axiosinstance, backend_base_url } from '../../api_list';

const Chat_profile = () => {



const dispatch = useDispatch()
 const alert = useAlert()
///////////////////////////////////////////////////  receiverid from url /////////////////////////////////////////////////////////////
            let { receiverid} = useParams()
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



 const [isalreadyfriend , setfriend] = useState(false)
 const [currentmssg , setcurrentmssg] = useState("")
 const [oldconv , setoldconv] = useState([])
 const [hasoldconv , setoldconvstate] = useState(false)
 const [chat_id , setchatid] = useState()
 
 const [ isrecording , setisrecording] = useState(false)

/////////////////////////////////////////////////////////////////  myinfo and current receiverinfo//////////////////////////////////////////////////////
 const {myinfo} = useSelector((state)=>state.myinfo)
 const  x = useSelector((state)=>state.receiverinfo)
 const receiverinfo = x.currentreceiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 useEffect(  ()=>{


  // setoldconv([])

  

  setoldconvstate(false)
  setcurrentmssg("")
  setchatid("")
  setfriend(false)

  getreceiverinfo(receiverid)

   getchatinfo()

   window.alert("do not forget to select your langiage")




  return leave_chat_room()


 } , [ receiverid ])

 





 useEffect( ()=>{

 real_time_received_mssg()



  
 }   )





function real_time_received_mssg(){

  

  FrontEndSocket.on('received message' , (info)=>{ 

    console.log(   "previous state" , oldconv );
       
      if(oldconv.length!=0) {setoldconv( [...oldconv , { content : info.message , _id :  Math.floor(Math.random() * 99999999) ,  sender : {username : receiverinfo.username} }] ) }
    
      else {     console.log("old conv length is 0");    ; setoldconv( [ { content : info.message , _id :  Math.floor(Math.random() * 99999999) ,  sender : {username : receiverinfo.username} } ] )  }
     
    
    } )   



}




function leave_chat_room(){
  FrontEndSocket.emit('leave room')
}




function emit_message( content ){
  FrontEndSocket.emit('private message' , {  room : chat_id ,  message : content   })
}





 async function getchatinfo(){

//////////////////  calling api to check whether chat exist or not /////////////////////////
  const {data} = await axiosinstance.post(`${backend_base_url}/accesschat/${receiverid}`)
  
  setfriend( data.isalreadyfriend )

  setchatid(data.chat_id)
      
/////////////////////////////////    after getting chat_id join the private chat room
  join_chat_room(  data.chat_id )


///////////////////////////////////////  if they are already friend , then calling new api to get there old conversation //

    if(data.isalreadyfriend){
      const oldmssg = await axiosinstance.get(`${backend_base_url}/getoldmessage/${data.chat_id}`)

      console.log(oldmssg.data.oldconversation);
    
      if(oldmssg.data.error == false) {  setoldconvstate(true) ; setoldconv(oldmssg.data.oldconversation) }
      if(oldmssg.data.error==true) {  setoldconvstate(false)   }
      
    }
 //////////////////////////////////////////////////////////////     
  
  
 }


 async function getreceiverinfo(receiverid){

 
  const {data} = await axiosinstance.get(`${backend_base_url}/receiverinfo/${receiverid}`)

  if(data.error==false){  dispatch(  currentreceiver( data.receiverinfo )   )  }
  

 }











function handleinput(e){

  setcurrentmssg(e.target.value)

}


async function handlesend(){

  if(currentmssg=="") { return alert.show("pls enter some mssg")  }
  
  const waiter = await axiosinstance.post(`${backend_base_url}/send/message` , { receiverid : receiverid , content : currentmssg , belongs_to : chat_id})

  emit_message(currentmssg)
 

  console.log(oldconv , "after sending");
   setoldconv([...oldconv , { content : currentmssg , sender: {username : myinfo.username } , receiver : {username : receiverinfo.username} , _id :  Math.floor(Math.random() * 999999999999999999)} ])
   setoldconvstate(true)

   setcurrentmssg("")

}




function join_chat_room( chat_id){
////////////////    join to chat room (private room) ===> room number ===> chat id



FrontEndSocket.emit( 'join chat room' , { room : chat_id }     )



}


function dispatch_my_lang(e){
  if(e.target.value=='ENGLISH'){  dispatch(ENGLISH("your_language"))  }
  else if(e.target.value=='HINDI'){  dispatch( HINDI("your_language"))  }
}





///////////////////////////////////////////////////////////////////    speech to text      /////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////   getting my language fro mredux store
  const {your_language } = useSelector((state)=> state.your_language)
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  



  ///   lang = 'en-US'    'hi-IN'

  let recognization = new window.webkitSpeechRecognition();
  
      if(your_language=='HINDI') {recognization.lang = 'hi-IN'    }      // setting input and output to hindi
      else if (your_language=="ENGLISH")  { recognization.lang = 'en-US' }

////////////////////////////////////////////
  recognization.onstart = () => {
       console.log("listening");
       setisrecording(true)
 }
/////////////////////////////////////////////////////////////


 recognization.onend=()=>{
      console.log("stoppingggg");
      setisrecording(false)

 }

//////////////////////////////////////////////////////////////////

 recognization.onresult = (e) => {

 
 console.log(e.results[0][0].transcript);           ////// most imp line
 setcurrentmssg(   " " + currentmssg + " " + e.results[0][0].transcript  + " " )
 setisrecording(false)
 recognization.stop()

}

///////////////////////////////////////////////////////////////////////////////








function startrec(){
     recognization.start()
}









///////////////////////////////////////////////////////////////////////  mic color ////////////////////////////
let mic_color = "navy"
if(isrecording){ mic_color = "white"   }
else if (!isrecording) { mic_color = "navy"  }

console.log(mic_color);
///////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////    css fixing /////////////////////////////////////////////////
        let cp21 = 'cp21'
       if(!hasoldconv) { cp21 = "cp21-" }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className='cp flex-coloumn-center'>

        <div className='cp1 flex-row-center'>
            <div className='cp11 flex-row-center'><div className='flex-row-center'> <img src= { receiverinfo.profile_pic } alt="not found" className='pfpic' /> </div></div>
            <div className='cp12 flex-coloumn-center'>
                <div className='c121'>{receiverinfo?.username}</div>
                <div className='c122'>on/offline</div>
            </div>
           
           <div className='cp13  flex-row-center'>
                <div> 
                    <select name="your_language" id="your_language"   onChange={ dispatch_my_lang }  className='option' >
                        <option value={null}>your lanuage </option>
                        <option value="ENGLISH">ENGLISH</option>
                        <option value="HINDI">HINDI</option>
                    </select>
                </div>
           </div>
           

       
        </div>



        < ScrollToBottom className = "cp2" >
               <div className= {cp21} >

              

                          { hasoldconv?  oldconv?.map((info)=>{ if(info.sender.username==myinfo.username){ return <Sender_mssg message={info.content} key = { info._id } /> }  else { return <Receiver_mssg message = {info.content}  key = {info._id} /> }     }) 
                          
                          : 
                          <div className='bc'>
                            
                            Say Hii to {receiverinfo?.username} : )

                          </div>
                       

                          } 
                        
                     


              </div>

          </ScrollToBottom> 
        

        

        <div className='cp3 flex-row-center'>
            <div className='cp33 flex-row-start'><CiMicrophoneOn className='icon' onClick={startrec}  style={ { color : mic_color } }   /></div>
            <div className='cp31 flex-row-center'><input type="text" onChange={handleinput} value={currentmssg}/></div>
            <div className='cp32 flex-row-start'><IoMdSend className='icon' onClick={handlesend} /></div>
        </div>
    </div>
  )
}

export default Chat_profile