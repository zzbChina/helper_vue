<template>
  <div class="reading_menu_panel">
      <div class="reading_top">
          <div class="reading_nav">
              <div class="title">精选分类</div>
              <ul>
                  <li v-for="f in itemName" :key="f.index" @click="intoFilter(f)">
                      {{f}}
                      <div class="font"></div>
                  </li>
              </ul>
          </div>
          <div class="reading_main" v-show="!status.filter">
                <div class="swiper">
                    <ul>
                        <li v-for="r in swiper.post" :key="r.index" ref="swiperItems" @mouseenter="clearTimer">
                            <transition name='swiper'>
                            <img :src="require('../../assets/reading/surfaces/' + r.surface)" alt=""  v-show="r.show">
                            </transition>
                            <div class="img_title" v-show="r.show">{{r.chinese_title}}</div>
                        </li>
                        
                    </ul>
                </div>
                <div class="hot_box">
                    <div class="box" v-for="r in hotItems" :key="r.index" @click="choseThisReading(r.id)">
                        <img :src="r.surface" alt="">
                        <div class="title">{{r.chinese_title}}</div>
                        <div class="hot">hot</div>
                    </div>
                </div>
          </div>
          <div class="reading_filter" v-show="status.filter">
              <button class="backToIndex" @click="status.filter = false">返回</button>
              <div class="topic">{{status.type}}</div>
              <div class="main_box"></div>
              <div class="num_res">为你找到个结果</div>
              <div class="contorlBtns">

              </div>
          </div>
      </div>
      <div class="reading_bottom">
          <div class="guest_yourlike_title">猜你喜欢</div>
      </div>
      
  </div>
</template>

<script>
// import Swiper from 'swiper'
export default {
    name : 'ReadingMenu',
    data(){
        return{
            itemName:[
                ' 艺术 Art',
                ' 政治 Politics',
                ' 科学与健康 Science and health',
                ' 科技 Science and technology',
                ' 文学 Literature',
                ' 运动 Motion',
                ' 娱乐时尚 Entertainment fashion',
                ' 军事 Military',
                ' 自然 Natural'
            ],
            swiper:{
                post : [

                ],
                num : 1,
            },
            hotItems:[],
            status:{
                filter:false,
                type : ''
            }
        }
    },
    methods:{
        clearTimer(){
            console.log(123)
        },
        //选择该文章
        choseThisReading(id){
            this.$http.get(`/getReadingItemInfo?id=${id}`).then(
                response=>{
                    if(response.data.code != 200){
                        this.$bus.$emit('showAlert','请求资源不存在')
                    }else{
                        this.$store.commit('reading',response.data.data[0])
                        this.$router.push('/reading')
                    }
                }
            )
        },
        //进入筛选界面
        intoFilter(value){
            this.status.type = value
            this.status.filter = true
        }
    },
    mounted(){
        //请求5张轮播图的封面
        this.$http.get('/getFiveReadingSurface').then(
            response=>{
                if(response.data.code != 200){
                    this.$bus.$emit('showAlert','请求超时')
                }else{
                    this.swiper.post = response.data.data
                    this.swiper.post[0].show = true
                }
            },
            error=>{
                console.log(error.message)
            }
        )
        //轮播
        
        setInterval(()=>{
            for(let i=0;i<this.swiper.post.length;i++){
                this.swiper.post[i].show = false
            }
            this.swiper.post[this.swiper.num].show = true
            this.swiper.num++
            if(this.swiper.num == 5){
                this.swiper.num = 0
            }
        },5000)

        //获取最热门的三条数据
        this.$http.get('/getHotReadingData').then(
            response=>{
                if(response.data.code == 200){
                    this.hotItems = response.data.data
                    for(let i=0;i<3;i++){
                        if(this.hotItems[i].chinese_title.length >= 10){
                            this.hotItems[i].chinese_title = this.hotItems[i].chinese_title.slice(0,10) + '...'
                        }
                        this.hotItems[i].surface = require('../../assets/reading/surfaces/' + this.hotItems[i].surface)
                    }
                    console.log(this.hotItems)
                }
            },
            error=>{
                this.$bus.$emit('showAlert','请求错误')
                console.log(error.message)
            }
        )
    }
}
</script>

