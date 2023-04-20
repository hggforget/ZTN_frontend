import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface EditDialog{
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
}
}

export const useEditDialogStore = defineStore('EditDialog',  {
    state: (): EditDialog => {
        return {
            dialogFormVisible:false,
            form:{
                name: '',
                country: '',
                state: '',
                locality: '',
                org: '',
                type: '',
                org_unit: '',
                alt_name: '',
                email: '',
                valid: '',
                serial: ''
              }
        };
    }
    
    

  
})
