<template>
    <div class="viewOfPersonalData">
<!--      头像和消息通知区域-->
        <div class="informationArea">
<!--            头像区-->
            <div class="headAreaOfUser">
                <div style="height:50px;width: 50px;border-radius: 10px;overflow: hidden">
                    <el-upload
                            action="http://localhost:9090/file/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            class="avatar-uploader"
                    >
                        <img v-if="user.adurl" :src="user.adurl" style="width: 100%" class="avatar">
                        <img v-if="!user.adurl"  src="../assets/images/dadaya.jpg" style="width: 100%;height: 100%">
                    </el-upload>
                </div>

                <el-dropdown>
                <span style="margin-left: 10px;font-size: 14px;color: black;padding-left: 10px" class="el-dropdown-link">
                {{user.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                 </span>
                    <el-dropdown-menu slot="dropdown" class="liList">
                        <el-dropdown-item >
                            <span style="width: 100%;height: 100%" @click="closePersonalDataArea">个人信息</span>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <span  style="width: 100%;height: 100%" @click="closetextArea">每日一句</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
<!--            图标区-->
            <div class="IconArea">
               <i style="display: block;width: 30px;height: 30px;border-radius: 15px;background-color:#FFFFFF;text-align: center;
               line-height: 30px" class="el-icon-switch-button" @click="logout"></i>
                <i style="display: block;width: 30px;height: 30px;border-radius: 15px;background-color:#FFFFFF;text-align: center;
               line-height: 30px" class="el-icon-remove-outline" @click="displayNone"></i>
            </div>
        </div>


        <div class="mainBodyOfPersonalCenter">

            <transition-group name="list-complete" tag="p" appear>


                <div v-show="flagOftext" class="textArea" :key="1">
                    <i style="position: absolute; right: 15px;top: 10px;font-size: 18px;font-weight: bold;z-index:5" class="el-icon-close close" @click="closetextArea"></i>
                 <!--每日一言-->
                    <div style="text-align: center; padding: 0px 15px; font-size: 6px;font-weight: bold; flex: 2;color: black;width: 100%;display: flex;justify-content: center;align-items: center">
                        {{sentence}}
                    </div>
                </div>
                <!--        个人信息区域-->
            <div v-show="flagOfPersonalData" class="personalDataArea" :key="2">
                <i style="position: absolute; right: 15px;top: 10px;font-size: 18px;font-weight: bolder;z-index:5 " class="el-icon-close close" @click="closePersonalDataArea"></i>
<!--                表头区-->
                <div class="headOfPersonData">
                    <span style="flex: 3">我的名片</span>
                    <span  style="flex: 1">
                        <el-button v-show="flagOfChangeUserData" type="primary" round style="margin-right: 20px;background-color: rgba(255,255,255,0.1);color: #589D95;font-weight: bold;border: 1px solid #257B5E;height: 25px" @click="flagOfChangeUserData=!flagOfChangeUserData">保存</el-button>
                    </span>
                </div>
<!--                    个人信息区主题-->
                <div class="mainBodyOfPersonalData">
<!--                    默认信息展示-->
                    <div v-show="!flagOfChangeUserData" class="defaultInformation" @click="flagOfChangeUserData=!flagOfChangeUserData">
                        <!--                        身份ID-->
                        <div>
                            用&nbsp;户&nbsp;I&nbsp;D&nbsp;:
                            <span>{{user.id}}</span>
                        </div>
                        <!--                        姓名-->
                        <div>
                        用&nbsp;户&nbsp;名&nbsp;:
                            <span>{{user.name}}</span>
                        </div>
<!--                        性别-->
                        <div>
                        姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;:
                            <span>{{user.nickname}}</span>
                        </div>
<!--                        身份-->
                        <div>
                        身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份&nbsp;:
                            <span>{{user.role}}</span>
                        </div>

                    </div>

<!--                    修改信息-->
                    <div v-show="flagOfChangeUserData" class="changeDataOfUser">
                        <!--                        姓名-->
                        <div>
                            姓&nbsp;&nbsp;&nbsp;&nbsp;名:
                            <el-input v-model=user.name placeholder="请输入内容" style="width: 140px"></el-input>
                        </div>
                        <!--                        性别-->
                        <div>
                            性&nbsp;&nbsp;&nbsp;&nbsp;别:
                            <el-input v-model=user.sex placeholder="请输入内容"  style="width: 140px;"></el-input>
                        </div>
                        <!--                        身份-->
                        <div>
                            身&nbsp;&nbsp;&nbsp;&nbsp;份:
                            <el-input v-model=user.role placeholder="请输入内容"  style="width: 140px"></el-input>
                        </div>
                        <!--                        用户ID-->
                        <div>
                            用&nbsp;户&nbsp;ID:
                            <el-input v-model=user.identity placeholder="请输入内容"  style="width: 140px"></el-input>
                        </div>
                    </div>
                </div>
            </div>

            </transition-group>
        </div>


    </div>
</template>

<script>
    import 'animate.css'

    // eslint-disable-next-line no-unused-vars
    import axios, {Axios as request} from "axios";
    export default {
        name: "PersonalView",
        data(){
            return{
                flagOfPersonalCenter:false,
                flagOftext:true,
                flagOfPersonalData:true,
                localTionObj:{},
                sentence:"",
                user: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
                flagOfChangeUserData:false,

            }
        },
        methods:{
            logout(){
              this.$confirm('确定退出系统?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
              }).then(() => {
                this.request.post('/logout/?',this.user).then(res=>{   //退出登录路由
                  if(res.code=="1"){
                    this.$router.push("/login")
                    this.$message({
                      type: 'success',
                      message: '退出成功!'
                    })
                  }else {
                    this.$message.error("退出失败!")
                  }
                });

                setTimeout(() => {
                  location.reload() // 强制刷新
                }, 100)
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消退出'
                })
              })


            },

            displayNone(){
                this.$bus.$emit('personalCenterChange',this.flagOfPersonalCenter)
            },
            closetextArea(){
                this.flagOftext = !this.flagOftext
            },
            closePersonalDataArea(){
                this.flagOfPersonalData = !this.flagOfPersonalData
            },

            loadSentence(){
                this.request.get("https://v1.hitokoto.cn?c=j").then(res=>{
                        this.sentence = res.hitokoto
                })
            },
            //更新头像
            handleAvatarSuccess(res){
                var user = this.user
                this.user.adurl = res
                localStorage.removeItem("user")
                localStorage.setItem("user",JSON.stringify(this.user))
                this.request.post("http://localhost:9090/user/updataInforOfUser",user).then(res=>{
                    if(res.code==="200"){
                        this.$message.success("更换成功!")
                        this.$bus.$emit('updataAdurl',this.user.adurl)
                        return
                    }else {
                        this.$message.error("更换失败!")
                    }
                })
                console.log(res)
            },

        },
        created() {
            this.loadSentence()
        }
    }
