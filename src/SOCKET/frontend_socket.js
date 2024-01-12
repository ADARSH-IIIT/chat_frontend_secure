import {io} from 'socket.io-client'

const endpoint = 'https://backend-chat-gauu.onrender.com'

const FrontEndSocket = io( endpoint , {autoConnect : false} )  



export default FrontEndSocket