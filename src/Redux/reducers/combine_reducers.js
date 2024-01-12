
import searching_user_red_fun from './searching_user_red_fun'

import { combineReducers } from 'redux'
import sidebar_red_fun from './sidebar_red_fun'

import profile_red_fun from './profile_red_fun'
import myinfo_red_fun from './set_my_info_red_fun'
import currentreceiver_red_fun from './set_current_receiver'
import your_language_red_fun from './your_language_reducer'


const allreducer = combineReducers(
    { sidebar : sidebar_red_fun ,  profile : profile_red_fun  , searching : searching_user_red_fun , myinfo : myinfo_red_fun  , receiverinfo : currentreceiver_red_fun  ,  your_language :  your_language_red_fun   }
)

export default allreducer