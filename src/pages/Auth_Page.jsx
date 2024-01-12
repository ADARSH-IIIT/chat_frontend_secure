import './Auth_Page.css'
import img from './img2.png'
import { HashLink } from 'react-router-hash-link';




function Auth_Page( {Form} ){

    


    return ( 
    
     <div className='flex_row_center signup_parent'>
        <div className='flex_row_center signup1-1'>


            <div className='signup1-1-1'>
                <div className='signup1-1-1-1  flex_row_center'>Translator.com</div>
                <div className='signup1-1-1-2 flex_row_center'><img src={img} alt="404 not found" width={'98%'} height={'98%'}/></div>
                <div className='signup1-1-1-3 flex_row_center'><button className='cwl'><HashLink to="/cwl" className='hashlink'>continue without login</HashLink></button></div>
            </div>



            <div className='signup1-1-2 flex_row_center'><Form/></div>
        </div>
     </div>
    
    
    )

}





export default Auth_Page