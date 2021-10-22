<template>
  <div class="home_listening_panel">
      <div class="title"><span style="color:rgb(43, 255, 0)"></span> 听力练习</div>
      <div class="chose_menu">
          <div class="left">
              <ul>
                  <li>
                      <button class="hvr-float-shadow" @click="pushToMockExam">模拟考试</button>
                  </li>
                  <li>
                      <button class="hvr-float-shadow">四级听力</button>
                  </li>
                  <li>
                      <button class="hvr-float-shadow">六级听力</button>
                  </li>
              </ul>
          </div>
          <div class="right">
              <ul>
                  <li>
                      <button class="hvr-float-shadow" style="background:rgb(34, 168, 0)">每日一听</button>
                  </li>
                  <li>
                      <button class="hvr-float-shadow" style="background:rgb(161, 0, 182)">情景会话</button>
                  </li>
                  <li>
                      <button class="hvr-float-shadow" style="background:rgb(185, 90, 0)">时事听力</button>
                  </li>
              </ul>
          </div>
      </div>
      <div class="img_box">
          <img :src="require('../../assets/listen.jpg')" alt="">
      </div>
  </div>
</template>

<script>
export default {
    name : 'Listening',
    methods:{
        //跳转至模拟考部分
        pushToMockExam(){
            this.$router.push(
                {
                    path : '/mock_exam'
                }
            )
        }
    }
}
</script>

<style lang='less'>
@lightblack : rgb(61, 61, 61); // 亮黑
.home_listening_panel{
    width: 1200px;
    height: 400px;
    box-shadow: 0 0 10px @lightblack;
    margin: 20px 0 0 0;
    position: relative;
    .title{
        width: 1180px;
        height: 60px;
        padding: 0 0 0 20px;
        line-height: 60px;
        font-size: 20px;
        color: rgb(44, 44, 44);
    }
    .chose_menu{
        position: absolute; left: 20px; top: 100px;
        width: 400px;
        height: 320px;
        .left,.right{
            width: 200px;
            height: 100%;
            float: left;
            ul{
                li{
                    width: 200px;
                    height: 80px;
                    position: relative;
                    button{
                        position: absolute; left: 50%; top : 50%;
                        margin: -25px 0 0 -75px;
                        width: 150px;
                        height: 50px;
                        background: rgb(197, 0, 0);
                        border-radius: 5px;
                        color: white;
                    }
                    button:hover{
                        opacity: 0.8;
                    }
                }
            }
        }
    }
    .img_box{
        position: absolute;right: 40px;top: 40px;
        width: 620px;
        height: 320px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>