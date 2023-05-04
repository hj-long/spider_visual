<template>
    <div ref="echartsRef" style="height: 320px;width: 100%;"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRefs, watch } from "vue";
import * as echarts from "echarts";
import axios from "../../api";

const echartsRef = ref();

const props = defineProps<{
    slow_torque: any,
}>()

// 取出父组件传递的数据
const { slow_torque } = toRefs(props)

onMounted(() => {
    let option = getOption(slow_torque.value, slow_torque.value.slow_data.length);
    initEchart(echartsRef.value, option);
});

watch(() => props.slow_torque, (newVal) => {
    let option = getOption(newVal);
    initEchart(echartsRef.value, option);
});

function initEchart(echartsRef: HTMLElement, option: any) {
    const myChart = echarts.init(echartsRef)
    myChart.setOption(option, true)
    return myChart
}

const getOption = function(data: any, len: number = 12) {
    let options = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['减速比', '许用扭矩']
        },
        toolbox: {
            show: true,
            feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },
            // saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
            type: 'category',
            // 根据len生成x轴的数据 减速器1-12
            data: Array.from({ length: len }, (v, k) => '减速器' + (k + 1).toString())
            }
        ],
        yAxis: [
            {
            type: 'value'
            },
        ],
        series: [
            {
            name: '减速比',
            type: 'bar',
            tooltip: {
                // 显示单位
                valueFormatter: function (value: any) {
                    return value;
                }
            },
            data: data.slow_data || [
                2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ],
            markPoint: {
                data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
                ]
            },
            markLine: {
                data: [{ type: 'average', name: 'Avg' }]
            }
            },
            {
            name: '许用扭矩',
            type: 'bar',
            tooltip: {
                // 显示单位
                valueFormatter: function (value: any) {
                    return value + 'N·m';
                }
            },
            data: data.torque_data || [
                2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ],
            markPoint: {
                data: [
                { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
                { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
                ]
            },
            markLine: {
                data: [{ type: 'average', name: 'Avg' }]
            }
            }
        ]
    };
    return options;
}

</script>

<style scoped></style>