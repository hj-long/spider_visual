<template>
    <div class="home">
        <p class="search">
            <input type="text" placeholder="输入参数数据" v-model="search">
            <el-button type="primary">搜索</el-button>
        </p>
        <div class="show_data">
            <p>减速器类型:</p>
            <div>

                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const search = ref('')
const type_data = axios.get('http://127.0.0.1:8000/data/count/')
    .then(res => {
        console.log(res.data)
        return res.data
    }).catch(err => {
        console.log(err)
    })

</script>

<style scoped>
.home {
    width: 100%;
    height: 100%;
    margin: auto;
}
.search {
    display: flex;
    margin: 10px auto;
    width: 500px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    font-size: 18px;
    background-color: #fff;
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
    background-color: #FAFAFA;
    border-radius: 10px;
    padding: 15px;
}
</style>