<template>
  <div class="home_panel">
        <div class="chose_one">
            <!-- <img :src="require('../../assets/chosebg.jpg')" alt=""> -->
            <h6 class="big" ref="bubble1"></h6>
            <h6 class="mid" ref="bubble2"></h6>
            <h6 class="sml" ref="bubble3"></h6>
            <h6 class="big2" ref="bubble4"></h6>
            <div class="chose_title"></div>
            <div class="chose_translate_img" ref="chose_translate"></div>
            <div class="chose_write_img" ref="chose_write"></div>
            <button class="chose_translate hvr-grow-shadow" @click="choseTranslatePanel" @mouseenter="bubbleLeave('translate')"
            @mouseleave="bubbleEnter('translate')"
            >翻译练习</button>
            <button class="chose_write hvr-grow-shadow" @click="choseWritePanel" @mouseenter="bubbleLeave('write')"
            @mouseleave="bubbleEnter('write')"
            >写作练习</button>
        </div>
        <div class="other">
            <div class="lovely_reading_menu">
                <div class="reading_title"><span style="color:orange"></span> 最新英文周刊</div>
                <div class="more_readings" title="更多精美读物" @click="moreReadings">更多 </div>
                <div class="readings_list">
                    <ul>
                        <li v-for="r in readings" :key="r.id" class="hvr-underline-from-center">
                            <div class="title">{{r.chinese_title}}</div>
                            <button class="readBtn" @click="readThis(r.id)">read</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="selected_book">
                <div class="book_title"><span></span>&nbsp;精选英文书籍</div>
                <div class="book_menu">
                    <ul>
                        <li v-for="b in books" :key="b.id" @click="choseThisBook(b.id)">
                            <div class="back"></div>
                            <div class="blank"></div>
                            <img :src="b.cover" alt="">
                            <div class="name">{{b.name}}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 听力板块组件 -->
        <Listening/>
  </div>
</template>

