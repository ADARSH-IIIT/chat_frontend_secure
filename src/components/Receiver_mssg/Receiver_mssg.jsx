import React from 'react'
import './Receiver_mssg.css'
import { useEffect , useState} from 'react'
import { useSelector } from 'react-redux'



import { useAlert } from 'react-alert'
import { axiosinstance, backend_base_url } from '../../api_list'





const Receiver_mssg = ( props ) => {

   const { message , time } = props
   const alert = useAlert()
   const [istranslated , setistranslated] = useState(false)
   const [translatedmssg , settranslatedmsg] = useState(message)


const {your_language } = useSelector((state)=> state.your_language)


   const speech =  window.speechSynthesis

   useEffect(()=>{
 
     speech.cancel()
 
     return ()=>{ speech.cancel() }
 
 
   } , [])
 



  




    async function speakmssg(){


      let u = new SpeechSynthesisUtterance( translatedmssg  )


      
     if(!istranslated){
      let to = 'hi'
     if(your_language=='HINDI'){ to = 'hi' }
     else if(your_language=='ENGLISH'){ to = 'en' }

     alert.show("translating mssg")
  const {data} = await axiosinstance.post(`${backend_base_url}/translate` , { message : message , to : to })

  if(data.error==true) {  return alert.show("error to translate mssg") }

  alert.show("translated successfullyyyy")
   setistranslated(true)  
   settranslatedmsg(data.translated_message)

   u = new SpeechSynthesisUtterance(data.translated_message)

}



// console.log(translatedmssg , "pop");
       
        const voices = speech.getVoices()
        let myvoice = voices[2] || voices[0]
        if(your_language=="ENGLISH"){  myvoice = voices[2] || voices[0] }
        else if(your_language=="HINDI") { myvoice = voices[12] || voices[0]  }
// console.log(voices);
         u.voice = myvoice
         u.rate= 1.05
         u.pitch = 1



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
    <div className='rm flex-coloumn-center'   onClick={speakmssg}>
        <div className='mssg'>{translatedmssg}</div>
        <div className='time'>{time}</div>

    </div>
  )
}

export default Receiver_mssg