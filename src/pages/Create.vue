<template>
  <div class="mainBodyOfHome">
    <!--    数据展示-->
    <div class="dataDisplayOfHome">
      <!--          标题  -->
      <div class="headOfDataDisplay">
                <span style="flex: 9;font-size: 18px;font-weight: bold">
                我发起的投票
                </span>
                <span class= "IconArea" style="flex: 2;font-size: 18px;font-weight: bold;color: #4E5C72;justify-content: end;display: flex">
                   <el-button round icon="el-icon-edit" size="medium" @click="startCreate">新建投票</el-button>
                </span>
      </div>
      <!--            数据具体展示-->

    </div>

    <div class="visualizationOfHome">

      <div class="viewOfvoteData">
        <div class="voteChannel"  style="overflow:auto">
          <div v-show="flagOfstartCreate" class="voteArea" :key="100">

            <div class="headOfvoteData">
              <span >创建新投票</span>
            </div>
            <div class="voteCreate">
              <!--    现有投票-->
              <div  class="voteEdit" >

                  <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="100px">
                    <el-form-item label="投票名称">
                      <el-input v-model="dynamicValidateForm.voteName"></el-input>
                    </el-form-item>

                    <el-form-item  label="投票频道" >
                      <el-select v-model="dynamicValidateForm.selectChannel" placeholder="请选择投票频道">
                        <!--eslint-disable-next-line-->
                        <el-option v-for="i in channel" :label="channel.name" :value="i"></el-option>
                      </el-select>
                    </el-form-item>

                        <el-form-item prop="option1" label="选项1" :rules="{ required: true, message: '选项不能为空', trigger: 'blur' }">
                          <el-input v-model="dynamicValidateForm.option1"></el-input>
                        </el-form-item>

                        <el-form-item
                            v-for="(option, index) in dynamicValidateForm.options"
                            :label="'选项' + (index+2)"
                            :key="option.key"
                            :prop="'options.' + (index+2) + '.value'"
                            :rules="{required: true, message: '选项不能为空', trigger: 'blur' }">
                          <el-input v-model="option.value"></el-input><el-button @click.prevent="removeOption(option)">删除</el-button>

                        </el-form-item>

                        <el-form-item>
                          <el-button @click="addOption">新增选项</el-button>
                        </el-form-item>

                    <el-form-item label="详细描述">
                      <el-input type="textarea" v-model="dynamicValidateForm.desc"></el-input>
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" @click="submitForm('dynamicValidateForm')">立即创建</el-button>
                      <el-button>取消</el-button>
                      </el-form-item>

                  </el-form>

              </div>
            </div>
          </div>

          <!--eslint-disable-next-line-->
          <transition-group name="list-complete" tag="p" >
            <div v-show="flagOftext" class="textArea" :key="1">

              <div class="headOfvoteData">
                <span >投票内容{{i}}</span>
              </div>
              <div class="voteChannel">
                <!--    现有投票-->
                <div class="voteNowHave">
                  <div>
                    现&nbsp;有&nbsp;投&nbsp;票&nbsp;项:
                    <span>666</span>
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
      //count:0,
      ChannelId: this.$route.query.id,
      flagOfvoteCenter:false,
      flagOftext:true,
      flagOfvoteData:true,
      flagOfvoteContent:true,
      flagOfstartCreate:false,
   
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

    startCreate(){
      this.flagOftext = !this.flagOftext,
      this.flagOfstartCreate = !this.flagOfstartCreate
    },


  },
  created() {
    this.list()
  //  this.load()
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

}

.textArea div{
  margin-top: 0px;
}

.voteCreate{
  flex: 14;
  width: 100%;
  overflow-y: auto;
  position: relative;
}
.voteCreate div{
  border-radius: 15px;
  margin-top: 20px;

}

.voteCreate div:hover{
  transform: scale(1,1);
}

.voteEdit{
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