<script>
import Listening from './Listening.vue'
export default {
    name : 'Home',
    components:{
        Listening
    },
    data(){
        return{
            readings:[],
            books:[]
        }
    },
    methods:{
        choseTranslatePanel(){
            this.$router.push('/translate')
        },
        //进入写作板块
        choseWritePanel(){
            this.$router.push('/write')
        },
        //进入更多阅读板块
        moreReadings(){
            this.$router.push('/reading_menu')
        },
        //阅读这边文章
        readThis(id){
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
        //特效
        bubbleLeave(val){
            this.$refs.bubble1.classList.add('active')
            this.$refs.bubble2.classList.add('active')
            this.$refs.bubble3.classList.add('active')
            this.$refs.bubble4.classList.add('active')
            if(val == 'translate'){
                this.$refs.chose_translate.classList.add('active')
            }else if(val == 'write'){
                this.$refs.chose_write.classList.add('active')
            }
            // for(let i=0;i<4;i++){
            //     this.$refs.bubble[i].classList.add('active')
            // }
        },
        bubbleEnter(val){
            this.$refs.bubble1.classList.remove('active')
            this.$refs.bubble2.classList.remove('active')
            this.$refs.bubble3.classList.remove('active')
            this.$refs.bubble4.classList.remove('active')
            if(val == 'translate'){
                this.$refs.chose_translate.classList.remove('active')
            }else if(val == 'write'){
                this.$refs.chose_write.classList.remove('active')
            }
            // for(let i=0;i<4;i++){
            //     this.$refs.bubble[i].classList.remove('active')
            // }
        },
        //选择这篇书籍
        choseThisBook(id){
            this.$store.commit('readBook',id)
            this.$router.push('/book_foreword')
        }
    },
    mounted(){
        scrollTo(0,0)//回到顶部
        //获取
        this.$http.get('/getSixReadings').then(
            response=>{
                this.readings = response.data.data
                this.readings.forEach((r)=>{
                    if(r.chinese_title.length > 15){
                        r.chinese_title = r.chinese_title.slice(0,15) + '...'
                    }
                })
            },
            error=>{
                console.log(error.message)
            }
        )
        //获取推荐书籍
        this.$http.get('/getRecommendBooks').then(
            response=>{
                if(response.data.code == 200){
                    this.books = response.data.data
                    for(let i=0;i<3;i++){
                        this.books[i].cover = require('../../assets/book/cover/' + response.data.data[i].cover)
                    }
                }
            },
            error=>{
                this.$bus.$emit('showAlert','请求失败')
                console.log(error.message)
            }
        )
    }
}
</script>

<style lang='less'>
@lightblack : rgb(61, 61, 61); // 亮黑
@green : rgb(28, 192, 6); // 绿色
@blue : rgb(16, 152, 206); // 蓝色
.home_panel{
    margin: 20px auto;
    width: 1200px;
    .chose_one{
            position: relative;
            width: 1200px;
            height: 300px;
            box-shadow: 0 0 10px @lightblack;
            overflow: hidden;
            background: rgb(207, 255, 235);
            transition: all .2s;
            .chose_translate_img,.chose_write_img{
                position: absolute; left: 50%; top : 35%;
                margin: -50px 0 0 -50px;
                width: 100px;
                height: 100px;
                color: @green;
                font-size: 40px;
                text-align: center;
                line-height: 100px;
                opacity: 0;
                transition: all .2s;
                transition-delay: .15s;
            }
            .chose_write_img{
                color: rgb(0, 162, 255);
            }
            .chose_translate_img.active,.chose_write_img.active{
                opacity: 1;
                transform: scale(2);
            }
            .big,.mid,.big2,.sml{
                width: 400px;
                height: 400px;
                border-radius: 50%;
                position: absolute; top: 100px;left: -200px;
                background: green;
                transition: all .3s;
            }
            .mid{
                width: 200px;
                height: 200px;
                top: -100px; left: 250px;
                background: orange;
                transition-delay: 0.07s;
            }
            .sml{
                top: 30px; left: 600px;
                width: 100px;
                height: 100px;
                background: skyblue;
                transition-delay: 0.1s;
            }
            .big2{
                top: -100px; left: 1000px;
                background: @green;
                transition-delay: 0.05s;
            }
            .big.active{
                transform: translateX(-200px);
            }
            .sml.active{
                transform: translateY(300px);
            }
            .mid.active{
                transform: translateY(-100px);
            }
            .big2.active{
                transform: translateX(200px);
            }
            img{
                width: 100%;
                height: 100%;
                opacity: 0.7;
            }
            .chose_title{
                position: absolute; top: 80px; left: 50%;
                width: 300px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                margin: 0 0 0 -150px;
            }
            .chose_translate,.chose_write{
                position: absolute; top: 210px; left: 50%;
                margin: 0 0 0 -250px;
                width: 200px;
                height: 50px;
                color: white;
                text-align: center;
                line-height: 50px;
                border-radius: 10px;
                background: @green;
            }
            .chose_write{
                margin: 0 0 0 50px;
                background: @blue;
            }
    }
    .other{
        width: 1200px;
        height: 400px;
        margin: 20px 0 0 0 ;
        .lovely_reading_menu{
            position: relative;
            float: left;
            width: 400px;
            height: 400px;
            box-shadow: 0 0 10px  @lightblack;
            transition: all .2s;
            .more_readings{
                position: absolute; right: 20px; top: 15px;
                width: 70px;
                height: 25px;
                line-height: 25px;
                font-weight: bolder;
                color: rgb(192, 93, 0);
                text-align: center;
                transition: all .2s;
                cursor: pointer;
            }
            .more_readings:hover{
                color: orange;
            }
            .reading_title{
                width: 380px;
                height: 60px;
                line-height: 60px;
                font-size: 20px;
                color: rgb(44, 44, 44);
                padding: 0 0 0 20px;
                transition: all .2s;
                cursor: pointer;
            }
            .reading_title:hover{
                opacity: 0.8;
            }
            .readings_list{
                width: 360px;
                height: 320px;
                margin: 0 0 0 20px;
                ul{
                    width: 100%;
                    height: 100%;
                    li{
                        position: relative;
                        width: 350px;
                        height: 40px;
                        padding: 0 0 0 10px;
                        line-height: 40px;
                        margin: 5px 0;
                        box-sizing: border-box;
                        cursor: pointer;
                        color: rgb(78, 78, 78);
                        background: rgb(241, 241, 241);
                        transition: all .2s;
                        .readBtn{
                            display: none;
                            position: absolute; right: 10px; top: 8px;
                            width: 60px;
                            height: 24px;
                            border-radius: 5px;
                            color: rgb(63, 63, 63);
                            background: rgb(218, 141, 0);
                            transition: all .2s;
                        }
                        .readBtn:hover{
                            color: white;
                            background: rgb(255, 166, 0);
                        }
                    }
                    li:hover{
                        color: rgb(0, 183, 255);
                    }
                    li:hover .readBtn{
                        display: block;
                    }
                }
            }
        }
        .selected_book{
            float: left;
            width: 780px;
            height: 400px;
            margin-left: 20px;
            box-shadow: 0 0 10px @lightblack;
            transition: all .2s;
            position: relative;
            .book_title{
                width: 380px;
                height: 60px;
                line-height: 60px;
                font-size: 20px;
                color: rgb(44, 44, 44);
                padding: 0 0 0 20px;
                transition: all .2s;
                cursor: pointer;
                span{
                    color: red;
                }
            }
            .book_menu{
                position: absolute; top: 100px; left: 20px;
                width: 740px;
                height: 280px;
                ul{
                    width: 100%;
                    height: 100%;
                    li{
                        position: relative;
                        float: left;
                        width: 140px;
                        height: 200px;
                        margin: 10px 0 0 80px;
                        -webkit-perspective: 500; 
                        box-shadow: 0 0 10px rgb(148, 148, 148);
                        transition: all .3s;
                        img{
                            position: absolute; top: 0; left: 0;
                            width: 100%;
                            height: 100%;
                            cursor: pointer;
                            transform-origin: left;
                            // transform-style: preserve-3d;
                            // -webkit-transform-style: preserve-3d;
                            transition: all .5s;
                        }
                        .blank,.back{
                            position: absolute; top: 0; left: 0;
                            width: 100%;
                            height: 100%;
                            transform-origin: left;
                            background: rgb(255, 252, 237);
                            transition: all .5s;
                            box-sizing: border-box;
                            border: 1px solid black;
                        }
                        .name{
                            position: absolute; left: 0;top: 200px;
                            height: 40px;
                            width: 140px;
                            text-align: center;
                            line-height: 40px;
                            font-weight:bolder;
                            color: rgb(80, 48, 0);
                        }
                    }
                    li:hover img{
                        transform: rotateY(-40deg);
                    }
                    li:hover .blank{
                        transform: rotateY(-30deg);
                    }
                    li:hover{
                        box-shadow: 0 0 10px black;
                    }
                }
            }
        }
    }
}
</style>