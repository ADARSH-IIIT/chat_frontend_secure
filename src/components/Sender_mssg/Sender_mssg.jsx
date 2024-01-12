import React, { useEffect, useState } from 'react'
import './Sender_mssg.css'
import { useDispatch , useSelector} from 'react-redux'




const Sender_mssg = ( props) => {

  const { message , time } = props


  const speech =  window.speechSynthesis

  useEffect(()=>{

    speech.cancel()

    return ()=>{ speech.cancel() }


  } , [])



  /////////////////////////////////////////////////////////////////////////   getting my language fro mredux store
const {your_language } = useSelector((state)=> state.your_language)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////




    async function speakmssg(){






      // console.log(your_language);

        const u = new SpeechSynthesisUtterance( message )
        const voices = speech.getVoices()
        let myvoice = voices[2] || voices[0]

        
        if(your_language=="ENGLISH"){  myvoice = voices[2] }
        else if(your_language=="HINDI") { myvoice = voices[12]   }

         u.voice = myvoice
         u.rate= 1.05
         u.pitch = 1


         console.log(speech.currenttext , message);


        if(speech.currenttext == message) {

                 if(   (!speech.paused  && speech.speaking ) ||  ( !speech.pause && !speech.speaking )   ){  speech.pause() ; console.log(speech , "pausing");  return   }

                  if(speech.speaking  && speech.paused){  speech.resume() ; console.log(speech , "resuming");  return   }

      }

       else {  speech.cancel()  }


  
  

  
             u.onstart=()=>{
                //////////////////   this piece of code run just before speaking the utterance

                // console.log("playing" , speech);
                  speech.currenttext = message
           }



             u.onend=()=>{
                    //////////////////   this piece of code run just after speaking the utterance , means when voice gets stopped by completing the sentence
                    //  console.log("played "  , speech);
                      speech.currenttext = null
                    }


/////////////////////////////////////////    speaking new sentence
               speech.speak(u)
////////////////////////////////////////////////////////////////////////



}







  return (
    <div className='sm flex-coloumn-center'  onClick={ speakmssg }   >
        <div className='mssg'>{ message }</div>
        <div className='time'>{time}</div>
         
    </div>
  )
}

export default Sender_mssg



/*


import React, { useEffect, useState } from 'react'

const COMP = () => {

const [ispaused , setpause] = useState(false)
const [utterance , setutterance] = useState(null)
const [text , settext] = useState()


useEffect(()=>{


    return ()=>{ speech.cancel() }

} , [text])

const speech = window.speechSynthesis


function handleinput(e){
    settext(e.target.value)
}


function play(){
    
    console.log("ffg");
    const u = new SpeechSynthesisUtterance(text)

    const voices = speech.getVoices()
    const myvoice = voices[12]

    

    u.voice = myvoice
    u.rate= 1.05
    u.pitch = 1.05



    speech.speak(u)

}

function stop(){
    
    const u = new SpeechSynthesisUtterance(text)
    speech.cancel()

}




function pause(){
    
    const u = new SpeechSynthesisUtterance(text)
    speech.pause()

}


function resume(){
    
    const u = new SpeechSynthesisUtterance(text)
    speech.resume()

}






  return (
    <div>
         
         <input type="text"  onChange={handleinput} />

         <div  onClick={play}>play</div>
         <div  onClick={stop}>stop</div>
         <div  onClick={pause}>pause</div>
         <div  onClick={resume}>resume</div>
          

    </div>
  )
}

export default COMP


*/