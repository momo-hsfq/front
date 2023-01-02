<template>
    <div ref="myChart" id="myChart"></div>
</template>

<script>
//引用echarts
import * as echarts from "echarts"
import axios from "axios"
import { listenerCount } from "process"
export default {
    
    data(){
        return{
            eData:[]
        }
    },
    methods:{
        getData(){
            this.$axios
            .post('/portrait/listCharacter',{})
            .then((result)=>{
                console.log(result)
                console.log('1111111111')
                this.eData[0] = result.data.datas.socialPrc.length;
                this.eData[1] = result.data.datas.exCurricular.length;
                this.eData[2] = result.data.datas.achieve.length;
                this.eData[3] = result.data.datas.evaluateMe.length;
                this.eData[4] = 5;
                this.eData[5] = 4;
                console.log(this.eData),
                console.log(this.eData[0])
                this.updateChart()
            })
            .catch((error)=>{
                alert(error)
            })
        },
        
        updateChart(){
            let myEcharts=echarts.init(this.$refs.myChart)
            //this.getData().then(()=>{
                //eData:[this.getData]
                //this.getData()
                console.log('222222222')
                //console.log(this.eData)
                //this.getData()
                const data = this.eData
                let options={
                    animation:true,
                    animationThreshold:6,
                    title:{
                        text:"个人画像"
                    },
                    radar:[{
                        shape:"circle",
                        indicator:[//雷达图的指示器，用来指定雷达图中的多个变量（维度）
                            { name:"德育素养", max: 5 },//社会实践
                            { name:"文体素养", max: 5 },//课外活动
                            { name:"科创素养", max: 5 },//成果奖励
                            { name:"魅力值", max: 5 },
                            { name:"学习能力", max: 5 },//绩点
                            { name:"求知欲", max: 5 },
                        ],
                        //半径
                        radius:100,
                    
                    }],
                    series:[{
                        type:"radar",
                        data:[{
                            //value:[1,2,3,4,5,6]
                            value:data
                            //value:[this.eData[0],this.eData[1],this.eData[2],this.eData[3],this.eData[4],this.eData[5]]
                        }]
                    }]
                }
                myEcharts.setOption(options)
            //})
        }
    },
    mounted() {
        console.log('3333333')
        this.getData()
        //this.updateChart()
    }
}
</script>

<style>
#myChart{
    width: 300px;
    height: 300px;
}
</style>