<template>
  <div class="mainBodyOfHome">
    <!--    数据展示-->
    <div class="dataDisplayOfHome">
      <!--          标题  -->
      <div class="headOfDataDisplay">
        <el-page-header @back="goBack" content="">
        </el-page-header>
                <span style="flex: 9;font-size: 18px;font-weight: bold">
               {{ voteItem.name }}
                </span>
      </div>
      <!--            数据具体展示-->

    </div>

    <div class="visualizationOfHome">

      <div class="viewOfvoteData">
        <div class="voteChannel"  >
          <div class="voteArea" :key="100">
            <div class="headOfvoteData">
              <span >当前投票结果</span>
            </div>
             <div class="voteCreate">
              <!--    现有投票-->
              <div  class="voteEdit"  >
                <el-card class="box-card" >
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="条形图" name="first" >
                        <div  v-for=" o in voteOpt" :key="o" class="text item">
                          {{o.optionName}}
                          <el-progress :text-inside="true" :stroke-width="26" :percentage="o.percent"></el-progress>
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="饼状图" name="second" stretch="true" >
                        <div class="echart" id="mychart" :style="myChartStyle"></div>
                      </el-tab-pane>

                    </el-tabs>

                </el-card>

              </div>
            </div>
          </div>

        </div>


      </div>

    </div>
  </div>
</template>

<script>
import 'animate.css'
import * as echarts from "echarts";

// eslint-disable-next-line no-unused-vars
import axios, {Axios as request} from "axios";
export default {
  name: "VoteContent",
  data(){
    return {

      total:0,//总投票数
      voteOpt:[],   //储存当前投票项目的选项信息
      voteItem: this.$route.query.voteItem,   //当前投票项目信息
      optPercentage: [],//暂存每个选项得票占比
      
      
      optCnt: '',//暂存每个选项得票占比
      channel:[],
      myVote:[],
      myChart: {},
      
      pieData: [][
        {
          value: '',
          name: ''
        }
      ],
      pieName: [],
      myChartStyle: { width: "700px", height: "300px" } //图表样式
    }
  },
  mounted() {
    this.initDate(); //数据初始化
    this.initEcharts();
  },
  methods:{
    loadPieData(){
      for(let i=0;i<this.voteOpt.length;i++){

        this.pieData[i].value = this.voteOpt[i].cnt //投票数
        this.pieData[i].name = this.voteOpt[i].optionName //投票数
      }
    },

    loadOpt(){
      this.request.get("/option/"+this.voteItem.id).then(res=>{   //获取当前投票内的选项
        
        this.voteOpt=res.data
        console.log(this.voteOpt)
        this.loadPercent();
      })
    },

    loadPercent(){
      for(let i=0;i<this.voteOpt.length;i++){

        this.total += this.voteOpt[i].cnt //计算总投票数
        this.voteOpt[i].percent = 0;
      }
      // console.log(this.total)
      if(this.total!=0){
        for(let i=0;i<this.voteOpt.length;i++){

          this.voteOpt[i].percent = Math.round((this.voteOpt[i].cnt / this.total) * 10000) / 100.0;  //voteOpt内的变量名随便写的，根据返回的改

        }
      }
      // console.log(this.optPercentage)
    },

    goBack() {
      this.$router.go(-1)
    },

    initDate() {
      for (let i = 0; i < this.voteOpt.length; i++) {
        this.pieName[i] = this.voteOpt[i].optionName;
      }
    },
    initEcharts() {
      //数据初始化
      for(let i=0;i<this.voteOpt.length;i++){

        this.pieData[i].value = this.voteOpt[i].cnt //投票数
        this.pieData[i].name = this.voteOpt[i].optionName //名字
      }
      // 饼图
      const option = {
        legend: {
          // 图例
          data: this.pieName,
          right: "10%",
          top: "30%",
          orient: "vertical"
        },

        series: [
          {
            type: "pie",
            label: {
              show: true,
              formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
            },
            radius: "50%", //饼图半径
            data: this.pieData
          }
        ]
      };
      console.log(this.seriesData);

      this.myChart = echarts.init(document.getElementById("mychart"));
      this.myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    }
  },


  created() {
   this.loadOpt()

    // this.loadPercent()
  }
}

</script>

<style scoped>

.box-card{
  max-height: 400px;
  overflow-y: auto;
}

.mainBodyOfHome{
  display: flex;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #FFE8EA, #EDF3FF 70%, #EDF2FB);
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.viewOfvoteData {
  width: 100%;
  height: 570px;
  background-color: #F5F7F9;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  right: 0px;
}

.voteChannel{
  flex: 14;
  width: 100%;

  position: relative;
}

.voteChannel div{
  border-radius: 15px;
  margin-top: 20px;
  transition: all 0.5s;
}

.voteChannel div:hover{
  transform: scale(1,1);
}


.textArea div{
  margin-top: 0px;
}

.voteCreate{
  flex: 14;
  width: 100%;
  position: relative;
}

.voteCreate div{
  border-radius: 15px;
  margin-top: 20px;

}

.voteEdit {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  flex: 1;
  font-size: 13px;
  font-weight: bold;
  color: #464646;
  padding: 0 40px;

}

.voteArea {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 530px;
  background-color: white;
  margin-left: 30px;
  position: relative;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #FCEAED, #EDF3FF 70%, #EDF2FB);

}

.voteArea div{
  margin-top: 0px;
}

.liList li{
  text-align: center;
}

.liList li:hover{
  color: #257B5E;
  background-color: rgba(37,123,94,0.1);
}


.dataDisplayOfHome{
  flex: 2;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 50px;
}
.visualizationOfHome{
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: #DAF3EE;
}

.headOfDataDisplay{
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.headOfvoteData{
  height: 100%;
  width: 100%;
  flex: 2;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-weight: bold;
  font-size: 16px;
  justify-content: center;
}

.voteChannel{
  flex: 6;
  width: 100%;
}

/deep/ .el-upload{
  width: 100%;
  height: 100%;
}

</style>