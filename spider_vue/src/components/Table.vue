<template>
    <div class="table1">
        <el-table :data="tableData1" style="width: 100%" empty-text="暂无数据...请点击上方输入框输入内容进行搜索...">
          <el-table-column prop="title" label="名称"/>
          <el-table-column prop="type" label="型号" width="100" />
          <el-table-column prop="price" label="价格" width="100" />
          <el-table-column prop="factory_name" label="厂家" />
          <el-table-column prop="series" label="级数" width="80" />
          <el-table-column prop="use_scope" label="用途" width="180" />
          <el-table-column prop="wheel_type" label="齿轮类型" width="180" />
          <el-table-column prop="address" label="地区" />
          <el-table-column prop="link" label="查看详情" width="150">
            <template #default="{ row }">
              <el-button type="primary" @click="handleClick(row.link)">点击查看详情</el-button>
            </template>
          </el-table-column>
      </el-table>
      <div class="pageDiv">
          <el-pagination
              v-model="currentPage"
              background
              layout="prev, pager, next, total"
              :total="props.tableData.total_count"
              class="mt-4"
              @current-change="handleCurrentChange"
          />
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const tableData1 = ref([])
const currentPage = ref(1)

// 接受父组件传递的数据
const props = defineProps({
    tableData: {
        data: Array,
        total: Number,
        current_page: Number,
        total_count: Number,
        total_page: Number
    } as any
})

// 执行父组件传递的方法
const emit = defineEmits(['page_change'])

// 监听父组件传递的数据
watch(() => props.tableData, (newVal) => {
    tableData1.value = newVal.data
})

const handleClick = (link: string) => {
    window.open(link)
}

const handleCurrentChange = (val: number) => {
    currentPage.value = val
    console.log('子组件页码', currentPage.value)
    emit('page_change', currentPage.value)
}

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
</style>