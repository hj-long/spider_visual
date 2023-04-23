<template>
    <div class="main">
        <div class="box">
            <p class="text_center">请选择减速器参数方案:
                <el-select v-model="value1" :placeholder="options[0].label">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </p>
            <div class="radio_box">
                <el-radio-group v-model="radio
                " @change="radio_event">
                    <el-radio-button label="额定功率" />
                    <el-radio-button label="输出转速" />
                    <el-radio-button label="输出转矩" />
                    <el-radio-button label="许用扭矩" />
                </el-radio-group>
                <div class="input_box">
                    <el-input type="text" v-model="value2" class="select_input" :placeholder="tip"/>
                    <span class="unit">{{ unit }}</span>
                </div>
            </div>
        </div>
        <div class="box">
            <MotorBox />
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
import MotorBox from "./view/MotorBox.vue"; 

const radio = ref('额定功率')
const value1 = ref('')
const value2 = ref('')
const unit = ref('(kw)')
const tip = ref('请输入额定功率')
const show = ref(false)
const len = ref(0)
const count = ref()
const options = ref([
    {label: '一级圆柱齿轮减速机', value: '1'},
    {label: '二级圆柱齿轮减速机', value: '2'},
    {label: '三级圆柱齿轮减速机', value: '3'},
])

function radio_event() {
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

function autoMake() {
    if(value2.value == '') {
        ElMessageBox.alert('请先输入减速器的参数')
        return
    }
    axios.get('/api/get_data', {
        params: {
            power: value2.value,
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

/* 动画 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
