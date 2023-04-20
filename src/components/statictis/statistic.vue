<template>
    <el-row :gutter="16"
            justify="space-evenly"
            class = "stat_row"
    >
            <!--
            <div class="footer-item">
              <el-icon :size="14">
                <ArrowRight />
              </el-icon>
            </div>
            -->
            <StatisticCard v-for="stat in props.statistics" :stat="stat"></StatisticCard>
    </el-row>
  </template>
  
  <script lang="ts" setup>
import type { table_stat } from '../utils/types';
import { ref, h,render,onMounted} from 'vue'
import StatisticCard from './statistic-card.vue';

  type Props = {
        statistics :table_stat[]
    }
    const props = defineProps<Props>()
    console.log(props.statistics,'aa')
    console.log(props.statistics.length)
    const add_stat = () =>{
        props.statistics.forEach(stat => {
          console.log(stat)
          render(h(StatisticCard,{stat}),document.body)
        
		    //使用render函数把组件挂载到容器上
		    //第一个参数是我们使用h函数创造的VNode
		      //第二个参数是需要挂载的位置
        });
    }
  add_stat()



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
  