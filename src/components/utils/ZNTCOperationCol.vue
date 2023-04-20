<template>
            <el-table-column label="Operations">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row);"><el-icon style="margin-right: 3px">
                    <VideoPlay />
                  </el-icon>开机</el-button>
                <el-button size="small" @click="handleEdit(scope.$index, scope.row);"><el-icon style="margin-right: 3px">
                    <VideoPause />
                  </el-icon>挂起</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"><el-icon>
                    <CircleClose />
                  </el-icon>关机</el-button>
              </template>
            </el-table-column>

</template>

<script setup lang="ts">

  const handleEdit = (index, row) => {
    console.log(index, row)
  }
  
  const handleDelete = (index, row) => {
    console.log(index, row)
  
  }
  

</script>


<style scoped>


</style>