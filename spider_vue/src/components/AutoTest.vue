<template>
    <div class="main">
        <div class="box">
            <div class="text_center">请选择减速器类型:
                <el-select v-model="value1" :placeholder="options[0].label">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </div>
            <div class="paramsBox">
                <div class="params" v-for="t in typeData" :key="t.value">
                    <div class="p_text">{{ t.label }}</div>
                    <el-input class="p_input" placeholder="请输入数据" v-model="inputData[t.value]"></el-input>
                </div>
            </div>
            <div class="text_center">
                <el-button type="primary" plain @click="toSearch">搜索</el-button>
                <el-button type="success" plain @click="interSearch">智能推荐</el-button>
            </div>
        </div>
        <div class="box">
            <Table1  :tableData="tableData" @page_change="pageChange"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"; 
import axios from "../api";
import Table1 from "./Table1.vue";

interface TypeData {
    label: string,
    value: string,
}
interface InputData {
    [key: string]: number
}

const value1 = ref('')
const tableData = ref([])

const options = ref([
    {label: '一级圆柱齿轮减速机', value: '1'},
    {label: '二级圆柱齿轮减速机', value: '2'},
    {label: '三级圆柱齿轮减速机', value: '3'},
])

const typeData = [
    {label: '额定功率(kw)', value: 'power'},
    {label: '输入转速(rpm)', value: 'input_rev'},
    {label: '输出转速(rpm)', value: 'output_rev'},
    {label: '许用扭矩(Nm)', value: 'allow_torque'},
    {label: '减速比', value: 'slow_ratio'},
] as TypeData[]

const inputData = ref({} as InputData)

const toSearch = () => {
    // 先打印一下输入了哪些数据
    console.log(inputData.value)
    // 如果一个参数都没有输入，就不发请求
    if (Object.keys(inputData.value).length === 0) {
        alert('请至少输入一个参数')
        return
    }
    // 如果不是数字，就不发请求
    for (let key in inputData.value) {
        if (isNaN(inputData.value[key])) {
            alert('请输入数字')
            return
        }
    }
    if(value1.value === '') {
        alert('请选择减速器类型')
        return
    }
    axios.get('/api/recommend', {
        params: {
            ...inputData.value,
            series: value1.value
        }
    }).then(res => {
        console.log(res)
        tableData.value = res.data
    })
}

const interSearch = function() {
    console.log(value1.value)
}

const pageChange = function(page: number) {
    console.log(page)
}

</script>

<style scoped>
.main {
    width: 100%;
    min-height: 100%;
    background-color: #F5F5F5;
    border-radius: 10px;
    position: relative;
    /* 解决高度问题 */
    /* overflow: hidden; */
    border: 1px solid lightcyan;
}
.text_center {
    text-align: center;
    font-size: 16px;
    padding: 10px 0;
}
.box {
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #DFDEDE;
    margin: 20px;
}
.paramsBox {
    padding: 0 5px;
    display: flex;
    justify-content: center;
}
.params {
    width: 150px;
    padding: 5px;
    border: 1px solid #DFDEDE;
    border-radius: 3px;
    margin: 0 5px;
}
.p_text {
    text-align: center;
}

</style>
