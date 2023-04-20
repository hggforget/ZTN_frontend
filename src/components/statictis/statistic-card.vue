<template>
    <el-col :span="4">
        <div class="statistic-card">
          <el-statistic :value=props.stat.value>
            <template #title>
              <div style="display: inline-flex; align-items: center">
                {{props.stat.description}}
                <el-tooltip v-if="props.stat.haveContent"
                  effect="dark"
                  :content=props.stat.content
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>{{ props.stat.footer }}</span>
              <span :class="props.stat.footer_type">
                    {{ props.stat.footer_value }}
                <el-icon>
                  <CaretBottom  v-if="props.stat.footer_type==='red'"/>
                  <CaretTop  v-else-if="props.stat.footer_type==='green'"/>
                </el-icon>
              </span>
            </div>
          </div>
        </div>
      </el-col>

</template>

<script setup lang="ts">

import type { table_stat } from '../utils/types';
  type Props = {
        stat :table_stat
    }
    const props = defineProps<Props>()

</script>


<style scoped>
  :global(h2#card-usage ~ .example .example-showcase) {
    background-color: var(--el-fill-color) !important;
  }
  .el-statistic {
    --el-statistic-content-font-size: 28px;
  }
.statistic-card {
    height: 100%;
    padding: 20px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
  }
  
  .statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
  }
  
  .statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
  }
  
  .green {
    color: var(--el-color-success);
  }
  .red {
    color: var(--el-color-error);
  }

</style>