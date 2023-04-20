<template>
    <div class="app_box">
        <p class="title">数据库中的减速器商品实际用途词云分析</p>
        <div class="img_box">
            <img :src="`${word_img}?t=${Date.now()}`" alt="" v-if="reset">
        </div>
        <div class="btn">
            <el-button type="danger" @click="getWordCloud">重新生成</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted} from "vue";
import axios from "../api";

const word_img = ref()
const reset = ref(false)


onMounted(() => {
    getWordCloud()
})

const getWordCloud = () => {
    reset.value = false
    axios.get("/api/word_cloud").then(res => {
        word_img.value = res.data
        console.log(res.data)
        reset.value = true
    })
}

</script>

<style scoped>
.app_box {
    position: relative;
    /* 防止高度坍塌 */
    border: 1px solid lightcyan;
}
.img_box {
    height: 60%;
    border: 1px solid #F5DFDF;
    text-align: center;
}
.title {
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    margin: 20px 0;
}
.img_box img {
    /* width: 100%; */
    height: 100%;
}
.btn {
    margin: 20px 0;
    text-align: center;
}
</style>