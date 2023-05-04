<template>
    <div ref="echartsRef" style="height: 320px;width: 100%;"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps<{
    countType: [],
}>();

const echartsRef = ref();
const countType = ref(props.countType);

onMounted(() => {
    let option = getOption(countType.value);
    initEchart(echartsRef.value, option);
});

watch(() => props.countType, (newVal) => {
    countType.value = newVal;
    let option = getOption(countType.value);
    initEchart(echartsRef.value, option);
});

function initEchart(echartsRef: HTMLElement, option: any) {
    const myChart = echarts.init(echartsRef)
    myChart.setOption(option, true)
    return myChart
}

const getOption = function(data: [string, number][]) {
    let dataList = data.map( (item) => {return {value: item[1], name: item[0]}});
    let counts = dataList.reduce((prev, cur) => {
        return prev + cur.value;
    }, 0);
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center',
            // doesn't perfectly work with our tricks, disable it
            selectedMode: false
        },
        series: [
            {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            // adjust the start angle
            startAngle: 180,
            label: {
                show: true,
                formatter(param: any) {
                // correct the percentage
                return param.name + ' (' + param.percent * 2 + '%)';
                }
            },
            data: [
                // { value: 12, name: '软齿面' },
                // { value: 3, name: '硬齿面' },
                // { value: 8, name: '展开式' },
                // { value: 4, name: '同轴式' },
                // { value: 3, name: '立式' },
                // { value: 3, name: '卧式' },
                ...dataList,
                {
                // make an record to fill the bottom 50%
                value: counts || 12 + 3 + 8 + 4 + 3 + 3,
                itemStyle: {
                    // stop the chart from rendering this piece
                    color: 'none',
                    decal: {
                    symbol: 'none'
                    }
                },
                label: {
                    show: false
                }
                }
            ]
            }
        ]
        };
    return option;
}



</script>

<style scoped>

</style>