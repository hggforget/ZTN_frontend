<template>
  <el-container>

    <el-main>
      <el-scrollbar>
        <el-table

            :default-sort="{ prop: 'sdpid', order: 'descending' }"
            stripe
            style="width: 100%">
          <el-table-column type="selection" width="40" />
          <el-table-column
              prop="sdpid"
              label="sdpid"
              sortable>
          </el-table-column>
          <el-table-column
              prop="valid"
              label="valid">
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
              prop="alt_name"
              label="alt_name">
          </el-table-column>
          <el-table-column
              prop="email"
              label="email">
          </el-table-column>
          <el-table-column label="Operations">
            <template #default="scope">
              <el-button size="small"
              >Edit</el-button
              >
              <el-button
                  size="small"
                  type="danger"
              >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-main>
    <v-chart :option="option"></v-chart>
  </el-container>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';




const option = reactive({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
});

</script>

<style scoped>

</style>