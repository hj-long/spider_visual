<template>
  <div ref="echart_1" style="height: 240px; width: 100%; border: 1px solid #F5DFDF;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, toRefs, watch } from "vue";
import * as echarts from 'echarts'

const echart_1 = ref()

onMounted(() => {
  draw()
})

const porps = defineProps<{
    option: any
}>()

const { option } = toRefs(porps)

watch(
  () => option.value,
  ()=>{ draw() },
  {deep: true}
)


function draw() {
  var myChart = echarts.init(echart_1.value)
  myChart.setOption(option.value)
}

</script>