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
<!--        数据可视化区域-->
        <div class="visualizationOfHome">

        </div>
<!--        可下载数据表格区域-->
        <div class="dataTableOfHome">

        </div>
    </div>
</template>

<script>

export default {
  name: "Home",
  data(){
    return {
      Num:'',
      Item:'',
      Voted:'',
    }
  },
  methods:{
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
    this.loadItem(),
    this.loadNum(),
    this.loadVoted()
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
    .dataDisplayOfHome{
        flex: 3;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 50px;
    }
    .visualizationOfHome{
        flex: 6;
        height: 100%;
        width: 100%;
        background-color: #DAF3EE;
    }
    .dataTableOfHome{
        flex: 5;
        height: 100%;
        width: 100%;
        background-color: #E5EBFD;
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
</style>