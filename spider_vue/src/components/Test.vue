<script setup lang="ts">

const props = defineProps<{
    msg: String;
    name: Array<string>;
}>();

const emit = defineEmits<{
    (event: 'testclick', ...args: any[]): void;
}>();

let i = 0;
function getTestData() {
    
    emit('testclick', '这是一个组件页面' + i++);
}

</script>

<template>
  <div>
    这是一个组件测试页面
    <p>{{msg}}</p>
    <hr>
    <button @click="getTestData">获取数据</button>
    <ul>
      <li v-for="[item, index] in name" :key="index">名字是：{{ item }}</li>
    </ul>
  </div>
</template>