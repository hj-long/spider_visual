<template>
    <div class="home">
        <div class="show_data">
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="输入技术参数" />
                <el-step title="自动计算" />
                <el-step title="返回结果" />
            </el-steps>
            <button @click="next">下一步</button> 
            <div>
                <p>第一步：基本技术参数</p> 
                <el-row :gutter="10" class="form_row">
                    <el-col :span="6">
                        输入功率：<input type="text">kw
                    </el-col>
                    <el-col :span="6">
                        输入转速：<input type="text">
                    </el-col>
                    <el-col :span="6">
                        输入扭矩：<input type="text">
                    </el-col>
                    <el-col :span="6">
                        传动效率：<input type="text">
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-button type="primary">自动计算</el-button>
            </div>                    
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const active = ref(0)

function next() {
    active.value += 1;
    if(active.value > 3) {
        active.value = 0
    }
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
    display: flex;
    margin: 0px auto;
    width: 500px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    font-size: 18px;
    
}
.search input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 10px;
    margin: 0 10px;
}
.search button {
    width: 100px;
    height: 100%;
    border: none;
    outline: none;
    background-color: #409eff;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
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
</style>