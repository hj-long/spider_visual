<script setup lang="ts">
import Test from './components/Test.vue';
import { ref } from 'vue';

const count = ref(0);
const name = ['a', 'b', 'c'];
let str1 = ref('这是一个app页面');

function getTestData(str:string) {
  console.log(str);
  str1.value = str;
}

</script>

<template>
  <div>
    这是一个测试页面
    <p>{{ str1 }}</p>
  </div>
  <Test  :name="name" msg="fff" @testclick="getTestData"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
