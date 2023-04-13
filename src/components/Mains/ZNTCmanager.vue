<template>
  <el-container>
    <el-main>
      <el-scrollbar>
         <!-- 条件tag -->
    <div style="margin-bottom: 10px" v-if="state.conditionList.length != 0">
      <span>条件：</span>
      <el-tag
        @close="conditionClose(index)"
        style="margin-left: 10px"
        v-for="(tag, index) in state.conditionList"
        :key="index"
        closable
      >
        {{ tag.label }} ：<span style="color: red">{{ tag.value.value1 }}</span>
        <span v-if="tag.value.value2" style="color: red"
          >- {{ tag.value.value2 }}</span
        >

      </el-tag>
    </div>
        <el-table :data="state.tableData" :default-sort="{ prop: 'sdpid', order: 'descending' }" stripe style="width: 100%">

          <el-table-column type="selection" width="40" />
          <template v-for="(item, index) in tableConfig" :key="index">

            <el-table-column sortable :label="item.label" align="center" :prop="item.prop"
               :filters="[]">
              <template #header>
                <CustomHeader v-if="state.customFlag" :column="item" :item="item" :customParams="state.customParams"
                  :labelColorList="state.labelColorList" @tableUpdate="tableUpdate"></CustomHeader>
              </template>
            </el-table-column>
          </template>
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
        </el-table>
      </el-scrollbar>
    </el-main>

  </el-container>
</template>

<script lang="ts" setup>
import { getComponents } from '@/api/api'
import { reactive } from 'vue'
import CustomHeader from "@/components/utils/CustomHeader.vue"
import type { Dictionary } from 'lodash';
import type { State } from '@popperjs/core';
interface condition{
  value1: String,
  value2: String,
}
interface stateData {
      customFlag: boolean,
      customParams: any, 
      conditionList: Array<any>, 
      labelColorList: any,
      tableData: any,
      tableDataCopy: any,  
}
const state=reactive<stateData>({
   customFlag: true, // 自定义筛选是否显示
      customParams: {}, //自定义筛选参数
      conditionList: [], //自定义筛选条件
      labelColorList: [], //已经在使用的筛选条件，染色用
      // table数据
      tableData: [],
      // table数据 拷贝，我们不操作原数据
      tableDataCopy: [],
})
// table配置
const tableConfig = [
        {
          label :"组件SdpID" ,
          prop :"sdpid" ,
          conditionType: "txt", // 条件类型
        },
        {
          label:"组件名称" ,
          prop:"name",
          conditionType: "txt", // 条件类型
        },
        {
          label: "组件类型",
          prop: "type",
          conditionType: "select", // 条件类型
        },

        {
          label: "IP地址",
          prop: "address",
          conditionType: "txt", // 条件类型
          fuzzyQuery: true, //是否模糊查询
        },
      ]

let SDPComponents: []

const loadComponents = () => {
  getComponents().then(response => {
    SDPComponents = response.data.Sdps
    state.tableData = SDPComponents
    console.log(state.tableData)
    state.tableDataCopy = JSON.parse(JSON.stringify(state.tableData));
  })
}
const handleEdit = (index, row) => {
  console.log(index, row)
}

const handleDelete = (index, row) => {
  console.log(index, row)

}

// 给使用筛选条件的标题加颜色
const setlabelColor = () => {
      state.labelColorList = [];
      state.conditionList.forEach((_item:any) => {
        state.labelColorList.push(_item.prop);
      });
    }
    // 自定义检索发射出来的事件
const tableUpdate = (data) => {
      console.log(data, "condition");
      let flag = true;
      // 筛选条件如果已经存在，就更新
      state.conditionList.forEach((item:any, index) => {
        if (item.prop == data.prop) {
          item.value = data.value;
          flag = false;
        }
      });
      // 如果没有就添加
      if (flag) {
        state.conditionList.push(data);
      }
      customSearch(); //筛选数据
    }

// 筛选数据
const customSearch = () => {
      /*
        这里可以说是筛选的核心部分吧，自定义的筛选规则都在这。
        以后想改什么筛选规则就来这找
      */
      console.log(state.conditionList, "this.conditionList");
      setlabelColor(); //设置使用自定义检索的表头颜色
      // 如果自定义检索 为空了，就重新调用查询
      if (state.conditionList.length == 0) {
        search()
        return false;
      }
      const result:any = [];
      // 遍历列表数据
      for (let i = 0; i < state.tableDataCopy.length; i++) {
        const dataItem:any = state.tableDataCopy[i];
        // 遍历自定义筛选条件，符合规则就push出来
        let flag = true;
        for (let l = 0; l < state.conditionList.length; l++) {
          const item = state.conditionList[l];
          // 属性名 属性值 类型 是否模糊查询
          const { prop, value, conditionType, fuzzyQuery } = item;
          console.log(dataItem[prop])
          // txt类型
          if (conditionType == "txt") {
            if (dataItem[prop] == value.value1) {
              flag = true;
            } else {
              flag = false;
            }
 
            //范围类型
          } else if (conditionType == "scope") {
            if (
              dataItem[prop] >= value.value1 &&
              dataItem[prop] <= value.value2
            ) {
              flag = true;
            } else {
              flag = false;
            }
 
            // 时间类型
          } else if (conditionType == "date") {
            // 转换为时间戳然后判断
            let current = new Date(dataItem[prop]).getTime();
            let value1 = new Date(value.value1).getTime();
            let value2 = new Date(value.value2).getTime();
            if (current >= value1 && current <= value2) {
              flag = true;
            } else {
              flag = false;
            }
          }
          // 下拉框类型
          else if (conditionType == "select") {
            // fuzzyQuery 为true代表模糊查询，否则为精确查询
            if (fuzzyQuery) {
              if (dataItem[prop].indexOf(value.value1) != -1) {
                flag = true;
              } else {
                flag = false;
              }
            } else {
              if (dataItem[prop] == value.value1) {
                flag = true;
              } else {
                flag = false;
              }
            }
          }
 
          if (flag === false) break;
        }
        if (flag) result.push(dataItem);
      }
      console.log(result, "result");
      state.tableData = result;
      // this.totalSize = result.length;
 
    }

// 关闭条件tag
const conditionClose = (index) => {
      state.conditionList.splice(index, 1);
      customSearch(); //筛选数据
    }

const search = () => {
      loadComponents()
    }

search()

</script>

<style scoped>
.el-icon {
  margin-right: 8px;
}
</style>