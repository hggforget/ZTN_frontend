<template>
  <el-table
      :data="sdps"
      stripe
      style="width: 100%">
    <el-table-column
        prop="sdpid"
        label="sdpid"
        width="80">
    </el-table-column>
    <el-table-column
        prop="valid"
        label="valid"
        width="80">
    </el-table-column>
    <el-table-column
        prop="type"
        label="type">
    </el-table-column>
    <el-table-column
        prop="country"
        label="country">
    </el-table-column>
    <el-table-column
        prop="state"
        label="state">
    </el-table-column>
    <el-table-column
        prop="locality"
        label="locality">
    </el-table-column>
    <el-table-column
        prop="org"
        label="org">
    </el-table-column>
    <el-table-column
        prop="org_unit"
        label="org_unit">
    </el-table-column>
    <el-table-column
        prop="org_unit"
        label="org_unit">
    </el-table-column>
    <el-table-column
        prop="alt_name"
        label="alt_name">
    </el-table-column>
    <el-table-column
        prop="email"
        label="email">
    </el-table-column>
    <el-table-column
        prop="email"
        label="email">
    </el-table-column>
  </el-table>
</template>

<script>

import {getSdps} from '../api/api.js'
export default {
  data () {
    return {
      // books list data
      sdps: [
      ]
    }
  },
  methods: {
    loadSdps () {
      getSdps().then(response => {
        this.sdps = response.data.Sdps
        console.log(response.data.Sdps)
      })
    }
  },
  created: function () {
    this.loadSdps()
  }
}
</script>