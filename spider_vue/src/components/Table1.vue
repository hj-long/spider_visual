<template>
    <div class="table1">
        <div class="title">
            数据库中共找到 {{ props.tableData.length }} 条数据
        </div>
        <el-table :data="tableData1" style="width: 100%" empty-text="暂无数据...">
          <el-table-column prop="id" label="id" width="80"/>
          <el-table-column prop="power" label="额定功率" width="120" />
          <el-table-column prop="input_rev" label="输入转速" width="120" />
          <el-table-column prop="output_rev" label="输出转速范围" width="120"/>
          <el-table-column prop="allow_torque" label="许用扭矩" width="180" />
          <el-table-column prop="series" label="级数" width="80" />
          <el-table-column prop="slow_ratio" label="减速比" width="180" />
          <el-table-column prop="wheel_hard" label="齿面" />
          <el-table-column prop="price" label="价格" />
          <el-table-column prop="sale_sum" label="销量" />
          <el-table-column prop="score" label="得分" width="80" />
      </el-table>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch, defineEmits } from 'vue';

const tableData1 = ref([])

// 接受父组件传递的数据
const props = defineProps({
    tableData: [] as any
})

// 监听父组件传递的数据
watch(() => props.tableData, (newVal) => {
    tableData1.value = newVal
})


</script>

<style scoped>
.pageDiv {
    display: flex;
    justify-content: end;
    margin: 8px 20px;
    background-color: #fff;
}
.table1 {
    background-color: #fff;
    border: 1px solid lightcyan;
}
.title {
    padding: 10px 20px;
    font-size: 16px;
    text-align: center;
}
</style>