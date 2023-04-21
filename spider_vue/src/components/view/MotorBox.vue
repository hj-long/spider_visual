<template>
    <p class="text_center">选择电动机类型:
        <el-select v-model="value2" :placeholder="options[0].label">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
    </p>
    <div class="table_box">
        <table>
            <!-- 表头 -->
            <thead>
                <tr>
                    <th>电机类型</th>
                    <th>额定功率(kw)</th>
                    <th>额定电压(V)</th>
                    <th>额定电流(A)</th>
                    <th>同步转速(r/min)</th>
                    <th>满载转速(r/min)</th>
                    <th>总传动比</th>
                    <th>轴外伸轴径/mm</th>
                    <th>轴外伸长度/mm</th>
                </tr>
            </thead>
            <!-- 表体 -->
            <tbody>
                <tr v-if="motor">
                    <td>{{ motor.type }}</td>
                    <td>{{ motor.power }}</td>
                    <td>{{ motor.voltage }}</td>
                    <td>{{ motor.current }}</td>
                    <td>{{ motor.speed }}</td>
                    <td>{{ motor.fullSpeed }}</td>
                    <td>{{ motor.ratio }}</td>
                    <td>{{ motor.shaftDiameter }}</td>
                    <td>{{ motor.shaftLength }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>

import { ref, onMounted, computed } from "vue";


const value2 = ref('')
const options = ref([
    {
        value: 'Y112M-4',
        label: 'Y112M-4异步电动机'
    },
    {
        value: 'Y132M1-6',
        label: 'Y132M1-6异步电动机'
    }
])

const motor = computed(() => {
    if(value2.value == 'Y112M-4') {
        return motorData.value[0]
    }
    if(value2.value == 'Y132M1-6') {
        return motorData.value[1]
    }
})

const motorData = ref([
    {
        type: 'Y112M-4异步电动机',
        power: 4,
        voltage: 380,
        current: 8.8,
        speed: 1500,
        fullSpeed: 1440,
        ratio: 75.35,
        shaftDiameter:28,
        shaftLength: 60,
    },
    {
        type: 'Y132M1-6异步电动机',
        power: 4,
        voltage: 380,
        current: 9.4,
        speed: 1000,
        fullSpeed: 960,
        ratio: 50.24,
        shaftDiameter: 38,
        shaftLength: 80,
    }
])


</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #DFDEDE;
}
th, td {
    border: 1px solid #DFDEDE;
    padding: 5px;
    text-align: center;
}
.table_box {
    padding: 15px;
}

.text_center {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
}
</style>