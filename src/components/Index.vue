<template>
  <div class="home">
      <div class="nav"></div>
      <!-- 路由组件 -->
      <router-view/>

      <!-- 返回主页按钮 -->
      <div class="backToHome" @click="backHome">
          <span>返回主页</span>
      </div>
      <!-- 页脚版权区 -->
      <div class="copyright">
      </div>
  </div>
</template>

<script>
export default {
    name : 'Index',
    data(){
        return{
            
        }
    },
    methods:{
        //回到Home页面
        backHome(){
            this.$router.push('/home');
        }
    }
}
</script>

<style lang='less'>
@lightblack : rgb(61, 61, 61); // 亮黑
@green : rgb(28, 192, 6); // 绿色
@blue : rgb(16, 152, 206); // 蓝色
.home{
    min-width: 1400px;
    .nav{
        width: 100%;
        height: 100px;
        background : @lightblack;
    }
    .backToHome{
        position: fixed; left: 50%; bottom: 170px;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 70px;
        font-size: 25px;
        box-shadow: 0 0 10px @lightblack;
        border-radius: 5px;
        cursor: pointer;
        margin: 0 0 0 620px;
        transition: all .2s;
        span{
            display: inline-block;
            width: 80px;
            height: 20px;
            position: absolute; left: 0;bottom: 10px;
            text-align: center;
            line-height: 20px;
            font-size: 15px;
        }
    }
    .backToHome:hover{
        transform: translateY(-3px);
        box-shadow: 0 0 15px black;
        color: rgb(162, 0, 255);
    }
    .copyright{
        margin: 10px 0 0 0;
        width: 100%;
        height: 150px;
        background: @lightblack;
    }
}

</style>