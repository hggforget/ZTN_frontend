<template>

<el-tree
    ref="treeRef"
    :data="Treedata"

    default-expand-all
    node-key="id"
    highlight-current
    :props="defaultProps"
  />

  <!--

    <json-viewer :value="json_data" copyable boxed sort />

  -->
</template>

<script lang="ts" setup>
import { useLogStore } from '@/stores/Logs';
import jsonView from 'vue-json-views'
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const defaultProps = {
  children: 'children',
  label: 'label',
}
interface Tree {
  label: String,
  children?: Tree[],
}
let Treedata:Tree[] = []
const isJSON =(str)=> {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }

        } catch(e) {
            console.log('error：'+str+'!!!'+e);
            return false;
        }
    }
    console.log('It is not a string!')
}
const data_translator = (data:any) => {
  if(data instanceof Array){
    let array_tree = array_trainslator(data)
    if(array_tree.length==1)
    {
      return array_tree[0].children==undefined?[]:array_tree[0].children
    }
    return array_tree
  }
  return json_translator(data)
}
const array_trainslator = (data:Array<any>) =>{
  let childrens:Tree[] = []
  for(var index in data)
     {
        let Node:Tree={
          label : index,
          children :[]
        }
        console.log(index,data[index],typeof(data[index]))
        let content =  data[index]
        if(typeof(content) == 'object')
            Node.children=data_translator(content)
        else
        {
            let leaf:Tree = {
              label : content,
            }
            Node.children?.push(leaf)
        }
      childrens?.push(Node)
     }
     return childrens
}

const json_translator = (data:JSON) => {
  let childrens:Tree[] = []
  for(var key in data)
     {
        let Node:Tree={
          label : key,
          children :[]
        }
        console.log(key,data[key],typeof(data[key]))
        let content =  data[key]
        if(typeof(content) == 'object')
            Node.children=data_translator(content)
        else
        {
            let leaf:Tree = {
              label : content,
            }
            Node.children?.push(leaf)
        }
        childrens?.push(Node)
     }
  return childrens
}
const store = useLogStore();
let json_data
const {id,sdpid,action,data,upload_date} = storeToRefs(store)
  if(data.value == null)
  {
     console.log("data = null")
  }
  else{
    let raw_data = data.value.replaceAll("'", "\"")
    if(isJSON(raw_data))
    {
        json_data = JSON.parse(raw_data)
        Treedata = data_translator(json_data)
    }
    else
    {
        console.log(data.value)
    }
  
  } 
  
  
</script>



<style scoped>

</style>