<template>

    <div ref="mychart" style="width: 100%;"></div>
    
</template>


    <script lang="ts" setup>
      import * as echarts from 'echarts';
      import { useLogListStore } from '@/stores/Logs';
    import { nextTick, ref, shallowRef } from 'vue';
import type { EChartsOption } from 'echarts';
import type { GraphData } from '../utils/interfaces';
import { link } from 'fs';
import { tr } from 'element-plus/es/locale';

const graph=ref<GraphData>()
graph.value={
  nodes:[
    {
        id: "2",
        name: "SDPcontroller",
        symbolSize: 19.12381,
        value: 280.685715,
        category: "控制器"
    },
    {
        id: "1",
        name: "SDPclient",
        symbolSize: 19.12381,
        value: 100.685715,
        category: "客户端"
    },
    {
        id: "3",
        name: "SDPgateway",
        symbolSize: 19.12381,
        value: 180.685715,
        category: "网关"
    },
    {
        id: "4",
        name: "SDPcontroller2",
        symbolSize: 30.12381,
        value: 100.685715,
        category: "控制器"
    },
    {
        id: "5",
        name: "SDPcontroller2",
        symbolSize: 30.12381,
        value: 100.685715,
        category: "控制器"
    },
    {
        id: "6",
        name: "SDPcontroller2",
        symbolSize: 30.12381,
        value: 100.685715,
        category: "控制器"
    },
    {
        id: "7",
        name: "SDPcontroller2",
        symbolSize: 30.12381,
        value: 100.685715,
        category: "控制器"
    },
  ],
  links:[
    {
        source:"2",
        target:"3",
    },
    {
        source:"1",
        target:"3",
    },
    {
        source:"3",
        target:"2",
    },
    {
        source:"1",
        target:"4",
    }
  ],
  categories:[
    {
      name:"控制器"
    },
    {
      name:"网关"
    },
    {
      name:"客户端"
    }
  ]
}
 const option =ref<EChartsOption>()
const mychart=ref<HTMLElement>()
const chart = shallowRef();
  interface GraphNode {
  symbolSize: number;
  label?: {
    show?: boolean;
  };
}
  graph.value.nodes.forEach(function (node: GraphNode) {
    node.label = {
      show: node.symbolSize > 30
    };
  });
    option.value = {
    title: {
      text: '测试网络图',
      subtext: 'Default layout',
      top: 'bottom',
      left: 'right'
    },
    tooltip: {},
    legend: [
      {
        // selectedMode: 'single',
        data: graph.value.categories.map(function (a: { name: string }) {
          return a.name;
        })
      }
    ],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'force',
        data: graph.value.nodes,
        links: graph.value.links,
        categories: graph.value.categories,
        roam: true,
        draggable:true,
        edgeSymbol: ['none', 'arrow'],
        label: {
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 10
          }
        },
        force: {
        repulsion: 1000,
        edgeLength: 300,
        gravity:0.2
        }
      }
    ]
  };

      const load = () =>{
          nextTick(()=>{
            if(chart.value)
                chart.value.dispose()
              chart.value=echarts.init(mychart.value!)
              chart.value.setOption(option.value,true)
              chart.value.resize()
          })
        }
      
      
      
        defineExpose({
            load,
          })
    
    </script>
    
    
    <style scoped>
    
    
    
    </style>