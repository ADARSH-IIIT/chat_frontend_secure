const initialstate = { sidebar : { isopen: false } }

function sidebar_red_fun( state= initialstate , action ){

    // console.log("reducer fun1 is running");

    switch( action.type ){

        case 'SIDEBARopen' : return { sidebar : { isopen : true } }
        case 'SIDEBARclose' : return { sidebar : { isopen : false } }


        default : return state

    }



}

export default sidebar_red_fun