<template>
    <div class="mainBodyOfHome">
<!--    数据展示-->
        <div class="dataDisplayOfHome">
<!--          标题  -->
            <div class="headOfDataDisplay">
                <span style="flex: 9;font-size: 18px;font-weight: bold">
                在线投票系统
                </span>
                <span style="flex: 2;font-size: 12px;font-weight: bold;color: #4E5C72;justify-content: end;display: flex">
                    以下数据实时更新
                </span>
            </div>
<!--            数据具体展示-->
            <div class="detailedData">
                <!--            用户数-->
                <div class="demoOfDivInDetailedData" style="background-color: #E1F3D8">
                    <div style="flex: 1;width: 100%;height: 100%;display: flex;align-items: end;padding-left: 10px;font-weight: bold">
                            <span>已注册用户</span>
                    </div>
                    <div style="font-family: PingFangSC-Semibold,PingFang SC;font-size: 25px;font-weight: bold; flex: 2;width: 100%;height: 100%;display: flex;align-items: center;padding-left: 10px">
                                <span>{{Num}}人</span>
                    </div>
                </div>
                <!--            投票项目数-->
                <div class="demoOfDivInDetailedData" style="background-color: #FAECD8">
                    <div style="flex: 1;width: 100%;height: 100%;display: flex;align-items: end;padding-left: 10px;font-weight: bold">
                            <span>已发布投票</span>
                    </div>
                    <div style="font-family: PingFangSC-Semibold,PingFang SC;font-size: 25px;font-weight: bold; flex: 2;width: 100%;height: 100%;display: flex;align-items: center;padding-left: 10px">
                        <span>{{Item}}项</span>
                    </div>
                </div>
                <!--            参与人数-->
                <div class="demoOfDivInDetailedData" style="background-color:#FDE2E2">
                    <div style="flex: 1;width: 100%;height: 100%;display: flex;align-items: end;padding-left: 10px;font-weight: bold">
                        <span>已参与投票</span>
                    </div>
                    <div style="font-family: PingFangSC-Semibold,PingFang SC;font-size: 25px;font-weight: bold; flex: 2;width: 100%;height: 100%;display: flex;align-items: center;padding-left: 10px">
                        <span>{{Voted}}人</span>
                    </div>
                </div>

                <!--            团队人数-->
                <div class="demoOfDivInDetailedData" style="background-color:#E5EBFD">
                    <div style="flex: 1;width: 100%;height: 100%;display: flex;align-items: end;padding-left: 10px;font-weight: bold">
                        <span>团队人数</span>
                    </div>
                    <div style="font-family: PingFangSC-Semibold,PingFang SC;font-weight:bold;font-size: 20px; flex: 2;width: 100%;height: 100%;display: flex;align-items: center;padding-left: 10px">
                        <span>233人</span>
                    </div>
                </div>
            </div>
        </div>
    <div class="visualizationOfHome">
       <div class="viewOfvoteData">

        <div class="mainBodyOfvoteCenter">
          <transition-group name="list-complete" tag="p" appear>

            <div v-show="flagOftext" class="textArea" :key="1">
              <i style="position: absolute; right: 15px;top: 10px;font-size: 18px;font-weight: bold;z-index:5" class="el-icon-close close" @click="closetextArea"></i>
              <div class="headOfvoteData">
                <span >投票频道1</span>
              </div>
              <div class="mainBodyOfvoteData">
                <!--                    现有投票-->
                <div v-show="!flagOfChangeUserData" class="defaultInformation" >
                  <div>
                    现&nbsp;有&nbsp;投&nbsp;票&nbsp;项:
                    <span>666</span>
                  </div>

                </div>
              </div>
            </div>

            <div v-show="flagOfvoteData" class="voteDataArea" :key="2">
              <i style="position: absolute; right: 15px;top: 10px;font-size: 18px;font-weight: bold;z-index:5" class="el-icon-close close" @click="closevoteDataArea"></i>
              <span style="flex: 1;display: flex;align-items: center;color: #333;padding-left: 15px;font-weight: bolder;font-size: 16px">暂时没用</span>
            </div>


            <div v-show="flagOfdealtArea" class="dealtArea" :key="3">
              <i style="position: absolute; right: 15px;top: 10px;font-size: 18px;font-weight: bold;z-index:5" class="el-icon-close close" @click="closedealtArea"></i>
              <span style="flex: 1;display: flex;align-items: center;color: #333;padding-left: 15px;font-weight: bolder;font-size: 16px">暂时没用</span>
            </div>


            <div v-show="flagOfnotice" class="noticeArea" :key="4">
              <i style="position: absolute; right: 15px;top: 10px;font-size: 18px;font-weight: bold;z-index:5" class="el-icon-close close" @click="closenoticeArea"></i>
              <span style="flex: 1;display: flex;align-items: center;color: #333;padding-left: 15px;font-weight: bolder;font-size: 16px">暂时没用</span>

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
  name: "Home",
  data(){
    return {
      Num:'',
      Item:'',
      Voted:'',
      numberOfRequest:0,
      flagOfvoteCenter:false,
      flagOftext:true,
      flagOfvoteData:true,
      flagOfdealtArea:true,
      flagOfnotice:true,
      localTionObj:{},
      sentence:"",
      user: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
      flagOfChangeUserData:false,
      dialogVisible: false,
      form:{},
    }
  },
  methods:{
    displayNone(){
      this.$bus.$emit('voteCenterChange',this.flagOfvoteCenter)
    },
    closetextArea(){
      this.flagOftext = !this.flagOftext
    },
    closevoteDataArea(){
      this.flagOfvoteData = !this.flagOfvoteData
    },
    closedealtArea(){
      this.flagOfdealtArea = !this.flagOfdealtArea
    },
    closenoticeArea(){
      this.flagOfnotice = !this.flagOfnotice
    },

    loadSentence(){
      this.request.get("https://v1.hitokoto.cn?c=j").then(res=>{
        this.sentence = res.hitokoto
      })
    },

    loadNum(){
      this.request.get("/user/count").then(res=>{
        this.Num = res.data.cnt
      })
    },

    loadItem(){
      this.request.get("/user/count").then(res=>{
        this.Item = res.data.numOfVote
      })
    },

    loadVoted(){
      this.request.get("/user/count").then(res=>{
        this.Voted = res.data.numOfPeople
      })
    },
  },
  created() {
    this.loadSentence()
    this.loadNumberOfRequest(JSON.parse(localStorage.getItem("user")).id),
    this.loadInforOfRequest(JSON.parse(localStorage.getItem("user")).id),
    this.loadItem(),
    this.loadNum(),
    this.loadVoted()
  }
}

