<template>
    <div class="main">
        <div class="box">
            <div class="text_center">请选择减速器类型:
                <el-select v-model="series" :placeholder="options[0].label">
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
                <el-button type="primary" plain @click="toSearch()">搜索</el-button>
                <el-button type="success" plain @click="interSearch">智能推荐</el-button>
            </div>
        </div>
        <div class="box threeData" v-if="threeData.power != undefined">
            <p class="p_text">额定功率、输入转速和输出转速参数分析</p>
            <ThreeData  :threeData="threeData"/>
        </div>
        <div class="box viewBox"  v-if="threeData.power != undefined">
            <el-row :gutter="20">
                    <el-col :span="9">
                        <p class="p_text">齿面硬度、安装形式统计</p>
                        <TypeInstall  :countType="countType"/>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="13">
                        <p class="p_text">减速比、许用扭矩统计</p>
                        <SlowTorque  :slow_torque="slow_torque"/>
                    </el-col>
            </el-row>
        </div>
        <div class="box dataBox" v-if="threeData.power != undefined">
            <p class="p_text">减速器设计方案推荐参数</p>
            <div class="BoxTable">
            <el-row :gutter="20">
                <el-col :span="4">
                    <div>额定功率</div>
                    <div>3.3 kw</div>
                </el-col>
                <el-col :span="4">
                    <div>输入转速</div>
                    <div>960 r/min</div>
                </el-col>
                <el-col :span="4">
                    <div>输出转速</div>
                    <div>50 r/min</div>
                </el-col>
                <el-col :span="4">
                    <div>许用扭矩</div>
                    <div>500 Nm</div>
                </el-col>
                <el-col :span="4">
                    <div>减速比</div>
                    <div> 50 </div>
                </el-col>
                <el-col :span="4">
                    <div>级数</div>
                    <div>2 级</div>
                </el-col>
            </el-row>
            </div>
            <div class="BoxTable" style="border-bottom: 1px solid #DFDEDE;">
            <el-row :gutter="20">
                <el-col :span="4">
                    <div>齿面类型</div>
                    <div>软齿面</div>
                </el-col>
                <el-col :span="4">
                    <div>布局</div>
                    <div>展开式</div>
                </el-col>
                <el-col :span="4">
                    <div>安转形式</div>
                    <div>卧式</div>
                </el-col>
                <el-col :span="4">
                    <div>使用范围</div>
                    <div>运输机、冶金</div>
                </el-col>
                <el-col :span="4">
                    <div>齿轮类型</div>
                    <div>圆柱齿轮减速机</div>
                </el-col>
                <el-col :span="4">
                    <div>价格</div>
                    <div>¥1136</div>
                </el-col>
            </el-row>
            </div>
        </div>
        <div class="box" style="margin: 10px auto;">
            <Table1  :tableData="tableData" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"; 
import axios from "../api";
import Table1 from "./Table1.vue";
import ThreeData from "./ThreeData.vue";
import TypeInstall from "./DataView/TypeInstall.vue";
import SlowTorque from "./DataView/SlowTorque.vue";

interface TypeData {
    label: string,
    value: string,
}
interface InputData {
    [key: string]: number
}
// 服务器响应数据的格式
interface ResponseData {
    data: itemData[],
    power: any[],
    input_rev: any[],
    output_rev: any[],
    num: any[],
}

interface itemData {
    id: number,
    power: string,
    input_rev: string,
    output_rev: string,
    allow_torque: string,
    series: number | string,
    slow_ratio: string,
    wheel_hard: string,
    layout: string,
    installation: string,
    price: string | number,
    sale_sum: string | number,
    score: number | string,
}

// 图表的三个数据
interface ThreeData {
    power: any[],
    input_rev: any[],
    output_rev: any[],
    num: any[],
}

const series = ref('2')
const tableData = ref([] as itemData[])
const threeData = ref( {} as ThreeData)
const flag = ref(false)
const countType = ref([] as any)
const slow_torque = ref({} as any)

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

const toSearch = (msg:string='') => {
    if(flag.value) {
        flag.value = false
    }
    // 先打印一下输入了哪些数据
    // console.log(inputData.value)
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
    if(series.value === '') {
        alert('请选择减速器类型')
        return
    }
    axios.get('/api/recommend', {
        params: {
            ...inputData.value,
            series: series.value,
            flag: msg
        }
    }).then(res => {
        const data = res.data as ResponseData
        tableData.value = data.data
        console.log('响应数据', data)
        countType.value = getTypeInstall(data.data)
        slow_torque.value = getSlowTorque(data.data)
        console.log('减速比、许用扭矩', slow_torque.value)
        // 如果有三个数据，就把三个数据放进去
        if (data.power.length > 3) {
            console.log('装数据', res.data)
            threeData.value['power'] = data.power as any        
            threeData.value['input_rev'] = data.input_rev as any
            threeData.value['output_rev'] = data.output_rev as any
            threeData.value['num'] = data.num as any
        }
    })
}

const interSearch = function() {
    flag.value = true
    toSearch('1')
}

const getTypeInstall = function(data: itemData[]) {
    let type = new Map();
    data.forEach(element => {
        if(element.wheel_hard) { // 如果有这个属性
            if(type.has(element.wheel_hard)) {
                type.set(element.wheel_hard, type.get(element.wheel_hard) + 1)
            } else {
                type.set(element.wheel_hard, 1)
            }
        } 
        if(element.layout) {
            if(type.has(element.layout)) {
                type.set(element.layout, type.get(element.layout) + 1)
            } else {
                type.set(element.layout, 1)
            }
        }
        if(element.installation) {
            if(type.has(element.installation)) {
                type.set(element.installation, type.get(element.installation) + 1)
            } else {
                type.set(element.installation, 1)
            }
        }
    });
    let res = [...type.entries()]
    return res
}

const getSlowTorque = function(data: itemData[]) {
    let slow_data = [] as any[];
    let torque_data = [] as any[];
    data.forEach(element => {
        if(element.slow_ratio) { // 如果有这个属性
            slow_data.push(element.slow_ratio);
        } else { // 如果没有这个属性, slow_ratio默认设置为 49.94
            slow_data.push('49.94');
        }
        if(element.allow_torque) {
            // 如果数据中存在 ~、-,就取第一个或者默认 500
            if(element.allow_torque.indexOf('~') !== -1) {
                element.allow_torque = element.allow_torque.split('~')[0]
            } else if(element.allow_torque.indexOf('-') !== -1) {
                element.allow_torque = element.allow_torque.split('-')[0]
            };
            torque_data.push(element.allow_torque);
        } else { // 如果没有，allow_torque 默认设置为 500
            torque_data.push('500');
        }
    });
    let res = {
        slow_data,
        torque_data
    }
    return res
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
    margin: 10px 0;
}
.threeData {
    height: 400px;
}
.viewBox {
    height: 350px;
    margin: 10px auto;
}
.dataBox {
    height: 150px;
    margin: 10px auto;
    padding: 10px;
    text-align: center;
}
.BoxTable {
    border-top: 1px solid #DFDEDE;
    border-left: 1px solid #DFDEDE;
    border-right: 1px solid #DFDEDE;
    border-radius: 5px;
}
</style>
