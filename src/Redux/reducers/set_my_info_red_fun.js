

const initialstate = { myinfo : { username : "default" , _id : "default id" ,  email : "default email" , profile_pic : null} }




function myinfo_red_fun( state= initialstate , action ){

    // console.log("reducer fun1 is running");


    
    switch( action.type ){

        case 'myinfo' :  return { myinfo : { username : action.payload.username , email : action.payload.email  , _id : action.payload._id , profile_pic : action.payload.profile_pic } }
        


        default : return state

    }



}

export default myinfo_red_fun