</script>

<style scoped>

  .viewOfvoteData{
    width: 100%;
    height: 500px;
    background-color: #F5F7F9;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    right: 0px;
  }

  .mainBodyOfvoteCenter{
    flex: 14;
    width: 100%;
    overflow-y: auto;
    position: relative;
  }
  .mainBodyOfvoteCenter div{
    border-radius: 15px;
    margin-top: 20px;
  }

  .textArea{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 100px;
  background-color: white;
  margin-left: 30px;
  position: relative;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #FCEAED, #EDF3FF 70%, #EDF2FB);
  align-items: center;

  }

  .textArea div{
  margin-top: 0px;
  }

  .voteDataArea{
  width: 95%;
  height: 100px;
  background-color: white;
  margin-left: 30px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #FFE8EA, #EDF3FF 70%, #EDF2FB);
  }

  .dealtArea{
  width: 95%;
  height: 100px;
  margin-left: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  background-image: radial-gradient(circle farthest-side at 10% 90%, #FCEAED, #EDF3FF 70%, #EDF2FB);
  align-items: center;
  }
  .noticeArea{
    width: 95%;
    height: 100px;
    margin-left: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
    background-image: radial-gradient(circle farthest-side at 10% 90%, #FCEAED, #EDF3FF 70%, #EDF2FB);
    align-items: center;
  }

  .noticeArea div{
    margin-top: 0px;
  }


  .IconArea i:hover{
    color: #257B5E;
    cursor: pointer;
  }
  .liList li{
    text-align: center;
  }
  .liList li:hover{
    color: #257B5E;
    background-color: rgba(37,123,94,0.1);
  }
   .mainBodyOfvoteCenter div {
    transition: all 0.5s;
  }

  .mainBodyOfvoteCenter div:hover{
    transform: scale(1.01,1.01);
  }
 .close:hover{
    cursor: pointer;
    color: #2b542c;
  }

  .defaultInformation div,.changeDataOfUser div{
    flex: 1;
    height: 100%;
    font-size: 13px;
    font-weight: bold;
    color: #464646;
    width: 100%;
    padding: 0 15px;

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
        flex: 2;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: end;
    }
    .detailedData{
        flex: 4;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    .demoOfDivInDetailedData{
        flex: 1;
        width: 100%;
        height: 80%;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        overflow: hidden;
    }

.mainBodyOfvoteCenter div {
  transition: all 0.5s;
}

.mainBodyOfvoteCenter div:hover{
  transform: scale(1.01,1.01);
}
.close:hover{
  cursor: pointer;
  color: #2b542c;
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
.mainBodyOfvoteData{
  flex: 6;
  width: 100%;


}
.defaultInformation{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

}

.defaultInformation:hover{
  cursor: pointer;
  background-color: rgba(231,234,237,0.7);
  transform: scale(0,0);
  width: 99%;
  border-radius: 10px;

}
.defaultInformation div,.changeDataOfUser div{
  flex: 1;
  height: 100%;
  font-size: 13px;
  font-weight: bold;
  color: #464646;
  width: 100%;
  padding: 0 15px;

}
  /deep/ .el-upload{
    width: 100%;
    height: 100%;
  }
</style>