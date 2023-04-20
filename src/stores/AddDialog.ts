import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface AddDialog{
    dialogFormVisible:boolean,
    form: {
        name: string;
        country: string;
        state: string;
        locality: string;
        org: string;
        type: string;
        org_unit: string;
        alt_name: string;
        email: string;
        valid: string;
        serial: string;
}|null
}

export const useAddDialogStore = defineStore('AddDialog',  {
    state: (): AddDialog => {
        return {
            dialogFormVisible:false,
            form:null
        };
    }
    
    

  
})
