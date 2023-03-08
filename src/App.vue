<template>
  <div id="app">
    <!--
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    -->
    <SdpTable ></SdpTable>
     <elIcons ></elIcons>
  </div>
</template>



<script>
import SdpTable from "./components/SdpTable.vue"
import elIcons from "@/components/elIcons"
export default {
  name: 'App',
  components: {
    SdpTable,
    elIcons
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
