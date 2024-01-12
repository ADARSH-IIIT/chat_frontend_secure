function SIDEBARopen(){

// console.log("open is running");
   
    return {
        type : "SIDEBARopen" 
       
    }

}

function SIDEBARclose(){
    
    return {
        type : "SIDEBARclose" 
       
    }

}


export { SIDEBARclose , SIDEBARopen}