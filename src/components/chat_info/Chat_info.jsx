import React from 'react'
import './Chat_info.css'
import { HashLink } from 'react-router-hash-link'




const Chat_info = ( {username="default username" , lastmessage="this is default last mssg" , time="00:00" , _id="default friend id here" , profile_pic = "profile pic" } ) => {



  return (
   
    < HashLink className='chatinfo' smooth to={`/app/chat/${_id}`} >
        <div className='logo flex-row-center'> <div className='flex-row-center'> <img src={profile_pic} alt="404 notfound" className='pfpic'/> </div> </div>
        <div className='mssg'>
            <div className='a'>{username}</div>
            {/* <div className='b'>{lastmessage.substring(0,20)}...</div> */}
        </div>
        {/* <div className='time'><div>{time}</div></div> */}
    </ HashLink>
  
  )
}

export default Chat_info  