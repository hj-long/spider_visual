<template>
    <div class="main">
        <p class="text_center">请输入输入减速器参数:</p>
        <div class="radio_box">
            <el-radio-group v-model="radio" size="large" @change="radio_event">
                <el-radio-button label="额定功率" />
                <el-radio-button label="输出转速" />
                <el-radio-button label="输出转矩" />
                <el-radio-button label="许用扭矩" />
            </el-radio-group>
            <div class="input_box">
                <el-input type="text" v-model="value" class="select_input"/>
                <span class="unit">{{ unit }}</span>
            </div>
        </div>
        <p class="text_center">选择电动机类型:</p>
        <div>
            
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const radio = ref('额定功率')
const value = ref('')
const unit = ref('(kw)')

function radio_event() {
    console.log(radio.value)
    switch (radio.value) {
        case '额定功率':
            unit.value = '(kw)'
            break;
        case '输出转速':
            unit.value = '(rpm)'
            break;
        case '输出转矩':
            unit.value = '(Nm)'
            break;
        case '许用扭矩':
            unit.value = '(Nm)'
            break;
        default:
            break;
    }
}

</script>

<style scoped>
.main {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
    border-radius: 10px;
}
.text_center {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
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
</style>
