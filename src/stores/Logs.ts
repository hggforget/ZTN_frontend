import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface Log{
    id : Number,
    sdpid : Number,
    action : String,
    data : string,
    upload_date : Date
}


export const useLogStore = defineStore('log',  {
    state: (): Log => {
        return {
            id : 0,
            sdpid : 0,
            action : "",
            data : "",
            upload_date : new Date()
        };
    }
    
    

  
})
