<template>
  <el-container>
  <el-icon size="20">
    <Edit />
  </el-icon>
  <el-icon color="#409EFC" class="no-inherit">
    <Share />
  </el-icon>
  <el-icon>
    <Delete />
  </el-icon>
  <el-icon class="is-loading">
    <Loading />
  </el-icon>
  <el-button type="primary">
    <el-icon style="vertical-align: middle">
      <Search />
    </el-icon>
    <span style="vertical-align: middle" @click="test"> Search </span>
  </el-button>
  </el-container>
</template>

<script lang="ts" setup>
const test =()=>{
  console.log('asda')
}
</script>

<style scoped>
.el-container{
  position: relative;
  background-color: var(--el-color-primary-light-7);
}
.el-icon{
  margin: auto;
  padding: 0;
}


</style>

