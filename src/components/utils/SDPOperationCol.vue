<template>
<el-table-column label="Operations">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
              >
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
              >
            </template>
          </el-table-column>

</template>

<script setup lang="ts">
import { DelSdp } from '@/api/api';
import { useEditDialogStore } from '@/stores/EditDialog';
import { storeToRefs } from 'pinia';
const store = useEditDialogStore();
const myEditDialog = storeToRefs(store)
const emit =defineEmits(['refresh'])
const handleEdit =(index,row)=> {
      console.log(index, row)
      
      let rowdata=JSON.parse(JSON.stringify(row))
      for(var key in rowdata){
        myEditDialog.form.value[key]=rowdata[key]
      }
      console.log(myEditDialog.dialogFormVisible)
      myEditDialog.dialogFormVisible.value = true
    }

const handleDelete =(index,row)=> {
      console.log(index, row)
      console.log(row.sdpid)
      DelSdp(row.sdpid)
      setTimeout(()=>{
          emit('refresh')
      },1000)
    }


</script>


<style scoped>


</style>