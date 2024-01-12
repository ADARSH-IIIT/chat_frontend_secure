function setmyinfo( payload ){

    // console.log(" my info action is running is running" , payload);
       
        return {
            type : "myinfo" ,
            payload : payload 
           
        }
    
    }

    export default setmyinfo