</script>

<style scoped>
.viewOfPersonalData{
    width: 300px;
    height: 650px;
    background-color: #F5F7F9;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    right: 0px;
}
    .informationArea{
        width: 80%;
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 30px;
    }
    .mainBodyOfPersonalCenter{
        flex: 14;
        width: 100%;
        overflow-y: auto;
        position: relative;
    }
    .mainBodyOfPersonalCenter div{
        border-radius: 15px;
        margin-top: 20px;
    }
    .personalDataArea{
        width: 80%;
        height: 170px;
        background-color: white;
        margin-left: 30px;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-image: radial-gradient(circle farthest-side at 10% 90%, #FFE8EA, #EDF3FF 70%, #EDF2FB);
    }
    .personalDataArea div{
    margin-top: 0px;
    }


    .headAreaOfUser{
        flex: 5;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .textArea{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    height: 100px;
    background-color: white;
    margin-left: 30px;
    position: relative;
    background-image: url("../assets/images/sky.jpg");
    background-size: 100%;

    }
  .textArea div{
    margin-top: 0px;
}
    .IconArea{
        flex: 2;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        font-size: 16px;
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
.mainBodyOfPersonalCenter div {
    transition: all 0.5s;
}

    .mainBodyOfPersonalCenter div:hover{
        transform: scale(1.01,1.01);
    }
    .close:hover{
        cursor: pointer;
        color: #2b542c;
    }
    .headOfPersonData{
        height: 100%;
        width: 100%;
        flex: 2;
        display: flex;
        align-items: center;
        padding: 0 15px;
        font-weight: bold;
        font-size: 16px;
    }
    .mainBodyOfPersonalData{
        flex: 6;
        width: 100%;
    }
    .defaultInformation,.changeDataOfUser{
        display: flex;
        flex-direction: column;
        align-items: center;
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
.avatar {
    width: 50px;
    height: 50px;
    display: block;
}
</style>