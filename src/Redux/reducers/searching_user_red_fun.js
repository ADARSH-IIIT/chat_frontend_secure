const initialstate = { searching : { issearching: false } }

function searching_user_red_fun( state= initialstate , action ){

    // console.log("reducer fun1 is running");

    switch( action.type ){

        case 'searchingtrue' : return { searching : { issearching : true } }
        case 'searchingfalse' : return { searching : { issearching : false } }

       


        default : return state

    }



}

export default searching_user_red_fun