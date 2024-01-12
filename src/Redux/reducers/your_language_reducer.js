const initialstate = { your_language : "HINDI" }

function your_language_red_fun( state= initialstate , action ){

    

    if(action.type == 'ENGLISH' && action.user == "your_language")  {   return { your_language : "ENGLISH" }}

    else  if(action.type == 'HINDI' && action.user == "your_language")  { return { your_language : "HINDI" }}
 
    return state
 


}

export default your_language_red_fun