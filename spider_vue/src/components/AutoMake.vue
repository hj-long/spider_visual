<template>
    <div class="main">
        <!-- 进度条 -->
        <div class="box">
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="输入技术参数" />
                <el-step title="自动计算" />
                <el-step title="返回结果" />
            </el-steps>
        </div>
        <div class="box">
            <p class="text_center">请输入输入减速器参数:</p>
            <div class="radio_box">
                <el-radio-group v-model="radio" @change="radio_event">
                    <el-radio-button label="额定功率" />
                    <el-radio-button label="输出转速" />
                    <el-radio-button label="输出转矩" />
                    <el-radio-button label="许用扭矩" />
                </el-radio-group>
                <div class="input_box">
                    <el-input type="text" v-model="value" class="select_input" :placeholder="tip"/>
                    <span class="unit">{{ unit }}</span>
                    <div style="margin: 10px 0;">
                        <el-button @click="enSure">确定</el-button>
                        <el-button @click="beEnsure">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="box">
            <p class="text_center">选择电动机类型:</p>
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
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const radio = ref('额定功率')
const value = ref('')
const unit = ref('(kw)')
const tip = ref('请输入额定功率')

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
    console.log(value.value)
    active.value++
    if(active.value > 3) {
        active.value = 0
    }
}

function beEnsure() {
    console.log('取消')
    active.value = 0
}

</script>

<style scoped>
.main {
    width: 100%;
    height: 100%;
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
</style>
