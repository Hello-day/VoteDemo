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
                   <el-button round size="medium" @click="open">新建频道</el-button>
                   <el-button round size="medium" @click="startCreate" ref='btn1'>新建投票</el-button>
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
                    <el-input v-model="dynamicValidateForm.name"></el-input>
                  </el-form-item>

                  <el-form-item  label="投票频道" >
                    <el-select v-model="dynamicValidateForm.channelName" placeholder="请选择投票频道">
                      <!--eslint-disable-next-line-->
                      <el-option v-for="i in channel" :label="i.name" :value="i.name"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item prop="option1" label="选项1" :rules="{ required: true, message: '选项不能为空', trigger: 'blur' }">
                    <el-input v-model="dynamicValidateForm.option1"></el-input>
                  </el-form-item>

                  <el-form-item
                      v-for="(option, index) in dynamicValidateForm.options"
                      :label="'选项' + (index+2)"
                      :key="option.key"
                      :prop="'options.' + (index+2) + '.optionName'"
                      :rules="{required: true, message: '选项不能为空', trigger: 'blur' }">
                    <el-input v-model="option.optionName"></el-input><el-button @click.prevent="removeOption(option)">删除</el-button>

                  </el-form-item>

                  <el-form-item>
                    <el-button @click="addOption">新增选项</el-button>
                  </el-form-item>

                  <el-form-item label="详细描述">
                    <el-input type="textarea" v-model="dynamicValidateForm.description"></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="submitForm()">立即创建</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>

                </el-form>

              </div>
            </div>
          </div>

          <!--eslint-disable-next-line-->
          <transition-group name="list-complete" tag="p" appear v-for="i in myVote">
            <div v-show="flagOftext" class="textArea" :key="i">
              <div class="headOfvoteData">
                <el-popover
                    placement="bottom"
                    width="160"
                    v-model="visible" >
                  <p>要删除此投票吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="visible = false">取消</el-button>  <!--点击取消应该让这个气泡消失，我还没写-->
                    <el-button type="primary" size="mini" @click=closetextArea(i)>确定</el-button>
                  </div>
                  <el-button slot="reference" style="position: absolute;right: 15px;top: 10px;">删除</el-button>
                </el-popover>

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
      changeBtn:'返回',
      channel:[],
      myVote:[],  //储存我创建的投票，里面数据删掉
      user: localStorage.getItem("user"),
      flagOfvoteCenter:false,
      flagOftext:true,
      flagOfvoteData:true,
      flagOfvoteContent:true,
      flagOfstartCreate:false,

      dynamicValidateForm: {
        options: [{
          voteId:'',
          optionName: ''
        }],
        option1: '',

        name: '',
        channelName: '',
        description: ''
      },
      vote_Id:''

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
    open() {
      this.$prompt('请输入频道名', '新建频道', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,  //用了个简单正则，判断输入是否为空
        inputErrorMessage: '频道名不能为空！'
      }).then(( value ) => {
        this.request.post('/channel/add/',value).then(res=>{  //路径没配，value为输入的频道名称
          if(res.code=="1"){
            this.$message({
              type: 'success',
              message: '新建频道名: ' + value.value
            });

            this.request.get("/channel/list").then(res=>{ //刷新频道列表
              if(res.code == 1){
                this.channel=res.data
              }else{
                prompt(res.msg)
              }
            });
          }
          else{
            this.$message.error("新建失败！")
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消新建'
        });
      });
    },

    goBack() {
      this.$router.go(-1)
    },

    closetextArea(i){   //删除投票

      // this.myVote.splice(i-1, 1);  //从数组中删除，使这项不显示，应该放到删除成功下面，此处为测试用

      this.request.get('/vote/delete/'+ i.id).then(res=>{  //路由没配
        if(res.code=="1"){
          this.$message.success("删除成功！")
          // this.myVote.splice(i-1, 1);
          this.request.get("/vote/mine").then(res => {
            this.myVote = res.data
        })
          
        
        }
        else{
          this.$message.error("删除失败！")
        }
      })

    },

    list(){
      this.request.get("/channel/list").then(res=>{
        if(res.code == 1){
          this.channel=res.data
        }else{
          prompt(res.msg)
        }
        // console.log(this.channel)
        this.request.get("/vote/mine").then(res => {
        this.myVote = res.data
        })
      })
    },
    // loadMyVote() {
      
    // },
    submitForm() {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   }else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      //   else{
      //     this.$message.error("提交失败！")
      //   }
      // }),
      this.request.post('/vote/add/', this.dynamicValidateForm).then(res=>{
        if(res.code=="1"){
          this.$message.success("提交成功！")
          this.vote_Id = res.data
          console.log(this.vote_Id)
          this.dynamicValidateForm.options.unshift({
            voteId:'',
            optionName: ''
          })
          this.dynamicValidateForm.options[0].optionName=this.dynamicValidateForm.option1;
          for(let i=0;i<this.dynamicValidateForm.options.length;i++){
            console.log(i+" "+this.vote_Id)
            this.dynamicValidateForm.options[i].voteId = this.vote_Id
          }
          // for(let i in this.dynamicValidateForm.options){
          //   i.voteId = this.vote_Id
          // }
          this.request.post('/option/add', this.dynamicValidateForm.options).then(res=>{
            if(res.code=="1"){
              this.$message.success("提交成功！")
            }
            else{
              this.$message.error("提交失败！")
            }
          })
          this.flagOftext = !this.flagOftext,
              this.flagOfstartCreate = !this.flagOfstartCreate
        }
        else{
          this.$message.error("提交失败！")
        }
        this.request.get("/vote/mine").then(res => {
          this.myVote = res.data
        })
      })

    },

    removeOption(item) {
      var index = this.dynamicValidateForm.options.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.options.splice(index, 1)
      }
    },
    addOption() {
      this.dynamicValidateForm.options.push({
        voteId:'',
        optionName: ''
      });
    },
    //load () {
    //  this.count += 2
    //},
    startCreate(){

      var n = this.changeBtn;
      this.changeBtn = this.$refs.btn1.$el.innerText;
      //this.$refs.btn1是取上面id为btn1的元素（说id是不严谨的）
      this.$refs.btn1.$el.innerText = n;
      this.flagOftext = !this.flagOftext;
      this.flagOfstartCreate = !this.flagOfstartCreate;
      // this.request.get("/channel/list")
    },
  },
  created() {
    this.list()
    // this.loadMyVote()
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
  justify-content: start;
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

</style>