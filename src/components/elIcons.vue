<template>
  <p>
    with extra class <b>is-loading</b>, your icon is able to rotate 360 deg in 2
    seconds, you can also override this
  </p>
  <el-container>
    <el-main>
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
    <span style="vertical-align: middle"> Search </span>
  </el-button>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "elIcons"
}
</script>

<style>



</style>

