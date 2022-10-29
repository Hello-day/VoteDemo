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
        <div class="voteChannel"  >
          <div v-show="flagOfstartCreate" class="voteArea" :key="100">

            <div class="headOfvoteData">
              <span >当前投票结果</span>
            </div>
            <div class="voteCreate">
              <!--    现有投票-->
              <div  class="voteEdit" >
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>条形图</span>
                  </div>
                  <div v-for="o in 9" :key="o" class="text item">
                    {{'内容 ' + o }}
                    <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>

                  </div>
                </el-card>

                  <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="100px">

                  </el-form>

              </div>
            </div>
          </div>

          <!--eslint-disable-next-line-->

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

      myVote:[],

      loginUser: this.$route.query.username,

      flagOfstartCreate:true,
   
      dynamicValidateForm: {

        options: [{
          value: ''
        }],
        option1: '',
        
        voteName: '',
        selectChannel: '',
        desc: ''
      }

    }
  },

  methods:{
    goBack() {
      this.$router.go(-1)
    },

    list(){
      this.request.get("/channel/list").then(res=>{
        if(res.code == 1){
          this.channel=res.data
        }else{
          prompt(res.msg)
        }

        // console.log(this.channel)
      })
    },

    loadMyVote() {
      this.request.get("/vote/mine",this.loginUser).then(res => {
        this.myVote = res.data
      })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        }else {
          console.log('error submit!!');
          return false;
        }
      });

      this.request.post('/vote/add/', this.dynamicValidateForm).then(res=>{
        if(res.code=="1"){
          this.$message.success("提交成功！")
        }
        else{
          this.$message.error("提交失败！")
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    removeOption(item) {
      var index = this.dynamicValidateForm.options.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.options.splice(index, 1)
      }
    },

    addOption() {
      this.dynamicValidateForm.options.push({
        value: '',
        key: Date.now()
      });
    },


    //load () {
    //  this.count += 2
    //},



  },
  created() {
    this.list()
    this.loadMyVote()
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

.voteEdit{
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

.voteArea{
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