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
              <span >投票名</span>
            </div>
            <div class="voteCreate">
              <!--    现有投票-->
              <div  class="voteEdit" >
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>详细描述</span>
                  </div>
                  <div v-for="o in 20" :key="o" class="text item">
                    {{'内容 ' + o }}
                  </div>
                </el-card>

                  <el-form ref="form" :model="form" label-width="100px">

                    <el-form-item label="投票选项">
                      <el-radio-group v-model="form.choose">
                          <el-radio v-model="radio2" v-for="o in 4" :key="o" :label = "o" border>{{'备选项 ' + o }}</el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" @click="submitForm('form')">提交投票</el-button>
                      <el-button>取消</el-button>
                      </el-form-item>

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
      user: localStorage.getItem("user"),
      flagOfstartCreate:true,
      form: {
        choose: ''
      }

    }
  },

  methods:{
    goBack() {
      this.$router.go(-1)
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

      this.request.post('/vote/add/', this.form).then(res=>{
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


  },
  created() {

  }
}

</script>

<style scoped>

.box-card{
  max-height: 300px;
  overflow-y: auto

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