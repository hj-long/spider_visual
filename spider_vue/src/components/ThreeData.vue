<template>
    <div ref="echartsRef" style="height: 100%;width: 100%;"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch} from "vue";
import * as echarts from 'echarts'


// 接收父组件传递的参数
const props = defineProps<{
    threeData: {
        power: any[],
        input_rev: any[],
        output_rev: any[],
        num: any[],
    }
}>()

const echartsRef = ref()

// 拿到父组件传递的参数
const threeData = ref(props.threeData)

onMounted(() => {
    echartData.value = props.threeData
    let option = getOption(echartData.value)
    initEchart(echartsRef.value, option);
})

// 初始配置数据
const echartData = ref({
    power: [2.0, 2.2, 3.3, 4.5, 6.3, 8.2, 6.3, 3.4, 5.0, 6.5],
    input_rev: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0],
    output_rev: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8],
    num: ['减速机1', '减速机2', '减速机3', '减速机4', '减速机5', '减速机6', '减速机7', '减速机8', '减速机9', '减速机10', '减速机11', '减速机12', '减速机13', '减速机14', '减速机15',],
})


// 监听父组件传递的参数
watch(()=> threeData.value, (newVal)=> {
    console.log('监听到变化：', newVal)
    echartData.value = newVal
    // 重新绘制
    let option = getOption(echartData.value)
    initEchart(echartsRef.value, option);
}, {deep: true})

function initEchart(echartsRef: HTMLElement, option: any) {
    const myChart = echarts.init(echartsRef)
    myChart.setOption(option, true)
    return myChart
}

const getOption = function(data: any) {
    let options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
            }
        },
        toolbox: {
            feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            // saveAsImage: { show: true }
            }
        },
        legend: {
            data: ['功率', '输入转速', '输出转速']
        },
        xAxis: [
            {
            type: 'category',
            data: data.num,
            axisPointer: {
                type: 'shadow'
            }
            }
        ],
        yAxis: [
            // 左右两个y轴
            {
            type: 'value',
            name: '输入转速',
            min: 0,
            max: 1500,
            interval: 100,
            axisLabel: {
                formatter: '{value} rpm'
            }
            },
            {
            type: 'value',
            name: '功率',
            min: 0,
            max: 20,
            interval: 2,
            axisLabel: {
                formatter: '{value} kw'
            }
            }
        ],
        series: [
            {
            name: '输入转速',
            type: 'bar',
            tooltip: {
                valueFormatter: function (value: any) {
                return value + ' rpm';
                }
            },
            data: data.input_rev
            },
            {
            name: '输出转速',
            type: 'bar',
            tooltip: {
                valueFormatter: function (value: any) {
                return value + ' rpm';
                }
            },
            data: data.output_rev
            },
            {
            name: '功率',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
                valueFormatter: function (value: any) {
                return value + ' kw';
                }
            },
            data: data.power
            }
        ]
    }
    return options
}


</script>

<style scoped>

</style>