<script lang="ts" setup>
import Echarts_1 from './components/Echarts_1.vue'

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
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
          基于网络爬虫的减速器数据系统开发
        </el-header>

        <el-main>
          <Echarts_1 />
        </el-main>

        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>
.el-container {
  height: 100%;
}
.common-layout{
  height: 100%;
}
.el-aside {
  background-color: #8aaedd;
  color: #202020;
  text-align: center;
}
.el-header {
  background-color: #556170;
  color: #fff;
  line-height: 60px;
  text-align: center;
}
.el-footer {
  background-color: #556170;
  color: #fff;
  line-height: 60px;
  text-align: center;
}
</style>
