<template>
    <!-- 注意：逻辑部分尽量不好写到这个组件内，因为这个组件是根据外面table循环创建的，在这里写逻辑会非常影响性能 -->
    <div class="customHeader" @click.stop style="display: inline-block">
      <el-popover
        placement="bottom"
        title="查询条件"
        width="300"
        trigger="click"
        ref="popover"
      >
    
        <!-- txt 文本 -->
        <div v-if="item.conditionType == 'txt'">
          <el-input
            v-model.trim="conditions.value1"
            placeholder="请输入查询内容"
            @keyup.native.enter="confirm()"
          ></el-input>
        </div>
        <!-- scope 范围-->
        <div v-else-if="item.conditionType == 'scope'">
          <el-input
            style="width: 120px"
            v-model.trim="conditions.value1"
            placeholder="请输入条件1"
          ></el-input>
          -
          <el-input
            style="width: 120px"
            v-model.trim="conditions.value2"
            placeholder="请输入条件2"
          ></el-input>
        </div>
        <!-- date 日期-->
        <div v-else-if="item.conditionType == 'date'">
          <el-date-picker
            v-model="conditions.value1"
            type="date"
            clearable
            placeholder="开始时间"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-date-picker
            style="margin-top: 10px"
            v-model="conditions.value2"
            type="date"
            clearable
            placeholder="结束时间"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <!-- select 选择框-->
        <div v-else-if="item.conditionType == 'select'">
          <el-select
            v-model="conditions.value1"
            placeholder="请选择"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="(item1, index) in selectList(item)"
              :key="index"
              :label="item1.value"
              :value="item1.value"
            >
            </el-option>
          </el-select>
        </div>
   
        <!-- confirm 确定框-->
        <div style="text-align: center">
          <el-button @click="confirm" type="primary" class="confirm"
            >确定</el-button
          >
        </div>
        <!-- label 标题显示-->
        <template #reference>
        <span
          onselectstart="return false"
          oncontextmenu="return false"
          class="label"
          :class="{ labelColor: labelColorList.includes(item.prop) }"
          >{{ item.label }} &nbsp;<i class="el-icon-arrow-down"></i>
        </span>
    </template> 
      </el-popover>
    </div>
  </template>
  <script lang="ts" setup>
  import { ElMessage } from 'element-plus';
import { reactive, ref,defineEmits } from 'vue';
import type { tableConfig_prop } from './interfaces';
const emit = defineEmits(['tableUpdate'])
type Props = {
        item :tableConfig_prop,
        customParams:any,
        labelColorList:String[]
    }
    const popover = ref()
    // column 当前列数据，tableConfig 内数据，customParams 下拉框数据， labelColorList 正在使用的筛选条件
    const props = defineProps<Props>()
    const conditions = reactive({
          value1: "",
          value2: "",
        })
      const confirm =()=> {
        if (!conditions.value1 && !conditions.value2) {
          return ElMessage({
            message: 'Warning, 请选择筛选条件.',
            type: 'warning',
            })
        }
        // 关闭popover
        popover.value.hide()
        const item = props.item
        emit("tableUpdate", {
          value: conditions, //所筛选的数据
          prop :item.prop,//table 配置
          conditionType: item.conditionType, 
        });
      }
      const selectList =(data:tableConfig_prop)=>{
    
        if (data.conditionListName)
        return props.customParams[data.conditionListName];

    }

  </script>
  <style scoped>
  .confirm {
    margin-top: 10px;
  }
  /* 禁止双击选中文字 */
  .label {
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none !important; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
  }
  .labelColor {
    color: #409eff;
  }
  </style>