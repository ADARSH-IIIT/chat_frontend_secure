

const initialstate = { profile_slider : { isopen: false } }




function profile_red_fun( state= initialstate , action ){

    // console.log("reducer fun1 is running");


    
    switch( action.type ){

        case 'PROFILEopen' :  return { profile_slider : { isopen : true } }
        case 'PROFILEclose' : return { profile_slider : { isopen : false } }


        default : return state

    }



}

export default profile_red_fun