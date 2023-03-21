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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;