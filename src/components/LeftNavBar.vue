<template>
    <div class="bodyOfManage">
       <div class="leftNavbar" :style="{width: withOfIconType}">
<!--            头像区-->
           <div class="profileArea">
               <el-tooltip class="item" effect="dark" content="个人中心" placement="bottom">
                   <img v-if="user.adurl" :src="user.adurl" @click="personalCenterApper">
                   <img v-if="!user.adurl"  src="../assets/images/dadaya.jpg" @click="personalCenterApper">
               </el-tooltip>
           </div>
<!--           导航栏区-->
           <div class="barArea">
<!--               文字导航栏-->
               <transition
                       name="animate__animated animate__bounce"
                       enter-active-class="animate__fadeInUp"
                       leave-active-class="animate__zoomOut"
                       appear
               >
             <div v-show="flagOfShow" style="width: 100%;position: absolute">
                 <router-link :to="{name:'Home'}" active-class="active" >主页</router-link>
                 <router-link :to="{name:'Create'}" active-class="active" >我发起的投票</router-link>
                 <router-link :to="{name:'Participate'}" active-class="active" >我参与的投票</router-link>
           </div>
             </transition>
             <transition
                     name="animate__animated animate__bounce"
                     enter-active-class="animate__fadeInUp"
                     leave-active-class="animate__zoomOut"
                     appear
             >
<!--               图标导航栏-->
               <div v-show="!flagOfShow" style="width: 100%;">
                   <el-tooltip class="item" effect="dark"  content="主页" placement="right">
                   <router-link style="font-size: 20px" :to="{name:'Home'}"  active-class="active2"><li class="el-icon-s-home"></li></router-link>
                   </el-tooltip>
                   <el-tooltip class="item" effect="dark" content="我发起的投票" placement="right">
                   <router-link style="font-size: 20px" :to="{name:'Create'}" active-class="active2"><li class="el-icon-coffee-cup"></li></router-link>
                   </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="我参与的投票" placement="right">
                   <router-link style="font-size: 20px" :to="{name:'Participate'}"  active-class="active2"><li class="el-icon-s-custom"></li></router-link>
                   </el-tooltip>

               </div>
               </transition>
           </div>

<!--           转换格式按钮-->
           <div class="changeArea">
               <li class="el-icon-guide" @click="changeToIcon"></li>
           </div>
       </div>
    </div>
</template>

<script>
    export default {
        name: "LeftNavBar",
        data(){
            return{
                withOfIconType:'100px',
                flagOfShow:true,
                flagOfPersonalCenter:true,
                user: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
            }
        },
        methods:{
            changeToIcon(){

                this.flagOfShow= !this.flagOfShow
            },
            personalCenterApper(){
                this.$bus.$emit("personalCenterChange",this.flagOfPersonalCenter)
            }
        },

        mounted() {
        //    绑定全局事件
            this.$bus.$on('updataAdurl',(data)=>{

                this.user.adurl = data;
                console.log("@@@@@"+data)
            })
        },
        beforeDestroy() {
        //    解绑事件
            this.$bus.$off('updataAdurl')
        }

    }
</script>

<style scoped>
    .active{
        background-color: rgba(37,123,94,0.2);
        color: #257B5E;
    }
    .active2{
        color: #257B5E;
    }
    a{
        position: relative;
        text-decoration: none;
        display: block;
        height: 60px;
        text-align: center;
        line-height: 60px;
        color: #3C3F41;
    }
    a::before{
        display: block;
        content: "";
        width: 3px;
        height: 60px;
        position: absolute;
        border-radius: 10px;
    }
    a:hover::before{
        background-color: #69717A;
    }
    .bodyOfManage{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .leftNavbar{
        transition: 0.5s linear;
        overflow: hidden;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        height: 650px;
        width: 100px;
        background-color: #F5F7F9;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .profileArea{

        width: 100%;
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .profileArea:hover img{
        cursor: pointer;
    }
    .barArea{
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        flex: 7;
        font-weight: bold;
        position: relative;
    }
    .profileArea img{
        border-radius: 10px;
        width: 50px;
        height:50px;
    }
    .changeArea{
        flex: 2;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .changeArea li{
       font-size: 18px;
    }
    .changeArea li:hover{
        color: #257B5E;
        cursor: pointer;
    }


</style>