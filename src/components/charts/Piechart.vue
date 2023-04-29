<template>
        <div ref="mychart" style="width: 100%;background-color: beige;"></div>
  </template>
  
  <script setup lang="ts">
  import { ElContainer } from 'element-plus';
  import { nextTick, reactive, ref, watch } from 'vue';
  import * as echarts from 'echarts';
  import { useLogListStore } from '@/stores/Logs';
  
  
  const LogListstore=useLogListStore()
  const state = reactive({
          logs : LogListstore.logs,
          totalNum:0,
          ErrorNum:0,
          keep_alive:0,
          OtherNum:0
  })
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
          { value: state.totalNum, name: 'Search Engine' },
          { value: state.ErrorNum, name: 'Direct' },
        ]
      }
    ]
  });
  watch(
      () => LogListstore.logs,
      (value, oldValue) => {
        state.logs = LogListstore.logs
        state.totalNum=state.logs.length
        state.ErrorNum=0
        state.keep_alive=0
        state.logs.forEach(log => {
          if (log.type=='error')
            state.ErrorNum+=1
          else if(log.type=='keep_alive')
            state.keep_alive+=1
        state.OtherNum=state.totalNum-state.ErrorNum-state.keep_alive
        });
        console.log(state.ErrorNum)
        option.series[0].data=[
          { value: state.ErrorNum, name: 'ErrorNum' },
          { value: state.keep_alive, name: 'keep_alive' },
          { value: state.OtherNum, name: 'OtherNum' },
        ]
      }, {immediate:true,deep:true}
    )
  
  
  
  
  
  
  
  const mychart=ref<HTMLElement>()
    const chart = ref()
  
  const load = () =>{
      nextTick(()=>{
        if(chart.value)
            chart.value.dispose()
          chart.value=echarts.init(mychart.value!)
          chart.value.setOption(option,true)
          chart.value.resize()
      })
    }
  
  
  
    defineExpose({
        load,
      })
  
  </script>
  
  
  <style scoped>
  
  </style>