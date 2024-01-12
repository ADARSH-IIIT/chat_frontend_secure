

const initialstate = { currentreceiver : { username : "default" , _id : "default id" , profile_pic : null } }




function currentreceiver_red_fun( state= initialstate , action ){

    // console.log("reducer fun1 is running");


    
    switch( action.type ){

        case 'currentreceiver' :  return { currentreceiver: { username : action.payload.username  , _id : action.payload._id   , profile_pic : action.payload.profile_pic} }
        


        default : return state

    }



}

export default currentreceiver_red_fun