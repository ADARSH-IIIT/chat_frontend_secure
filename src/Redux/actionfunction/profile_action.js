function PROFILEopen(){

    // console.log("open is running");
       
        return {
            type : "PROFILEopen" 
           
        }
    
    }
    
    function PROFILEclose(){
        
        return {
            type : "PROFILEclose" 
           
        }
    
    }
    
    
    export { PROFILEclose , PROFILEopen }