<style lang='less'>
@lightblack : rgb(61, 61, 61); // 亮黑
.reading_menu_panel{
    margin: 20px auto;
    width: 1200px;
    .reading_top{
        width: 1200px;
        height: 600px;
        .reading_nav{
            float: left;
            width: 300px;
            height: 600px;
            box-shadow: 0 0 10px @lightblack;
            .title{
                width: 280px;
                height: 60px;
                line-height: 60px;
                padding: 0 0 0 20px;
                font-weight: bolder;
                font-size: 20px;
                background: rgb(240, 226, 209);
            }
            ul{
                width: 300px;
                height: 540px;
                li{
                    position: relative;
                    margin: 10px 0 0 10px;
                    width: 280px;
                    height: 40px;
                    font-weight: bolder;
                    line-height: 40px;
                    color: rgb(66, 35, 0);
                    box-sizing: border-box;
                    cursor: pointer;
                    transition: all .2s;
                    .font{
                        position: absolute; right: 0; top: 0;
                        width: 40px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                    }
                }
                li:hover{
                    transform: translateX(5px);
                    background: white;
                    color: rgb(95, 0, 0);
                }
            }
        }
        .reading_main,.reading_filter{
            position: relative;
            float: left;
            width: 880px;
            height: 600px;
            margin: 0 0 0 20px;
            box-shadow: 0 0 10px @lightblack;
            .swiper{
                position: absolute; top: 20px; left: 40px;
                width: 680px;
                height: 350px;
                border: 2px solid grey;
                ul{
                    position: relative;
                    width: 100%;
                    height: 100%;
                    li{
                        position: absolute;top: 0; left: 0;
                        width: 100%;
                        height: 100%;
                        transition: all .2s;
                        cursor: pointer;
                        img{
                            width: 100%;
                            height: 100%;
                            transition: all .3s;
                            cursor: pointer;
                        }
                        .img_title{
                            position: absolute;bottom: 0; left: 0;
                            width: 100%;
                            height: 40px;
                            line-height: 40px;
                            color: white;
                            background: black;
                            opacity: 0.8;
                        }
                    }
                }
            }
            .hot_box{
                width: 880px;
                height: 160px;
                position: absolute; top: 410px; left: 0;
                .box{
                    position: relative;
                    float: left;
                    width: 240px;
                    height: 160px;
                    box-shadow: 0 0 2px @lightblack;
                    margin:0 0 0 40px;
                    cursor: pointer;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                        opacity: 1;
                        transition: all .2s;
                    }
                    .title{
                        position: absolute;bottom: 0; left: 0;
                        width: 230px;
                        padding: 0 0 0 10px;
                        height: 40px;
                        line-height: 40px;
                        color: white;
                        background: rgba(0, 0, 0, 0.7);
                    }
                    .hot{
                        position: absolute; left: 0; top: 0;
                        width: 50px;
                        height: 20px;
                        text-align: center;
                        line-height: 20px;
                        background: darkred;
                        color: white;
                        opacity: 0.8;
                    }
                }
                .box:hover img{
                    transform: scale(1.1);
                    opacity: 0.8;
                }
            }
        }
        .reading_filter{
            .backToIndex{
                position: absolute; top: 20px; left: 20px;
                width: 120px;height: 40px;
                line-height: 40px;
                text-align: center;
                background: rgb(173, 0, 0);
                color: white;
                transition: all .2s;
            }
            .backToIndex:hover{
                background: red;
            }
            .topic{
                position: absolute; top: 20px;left: 50%;
                width: 300px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 22px;
                font-weight: bolder;
                margin: 0 0 0 -150px;
                color: rgb(97, 97, 97);
            }
            .main_box{
                position: absolute; top: 100px;left: 20px;
                width: 840px;
                height: 430px;
                background: #000;
            }
            .num_res{
                position: absolute; left: 20px; top: 540px;
                width: 200px;
                height: 30px;
                line-height: 30px;
                background: red;
            }
            .contorlBtns{
                position: absolute; right: 20px; top: 540px;
                width: 500px;
                height: 40px;
                background: #000;
            }
        }
    }
    .reading_bottom{
        width: 1200px;
        height: 400px;
        margin: 20px 0 0 0;
        box-shadow: 0 0 10px @lightblack;
    }
}
.swiper-enter,.swiper-leave-to{
    opacity: 0;
}
.swiper-enter-to,.swiper-leave{
    opacity: 1;
}
</style>