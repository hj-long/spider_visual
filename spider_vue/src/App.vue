<script lang="ts" setup>
import getTime from './components/getTime.vue';
import { ref, onMounted, provide } from 'vue'
import axios from './api'

const data_length = ref(0)
const type_length = ref(0)
const option1 = ref(null);

onMounted(async () => {
    let data = await axios.get('/api/count/').then(res => {
        data_length.value = res.data.length
        type_length.value = res.data.data.length
        return res.data
    }).catch(err => {
        console.log(err)
    })
    option1.value = data.data
})

provide("option1", option1)
provide("type_length", type_length)

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="180px">     
        <div class="header_icon">
          <span class="iconfont icon-shujuxitong"></span>
        </div>
        <ul class="enum">
          <li>
            <span class="iconfont icon-home"></span>
            <router-link to="/">系统首页</router-link>         
          </li>
          <li>
            <span class="iconfont icon-rementuijian"></span>
            <router-link to="/auto_make">智能设计</router-link>         
          </li>
          <li>
            <span class="iconfont icon-Map-"></span>
            <router-link to="/data_make">数据分析</router-link>         
          </li>
          <li>
            <span class="iconfont icon-Map-"></span>
            <router-link to="/china_map">地区分布</router-link>         
          </li>
          <li>
            <span class="iconfont icon-Map-"></span>
            <router-link to="/word_cloud">词云分析</router-link>         
          </li>
        </ul>
      </el-aside>

      <el-container>

        <el-header>
          <div style="position: relative;">
            <div class="left_header">当前数据库已录入商品信息：{{ data_length }} 条</div>
            基于网络爬虫的减速器数据系统开发
          <getTime />
          </div>
        </el-header>

        <el-main>
            <!-- 路由出口 -->
            <!-- 路由匹配到的组件将渲染在这里 -->
            <router-view></router-view>
        </el-main>

        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>
.el-container {
  height: 100%;
  background: url(./assets/image/bg.jpg) top center no-repeat;
  /* background: #103E7A; */
}
.common-layout{
  height: 100%;
}
.el-aside {
  color: #fff;
  text-align: center;
  background-color:  #103E7A;;
}

.header_icon {
  height: 40px;
  line-height: 40px;
  color: #fff;
  margin-bottom: 5px;
}
.el-header {
  height: 60px;
  background: url(./assets/image/head_bg.png) top center no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  line-height: 60px;
  text-align: center;
}
.el-footer {
  background-color: #556170;
  color: #fff;
  line-height: 60px;
  text-align: center;
}
.main_top {
  height: 220px;
  background-color: #8aaedd;
  margin-bottom: 20px;
  border-radius: 10px;
}
.main_center {
  height: calc(100% - 240px);
}
.enum li {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  cursor: pointer;
}
.enum li a {
  color: #FFFFFF;
  margin-left: 7px;
}
.enum li a:hover {
  color: #FFD700;
}
.enum li:hover {
  color: #FFD700;
}
.iconfont {
  font-size: 20px;
}

.left_header {
  position: absolute;
  left: 0;
  top: -5px;
  padding-right: 20px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}
</style>
