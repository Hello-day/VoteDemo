<template>
  <div class="mainBodyOfHome">
    <!--    数据展示-->
    <div class="dataDisplayOfHome">
      <!--          标题  -->
      <div class="headOfDataDisplay">
                <span style="flex: 9;font-size: 18px;font-weight: bold">
                我参与的投票
                </span>
      </div>
    </div>

    <div class="visualizationOfHome">

      <div class="viewOfvoteData">
        <div class="voteChannel"  style="overflow:auto">

          <!--eslint-disable-next-line-->
          <transition-group name="list-complete" tag="p" appear v-for="i in myParticipate">
            <div v-show="flagOftext" class="textArea" :key="i">
              <div class="headOfvoteData">
                <span >{{i.name}}</span>
              </div>
              <div class="voteChannel" @click="votePageApper(i)">
                <!--    现有投票-->
                <div class="voteNowHave">
                  <div>
                    投&nbsp;票&nbsp;详&nbsp;情&nbsp;:
                    <span>{{i.description}}</span>
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
      channel:[],
      myParticipate:[],
      user: localStorage.getItem("user"),
      flagOftext:true,

    }
  },

  methods:{
    votePageApper(i){
      this.$router.push({
                name:"VoteResult",
                query:{
                  voteItem:i
                }
            })
    },

    list(){
      this.request.get("/usvt/participate").then(res=>{
        if(res.code == 1){
          this.myParticipate=res.data
        }else{
          prompt(res.msg)
        }

        // console.log(this.channel)
      })
      console.log(this.myParticipate)
    },

    // loadMyPart() {
    //   this.request.get("/vote/mine").then(res => {
    //     this.myVote = res.data
    //     console.log(this.myVote)
    //   })
    // },

    //load () {
    //  this.count += 2
    //},

  },
  created() {
    this.list()
    // this.loadMyPart()
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
  transform: scale(1,1);
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
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05);
}

.textArea div{
  margin-top: 0px;
}

.voteCreate div:hover{
  transform: scale(1,1);
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

/deep/ .el-upload{
  width: 100%;
  height: 100%;
}

</style>