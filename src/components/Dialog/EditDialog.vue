<template>
  <!-- Form -->
  <el-dialog v-model="dialogFormVisible">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">修改SDP</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </div>
    </template>
    <el-container>
      <el-form :model="form" :rules="rules" ref="baseForm">
        <el-form-item label="name" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="country" :label-width="formLabelWidth" prop="country">
          <el-input v-model="form.country" autocomplete="off" />
        </el-form-item>
        <el-form-item label="state" :label-width="formLabelWidth" prop="state">
          <el-input v-model="form.state" autocomplete="off" />
        </el-form-item>
        <el-form-item label="org" :label-width="formLabelWidth" prop="org">
          <el-input v-model="form.org" autocomplete="off" />
        </el-form-item>
        <el-form-item label="org_unit" :label-width="formLabelWidth" prop="org_unit">
          <el-input v-model="form.org_unit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="valid" :label-width="formLabelWidth" prop="valid">
          <el-radio-group v-model="form.valid">
            <el-radio label="1"/>
            <el-radio label="0" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="serial" :label-width="formLabelWidth" prop="serial">
          <el-radio-group v-model="form.serial">
            <el-radio label="1" />
            <el-radio label="0" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="locality" :label-width="formLabelWidth" prop="locality">
          <el-input v-model="form.locality" autocomplete="off" />
        </el-form-item>
        <el-form-item label="alt_name" :label-width="formLabelWidth" prop="alt_name">
          <el-input v-model="form.alt_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="email" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="type" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="Please select a type">
            <el-option label="gateway" value="gateway" />
            <el-option label="controller" value="controller" />
            <el-option label="client" value="client" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-container>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="EditSdpsubmit">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {

  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {EditSdp} from "@/api/api";
import { ElMessage, type FormInstance } from 'element-plus';
const dialogFormVisible=ref(false)
const formLabelWidth = '140px'
const form = reactive({
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
      })
const rules = {
        name:[{ required: true,message: "请输入组件名称" , trigger: 'blur'}],
        country:[{ required: true,message: "请输入国家" , trigger: 'blur'}],
        state:[{ required: true,message: "请输入州" , trigger: 'blur'}],
        locality:[{ required: true,message: "请输入地址" , trigger: 'blur'}],
        org:[{ required: true,message: "请输入组织" , trigger: 'blur'}],
        type:[{ required: true,message: "请输入种类" , trigger: 'blur'}],
        org_unit:[{ required: true,message: "请输入组织" , trigger: 'blur'}],
        alt_name:[{ required: true,message: "请输入别名" , trigger: 'blur'}],
        email:[{ required: true,message: "请输入邮箱" , trigger: 'blur'}],
        valid:[{ required: true,message: "请输入合法性" , trigger: 'blur'}],
        serial:[{ required: true,message: "请输入是否序列化" , trigger: 'blur'}],
      }

const baseForm=ref<FormInstance>()
const EditSdpsubmit =()=> {
      console.log(form);
      confirmOperation();
      let formData = new FormData();
      for (var key in form) {
        formData.append(key, form[key]);
      }
      EditSdp(formData,this);
      dialogFormVisible.value = false;
    }
const confirmOperation =()=> {
  baseForm.value?.validate((valid) => {
        if (!valid) {
          ElMessage({
          message: 'Warning, 请调整数据后再请求.',
          type: 'warning',
          })
          return false
        }
        // operation code
      })
    }
    defineExpose({
      dialogFormVisible,
      form,
    })
</script>

