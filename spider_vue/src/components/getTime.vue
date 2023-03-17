<template>
    <div class="v_time">当前时间：{{ time }}</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const time = ref('')
let timer: any = null
timer = setTimeout(getTime, 1000)
function getTime() {
  clearTimeout(timer);
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if(second < 10) second = Number('0' + second);
  time.value = `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
  timer = setTimeout(getTime, 1000);
}
</script>

<style scoped>
.v_time {
  position: absolute;
  right: 0;
  top: -5px;
  padding-right: 20px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}
</style>