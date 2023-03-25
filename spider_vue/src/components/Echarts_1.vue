<template>
  <div ref="echart_1" style="height: 270px; width: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import * as echarts from 'echarts'

const echart_1 = ref()

onMounted(() => {
  draw()
})

const porps = defineProps({
  option: {
    type: Object,
    default: () => {}
  }
})

const option = porps.option

function draw() {
  var myChart = echarts.init(echart_1.value)
  myChart.setOption(option)
}

</script>