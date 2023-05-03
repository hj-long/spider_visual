<template>
    <div ref="echartsRef" style="height: 100%;width: 100%;"></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import * as echarts from "echarts";
import axios from "../../api";

const echartsRef = ref();

interface ResponseData {
    data: string,
    price_data: any[],
    sales_data: any[],
}

// 从后台获取数据
axios.get("/api/data_view2").then((res) => {
    let data = res.data as ResponseData;
    let myChart = echarts.init(echartsRef.value);
    let options = getOption(data, data.price_data.length);
    myChart.setOption(options);
    console.log("data_view2", data);
});


const getOption = function(data: any, len: number = 7) {
    let options = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['价格', '销售额']
        },
        xAxis: {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: Array.from({ length: len }, (v, k) => '减速器' + (k + 1).toString())
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            name: '价格',
            tooltip: {
                // 显示单位
                valueFormatter: function (value: any) {
                    return value + '元';
                }
            },
            data: data.price_data || [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
            },
            {
            name: '销售额',
            tooltip: {
                valueFormatter: function (value: any) {
                    return value + '元';
                },
            },
            data: data.sales_data || [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
            }
        ]
    };
    return options;
}


</script>

<style scoped></style>