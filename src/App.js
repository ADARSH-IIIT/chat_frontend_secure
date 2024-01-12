import { BrowserRouter , Route , Routes} from 'react-router-dom'
import Auth_Page from './pages/Auth_Page';
import './App.css'
import Signup_form from './components/Signup_form/signup_form';
import Signin_form from './components/Signin_form/signin_form';
import Cwl_form from './components/Continue_without_login/cwl_form';
import Reset_Pass_form from './components/Reset_pass_form/Reset_form';
import Enter_otp_form from './components/enter_otp/Enter_otp';




import Apppage from './pages/Apppage';
// import { AppBar } from '@mui/material';

import Welcome from './components/welcome/Welcome';

import Chat_profile from './components/chat_profile/Chat_profile';



function App() {
  return (
  
    <div className='app'>
    <BrowserRouter  >

             {/* <div>always fix header</div> */}
             <Routes  >
                  < Route  path='/signup'   element = { < Auth_Page  Form={Signup_form}/> }  > </Route>
                  < Route  path='/signin'   element = { < Auth_Page  Form={Signin_form}/>}   > </Route>
                  < Route  path='/cwl'   element = { < Auth_Page  Form={Cwl_form}/>}   > </Route>
                  < Route  path='/resetpassword'   element = { < Auth_Page  Form={Reset_Pass_form}/>}   > </Route>
                  < Route  path='/enterotp'   element = { < Auth_Page  Form={Enter_otp_form}/>}   > </Route>


                  < Route  path='/app/welcome'   element = { <Apppage  Child={Welcome}   /> }   > </Route>
                  < Route  path='/app/chat/:receiverid'   element = { <Apppage  Child={ Chat_profile }   /> }   > </Route>
                

            </Routes>







            
          
             {/* <div>alwauys fix footer</div> */}
    </BrowserRouter>



    </div>
    
  
  );
}

export default App;
