<template>
  <el-container>

    <el-main>
      <el-scrollbar>
        <el-table
            :data="sdps"
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
              <el-button size="small" @click="handleEdit(scope.$index, scope.row);"
              >Edit</el-button
              >
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-main>

  </el-container>
</template>

<script>
export default {
  name: "VMmanager"
}
</script>

<style scoped>

</style>