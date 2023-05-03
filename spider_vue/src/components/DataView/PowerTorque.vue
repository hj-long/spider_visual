<template>
    <div ref="echartsRef" style="height: 100%;width: 100%;"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import axios from "../../api";

const echartsRef = ref();

interface ResponseData {
    data1: any[],
    power_data: any[],
    torque_data: any[],
}

// 从后台获取数据
axios.get("/api/data_view1").then((res) => {
    let data = res.data as ResponseData;
    let myChart = echarts.init(echartsRef.value);
    let options = getOption(data, data.power_data.length);
    myChart.setOption(options);
});


const getOption = function(data: any, len: number = 12) {
    let options = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['额定功率', '许用扭矩']
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
            name: '额定功率',
            type: 'bar',
            tooltip: {
                // 显示单位
                valueFormatter: function (value: any) {
                    return value + 'kW';
                }
            },
            data: data.power_data || [
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