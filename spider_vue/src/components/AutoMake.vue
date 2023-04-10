<template>
    <div class="main">
        <!-- 进度条 -->
        <!-- <div class="box">
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="输入技术参数" />
                <el-step title="自动计算" />
                <el-step title="返回结果" />
            </el-steps>
        </div> -->
        <div class="box">
            <p class="text_center">请输入减速器参数:</p>
            <div class="radio_box">
                <el-radio-group v-model="radio" @change="radio_event">
                    <el-radio-button label="额定功率" />
                    <el-radio-button label="输出转速" />
                    <el-radio-button label="输出转矩" />
                    <el-radio-button label="许用扭矩" />
                </el-radio-group>
                <div class="input_box">
                    <el-input type="text" v-model="value1" class="select_input" :placeholder="tip"/>
                    <span class="unit">{{ unit }}</span>
                    <!-- <div style="margin: 10px 0;">
                        <el-button @click="enSure">确定</el-button>
                        <el-button @click="beEnsure">取消</el-button>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="box">
            <p class="text_center">选择电动机类型:
                <el-select v-model="value2" :placeholder="options[0].label">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </p>
            <div class="table_box">
                <table>
                    <!-- 表头 -->
                    <thead>
                        <tr>
                            <th>电机类型</th>
                            <th>额定功率(kw)</th>
                            <th>额定电压(V)</th>
                            <th>额定电流(A)</th>
                            <th>额定转速(rpm)</th>
                            <th>额定转矩(Nm)</th>
                            <th>许用扭矩(Nm)</th>
                            <th>许用转速(rpm)</th>
                            <th>许用电流(A)</th>
                            <th>许用电压(V)</th>
                        </tr>
                    </thead>
                    <!-- 表体 -->
                    <tbody>
                        <tr>
                            <td>Y180L-6异步电动机</td>
                            <td>15</td>
                            <td>380</td>
                            <td>1000</td>
                            <td>1500</td>
                            <td>0.5</td>
                            <td>0.5</td>
                            <td>1500</td>
                            <td>1000</td>
                            <td>380</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="box">
            <p class="text_center">
                减速器设计参数生成：
                <el-button type="primary" plain>自动计算</el-button>
                <el-button type="success" plain @click="autoMake">数据库智能推荐</el-button>
            </p>
        </div>
        <Transition>
            <div class="box" v-if="show"> 
                <p class="text_center">数据库共有 {{ len }} 条商品数据基本符合要求，参数统计结果如下：</p>
                <el-space wrap alignment="none">
                    <!-- 循环对象，{'name':{'a':1,'b':3...}} -->
                    <el-card v-for="i in Object.keys(count as any)" :key="i" class="box-card" style="width: 250px">
                    <template #header>
                        <div class="card-header">
                            <!-- 对象属性名 -->
                            <span>{{ i }}</span>
                        </div>
                    </template>
                    <div>数值统计：</div> 
                    <div v-for="o in Object.keys(count[i])" :key="o" class="text item">
                        {{ o }}: 出现 {{ count[i][o] }} 次
                    </div>
                    </el-card>
                </el-space>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
import { ref, onMounted } from "vue"; 
import axios from "../api";

const radio = ref('额定功率')
const value1 = ref('')
const value2 = ref('')
const unit = ref('(kw)')
const tip = ref('请输入额定功率')
const show = ref(false)
const len = ref(0)
const count = ref()

function radio_event() {
    console.log(radio.value)
    switch (radio.value) {
        case '额定功率':
            unit.value = '(kw)'
            tip.value = '请输入额定功率'
            break;
        case '输出转速':
            unit.value = '(rpm)'
            tip.value = '请输入输出转速'
            break;
        case '输出转矩':
            unit.value = '(Nm)'
            tip.value = '请输入输出转矩'
            break;
        case '许用扭矩':
            unit.value = '(Nm)'
            tip.value = '请输入许用扭矩'
            break;
        default:
            break;
    }
}

const active = ref(0)
function enSure() {
    console.log(value1.value)
    active.value++
    if(active.value > 3) {
        active.value = 0
    }
}

function beEnsure() {
    console.log('取消')
    active.value = 0
}

const options = ref([
    {
        value: '1',
        label: 'Y180L-6异步电动机'
    },
])

function autoMake() {
    if(value1.value == '') {
        ElMessageBox.alert('请先输入减速器的参数')
        return
    }
    axios.get('/api/get_data', {
        params: {
            power: value1.value,
        }
    }).then(res => {
        console.log(res.data)
        len.value = res.data.data.length
        count.value = res.data.count
        show.value = true
    })
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
    font-weight: bold;
    padding: 10px 0;
}
.box {
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #DFDEDE;
    margin: 20px;
}
.radio_box {
    text-align: center;
}
.input_box {
    margin: 10px auto;
}

.select_input {
    width: 200px;
}
.unit {
    margin-left: 10px;
}
table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #DFDEDE;
}
th, td {
    border: 1px solid #DFDEDE;
    padding: 5px;
    text-align: center;
}
.table_box {
    padding: 15px;
}
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
