<template>
    <div class="app_box">
        <div class="box">
            <div class="select_key">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ value1 }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                    </span>
                    <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="factory">制造商</el-dropdown-item>
                        <el-dropdown-item command="type">型号</el-dropdown-item>
                        <el-dropdown-item command="use_scope">用途</el-dropdown-item>
                        <el-dropdown-item command="address">地区</el-dropdown-item>
                        <el-dropdown-item command="name">名称</el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div class="search_box">
                <input class='search' placeholder="搜索减速器商品数据" v-model="value2">
            </div>
            <div class="search_btn" @click="search(1)">
                <el-icon color="#337ecc"><Search /></el-icon>
            </div>
        </div>
        <div class="table_box">
            <Table  :tableData="tableData" @page_change="pageChange"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ArrowDown, Search } from '@element-plus/icons-vue'
import axios from "../../api";
import Table from "../Table.vue";

const value1 = ref('名称')
const value2 = ref('')

const params_map = {
    factory: '制造商',
    type: '型号',
    use_scope: '用途',
    address: '地区',
    name: '名称'
}

const tableData = ref({
    data: [],
    total: 0,
    current_page: 1,
    total_count: 0,
    total_page: 0
})

const search = (page: number) => {
    if (!value2.value) {
        return alert('请输入搜索内容')
    }
    // 使用类型断言，告诉 TypeScript，'params' 对象的第三个属性的键名和值的类型可以变化
    let parpams = {
        'page': page,
        'page_size': 10
    } as {[key: string]: any}

    let keyname = value1.value
    if(keyname == '名称'){
        parpams['name'] = value2.value
    } else if(keyname == '制造商'){
        parpams['factory'] = value2.value
    } else if(keyname == '型号'){
        parpams['type'] = value2.value
    } else if(keyname == '用途'){
        parpams['use_scope'] = value2.value
    } else if(keyname == '地区'){
        parpams['address'] = value2.value
    }

    axios.get('/api/search', {
        params: parpams
    }).then(res => {
        console.log(res.data)
        tableData.value = res.data
        // 如果返回的数据为空，就提示用户
        if (res.data.data.length == 0) {
            value2.value = ''
            alert('没有搜索到相关数据')
        }
    })
}

const handleCommand = (command: string) => {
    value1.value = params_map[command as keyof typeof params_map]
}

const pageChange = (page: number) => {
    console.log('父组件执行了',page)
    search(page)
}

</script>

<style scoped>
.box {
    border-radius: 10px;
    border: 1px solid #DFDEDE;
    margin: 20px;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    text-align: center;
    line-height: 50px;
    color: black;
    font-weight: bold;
    background-color: rgba(28, 102, 230, 0.20);
}
.table_box {
    margin: 20px;
}
.select_key {
    height: 50px;
    width: 120px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #fff;
    border-right: 1px solid #DFDEDE;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
  outline: none;
}
.el-dropdown-link {
    outline: none;
}
.search_box {
    height: 50px;
    width: 550px;
    box-sizing: border-box;
}
.search {
    width: 100%;
    height: 100%;
    outline: none;
    padding: 10px 20px;
    box-sizing: border-box;
    border: none;
    font-size: 14px;
}
.search_btn {
    height: 50px;
    width: 60px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    background-color: #fff;
    border-left: 1px solid #DFDEDE;
    cursor: pointer;
}
.search_btn:hover {
    background-color: #ABC3DD;
}

</style>