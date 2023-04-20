import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../components/view/Home.vue"),
    },
    {
        path: "/china_map",
        name: "china_map",
        component: () => import("../components/ChinaMap.vue"),
    },
    {
        path: "/echarts_1",
        name: "echarts_1",
        component: () => import("../components/Echarts_1.vue"),
    },
    {
        path: "/auto_make",
        name: "auto_make",
        component: () => import("../components/AutoMake.vue"),
    },
    {
        path: "/word_cloud",
        name: "word_cloud",
        component: () => import("../components/WordCloud.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;