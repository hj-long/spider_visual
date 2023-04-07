<template>
    <div class="home">
        <div class="show_data">
            <!-- 图表展示 -->
            <div class="show_echarts">
                <el-row :gutter="20">
                    <el-col :span="11">
                        <p style="text-align: center;">数据库中收集了{{ type_length }}种类型的减速器</p>         
                        <Echarts_1 :option="option1"/>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="11">
                        <p style="text-align: center;">数据库中共收集了3种类型的减速器</p>   
                        <Echarts_1 :option="option2"/>
                    </el-col>
                </el-row>
            </div>
            <!-- 进度条 -->
            <!-- <el-steps :active="active" finish-status="success" align-center simple>
                <el-step title="输入技术参数" />
                <el-step title="自动计算" />
                <el-step title="返回结果" />
            </el-steps> -->
            <div class="search">
                <Search />
                <div class="textCenter">
                    <el-button type="primary" @click="next" size="large">自动生成</el-button>
                </div>
            </div>                  
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import axios from "axios";
import Search from "./Search.vue";
import Echarts_1 from "../Echarts_1.vue";

const active = ref(0)
const type_length = ref(0)

function next() {
    active.value += 1;
    if(active.value > 3) {
        active.value = 0
    }
}

onMounted(() => {
    type_length.value = inject("type_length") as number
})


const option1 = ref({
        series: [
          {
            type: 'pie',
            data: inject("option1")
          }
      ]});

const option2 = {
    xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {},
    series: [
        {
            type: 'bar',
            data: [23, 24, 18, 25, 27, 28, 25]
        }
    ]
}

</script>

<style scoped>
.home {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
    border-radius: 10px;
}
.search {
    margin: 10px auto;
}

.show_data {
    box-sizing: content-box;
    height: 600px;
    margin: auto;
    padding: 15px;
}
.form_row input {
    height: 27px;
    border: 1px solid #dcdfe6;
    width: 160px;
    margin-right: 3px;
    font-size: 14px;
    padding: 0 8px;
    border-radius: 4px;
    color: #333131;
}
.show_echarts {
    margin: 10px auto;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    padding: 10px;
}
</style>