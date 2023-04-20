<template>
    <div class="type_box">
        <div ref="echart_1" style="height: 300px; width: 80%; border: 1px solid #F5DFDF;"></div>
    </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { ref, onMounted } from "vue";

const echart_1 = ref()

onMounted(() => {
  draw()
})

function draw() {
  var myChart = echarts.init(echart_1.value)
  myChart.setOption(option.value)
}
const option = ref({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
            type: 'category',
            name: '类型',
            data: ['JZQ100', 'JZQ175', 'JZQ200', 'JZQ250', 'JZQ350', 'JZQ400', 'JZQ500', 'JZQ650', 'JZQ750', 'JZQ850', 'JZQ1000'],
            axisTick: {
                alignWithLabel: true
            },
            axiosLabel: {
                interval: 0,
                rotate: 30
            }
        }
        ],
        yAxis: [
            {
            type: 'value',
            name: '数量'
            }
        ],
        series: [
            {
            name: '数量',
            type: 'bar',
            barWidth: '60%',
            yAxisIndex: 0,
            data: [1, 3, 27, 47, 38, 22, 25, 26, 24, 6, 9]
            }
        ]
    });
</script>

<style scoped>
.type_box {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>