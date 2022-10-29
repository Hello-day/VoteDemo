<template>
  <div class="mainBodyOfHome">
    <!--    数据展示-->
    <div class="dataDisplayOfHome">
      <!--          标题  -->
      <div class="headOfDataDisplay">
        <el-page-header @back="goBack" content="">
        </el-page-header>
                <span style="flex: 9;font-size: 18px;font-weight: bold">
                投票频道
                </span>
      </div>
      <!--            数据具体展示-->

    </div>

    <div class="visualizationOfHome">

      <div class="viewOfvoteData">
        <div class="voteChannel" v-infinite-scroll="load" style="overflow:auto">
          <!--eslint-disable-next-line-->
          <transition-group name="list-complete" tag="p" appear v-for="i in 2">
            <div v-show="flagOftext" class="textArea" :key="1">

              <div class="headOfvoteData">
                <span >{{i.name}}</span>
              </div>
              <div class="voteChannel">
                <!--    现有投票-->
                <div id= "box" class="voteNowHave" @click="votePageApper(i)">
                  <div>
                    现&nbsp;有&nbsp;投&nbsp;票&nbsp;项:
                    <span>{{i.cnt}}</span>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import 'animate.css'
// eslint-disable-next-line no-unused-vars
import axios, {Axios as request} from "axios";
export default {
  name: "VoteContent",
  data(){
    return {
      vote:[],
      count:0,
      Channel: this.$route.query.id,
      flagOfvoteCenter:true,
      flagOftext:true,
      flagOfvoteData:true,
      flagOfvoteContent:true,

    }
  },
  methods:{
    goBack() {
      this.$router.go(-1)
    },

    votePageApper(i){
      this.$axios.get("/?/?").then(res=>{  //查询是否投过票，没投票则进入投票页面
            if(res.code == 1){
              this.$router.push({
                name:"VotePage",
                query:{
                  channelId:i
                }
              })
            }else if(res.code == 0){
              this.$router.push({
                name:"VoteResult",
                query:{
                  channelId:i
                }
              })
            }


      })
    },
    
    list(){
      this.$axios.get("/vote/list/"+this.Channel.id).then(res=>{
        this.vote = res.data
        console.log(this.vote)
        console.log(this.ChannelId)
      })
      
    },

  },
  created() {

    this.list()
  }
}

</script>

<style scoped>


.mainBodyOfHome{
  display: flex;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #FFE8EA, #EDF3FF 70%, #EDF2FB);
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.viewOfvoteData{
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
  overflow-y: auto;
  position: relative;
}
.voteChannel div{
  border-radius: 15px;
  margin-top: 20px;
  transition: all 0.5s;
}

.voteChannel div:hover{
  transform: scale(1.01,1.01);
}


.textArea{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 200px;
  background-color: white;
  margin-left: 30px;
  position: relative;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #FCEAED, #EDF3FF 70%, #EDF2FB);

}

.textArea div{
  margin-top: 0px;
}

.liList li{
  text-align: center;
}

.liList li:hover{
  color: #257B5E;
  background-color: rgba(37,123,94,0.1);
}


.voteNowHave{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex: 1;
  font-size: 13px;
  font-weight: bold;
  color: #464646;
  padding: 0 15px
}

.voteNowHave:hover{
  cursor: pointer;
  background-color: rgba(231,234,237,0.7);
  transform: scale(0,0);
  width: 99%;
  border-radius: 10px;
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

</style>