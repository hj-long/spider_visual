<template>
    <div ref="chinaMap" style="height: 100%;width: 100%;"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from 'echarts'
import chinaJSON from '../assets/json/china.json'

const chinaMap = ref()


var city_data = [
            {name: "北京",value: 100},
            {name: "天津",value: 600},
            {name: "上海",value: 200},
            {name: "重庆",value: 400},
            {name: "河北",value: 300},
            {name: "河南",value: 700},
            {name: "云南",value: 500},
            {name: "广东",value: 700},
            {name: "江苏",value: 700},
        ]

onMounted(() => {
  drawChina(city_data)
})

function drawChina(city_data: any) {
    var myChart = echarts.init(chinaMap.value)
    echarts.registerMap('china', chinaJSON as any)
    var optionMap = {  
                backgroundColor: '#FFFFFF30',  
                title: {  
                    text: '已爬取的厂家数量地区分布图',  
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
                        {start: 500, end: 700},{start: 400, end: 500},  
                        {start: 300, end: 400},{start: 200, end: 300},  
                        {start: 100, end: 200},{start: 0, end: 100},  
                    ],  
                    color: ['#F71212', '#25F136', '#0C1CF7','#51F3FF', '#ECA234', '#8DACF5'],
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