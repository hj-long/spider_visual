<template>
    <div ref="chinaMap" style="height: 100%;width: 100%;"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from 'echarts'
import chinaJSON from '../assets/json/china.json'
import axios from '../api'

function init_city() {
    return axios.get('/api/address/')
    .then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
}
const chinaMap = ref()

onMounted(async() => {
    console.log('mounted开始')
    let city_data = await init_city()
    // 遍历所有城市整理数据格式为：[{name: '北京', value: 100}, {name: '上海', value: 200}]
    let data = []
    for(let city in city_data) {
        data.push({
            name: city,
            value: city_data[city]
        })
    }
    // 绘制地图
    drawChina(data)
})

function drawChina(city_data: any) {
    var myChart = echarts.init(chinaMap.value)
    echarts.registerMap('china', chinaJSON as any)
    var optionMap = {  
                backgroundColor: '#FFFFFF30',  
                title: {  
                    text: '减速器厂家地区数量分布图',  
                    subtext: '',  
                    x:'center',
                    textStyle: {
                        color: '#E2DEDE'
                    }
                },  
                tooltip : {  
                    trigger: 'item'  
                },  
                //左侧小导航图标
                visualMap: {  
                    show : true,  
                    x: 'left',  
                    y: 'center',  
                    splitList: [   
                        {start: 550, end: 1100},{start: 350, end: 550},  
                        {start: 250, end: 350},{start: 150, end: 250},  
                        {start: 50, end: 150},{start: 0, end: 50},  
                    ],  
                    color: ['#FF0000', '#FF5125', '#FF9100','#FFE600', '#A5CA00', '#E1FC7E'],
                    textStyle: {
                        color: '#E2DEDE'
                    }
                },  
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#85AAEE',
                            borderColor: '#DACF3E'
                        },
                        emphasis: {
                            areaColor: '#E7351D'
                        }
                    }
                },
                //配置属性
                series: [{  
                    name: '数据',  
                    type: 'map',  
                    mapType: 'china', 
                    roam: true,
                    geoIndex: 0,
                    label: {  
                        normal: {  
                            show: true  //省份名称  
                        },  
                        emphasis: {  
                            show: false  
                        }  
                    },  
                    data: city_data //数据
                }]  
            };  
        //使用制定的配置项和数据显示图表
        myChart.setOption(optionMap);
}


</script>