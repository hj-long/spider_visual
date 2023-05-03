<template>
    <div class="app_box">
        <div class="show_data">
            <!-- 图表展示 -->
            <div class="show_echarts">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <p style="text-align: center;">数据库中收集了{{ type_length }}种类型的减速器</p>         
                        <Echarts_1 :option="option1"/>
                    </el-col>
                    <el-col :span="4">  
                    </el-col>
                    <el-col :span="10">
                        <p style="text-align: center;">数据库中共收集了3种类型的减速器</p>   
                        <Echarts_1 :option="option2"/>
                    </el-col>
                </el-row>
            </div>
            <div class="search">
                <p style="text-align: center;">JZQ系列减速器不同类型数量分布</p>
                <TypeBar />
            </div>
            <!-- 额定功率与许用扭矩 -->
            <div class="viewBox">
                <p style="text-align: center;">额定功率与许用扭矩分析</p>
                <PowerTorque />
            </div>
            <!-- 商品价格与销售额分析 -->
            <div class="viewBox">
                <p style="text-align: center;">商品价格与销售额分析</p>
                <PriceSale />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject } from "vue";
import axios from "../api";
import Echarts_1 from "./Echarts_1.vue";
import TypeBar from "./TypeBar.vue";
import PowerTorque from "./DataView/PowerTorque.vue";
import PriceSale from "./DataView/PriceSale.vue";

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
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            data: inject("option1")
          }
      ]
    });

const option2 = ref({
        xAxis: {
                data: ['行星减速机1', '摆线针轮减速机', '蜗轮蜗杆减速机', '其他类型']
        },
        yAxis: {},
        series: [
            {
                type: 'bar',
                data: [2512, 53, 53, 526]
            }
        ]
    })

</script>

<style scoped>
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
.viewBox {
    height: 350px;
    margin: 10px auto;
}
</style>