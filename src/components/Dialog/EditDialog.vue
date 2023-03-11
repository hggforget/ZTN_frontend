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
        <el-button type="primary" @click="EditSdp">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from 'vue'
import {EditSdp} from "@/api/api";
export default {
  name: "EditDialog",
  data () {
    return {
      dialogFormVisible: ref(false),
      formLabelWidth: '140px',
      form: reactive({
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
      }),
      rules: {
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
    }
  },
  methods:{
    EditSdp() {
      console.log(this.form);
      this.confirmOperation();
      let formData = new FormData();
      for (var key in this.form) {
        formData.append(key, this.form[key]);
      }
      EditSdp(formData,this);
      this.dialogFormVisible = false;
    },
    confirmOperation() {
      this.$refs.baseForm.validate((valid) => {
        if (!valid) {
          this.$message.warning('请调整数据后再请求')
          return false
        }
        // operation code
      })
    },

  }

}
</script>

<style scoped>

</style>