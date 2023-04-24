<template>
    <div class="textCenter">第一步：输入技术参数</div>
    <div class="select_val">
        <span class="span1">选择一个合适的参数范围：</span>
        <el-select v-model="selected" :placeholder='options[0].label'>
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <span class="span2">:</span>
        <el-input v-model="input1" class="select_input" />
        <span class="span2"> -- </span>
        <el-input v-model="input2" class="select_input" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const options = ref([
    {
        value: '1',
        label: '额定功率(kw)'
    },
    {
        value: '2',
        label: '输入转速(rpm)'
    },
    {
        value: '3',
        label: '输出转速(rpm)'
    },
    {
        value: '4',
        label: '许用扭矩(Nm)'
    },
    {
        value: '5',
        label: '减速比'
    }
])

const selected = ref('')

const input1 = ref('')
const input2 = ref('')


</script>

<style scoped>
.select_val {
    margin: 10px auto;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
} 

.el-select {
    width: 150px;
}
.select_input {
    display: inline-block;
    width: 150px;
}
.span1 {
    margin: 0 5px 0 50px;
    color: #38393B;
}
.span2 {
    margin: 0 5px;
    color: gray;
}

</style>