<script lang="ts" setup>
import ChinaMap from './components/ChinaMap.vue';
import getTime from './components/getTime.vue';

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="180px">
        <div style="height: 60px; line-height: 60px; text-align: center; font-size: 20px; font-weight: bold; color: #fff;">减速器数据系统</div>
        <ul>
          <li>主页</li>
          <li>地区分布</li>
          <li>词云分析</li>
          <li>智能推荐</li>
          <li>设计图生成</li>
        </ul>
      </el-aside>

      <el-container>

        <el-header>
          <div style="position: relative;">
            基于网络爬虫的减速器数据系统开发
          <getTime />
          </div>
        </el-header>

        <el-main>
          <ChinaMap />
          <!-- <div class="main_top">

          </div>
          <div class="main_center">
            <Echarts_1 />
          </div> -->
        </el-main>

        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>
.el-container {
  height: 100%;
  background: url(./assets/image/bg.jpg) top center no-repeat;
}
.common-layout{
  height: 100%;
}
.el-aside {
  color: #fff;
  text-align: center;
  background-color: rgb(27, 67, 128);
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

</style>
