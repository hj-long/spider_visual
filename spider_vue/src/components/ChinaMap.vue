<template>
    <div ref="chinaMap" style="height: 700px;border: solid 1px red;width: 100%;"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from 'echarts'
import chinaJSON from '../assets/json/china.json'

const chinaMap = ref()

onMounted(() => {
  drawChina()
})

function drawChina() {
    var myChart = echarts.init(chinaMap.value)
    echarts.registerMap('china', chinaJSON as any)
    var city_data = [
            {name: "北京市",value: 100},
            {name: "天津市",value: 600},
            {name: "上海市",value: 200},
            {name: "重庆市",value: 400},
            {name: "河北省",value: 300},
            {name: "河南省",value: 700},
            {name: "云南省",value: 500},
            {name: "广东省",value: 1000},

        ]
    var optionMap = {  
                backgroundColor: '#FFFFFF',  
                title: {  
                    text: '全国地图大数据',  
                    subtext: '',  
                    x:'center'  
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