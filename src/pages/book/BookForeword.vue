<template>
<div>
    <div class="loading_panel" v-show="isloading">
        <div class="isloading" v-show="!iserror">加载中，请耐心等待...</div>
        <div class="iserror" v-show="iserror">加载失败，请返回上一级</div>
    </div>
    <div class="book_foreword_panel" v-show="!isloading">
        <div class="book_foreword_container">
            <div class="title">
                <div class="name">《{{info.name}}》</div>
                <div class="en_name">{{info.en_name}}</div>
            </div>
            <div class="cover">
                <div class="book_cover">
                    <img :src="info.cover" alt="">
                </div>
                <div class="blank2"></div>
                <div class="blank"></div>
                <div class="mask">
                    <button @click="into">进入</button>
                </div>
            </div>
            <div class="author">作者: {{info.author}}</div>
            <div class="recommend_title">简介:</div>
            <div class="recommend">{{info.recommend}}</div>
        </div>
    </div>
</div>
  
</template>

<script>
export default {
    name : 'BookForeword',
    data(){
        return{
            info:{
                name:'',
                en_name:'',
                recommend:'',
                cover:'',
            },
            isloading:true,
            iserror:false
        }
    },
    methods:{
        //进入阅读板块
        into(){
            scrollTo(0,0)
            this.$router.push('/book')
        }
    },
    mounted(){
        //获取对应书籍的基本信息
        this.$http.get(`/getThisBookBasicInfo?id=${this.$store.state.bookId}`).then(
            response=>{
                if(response.data.code == 200){
                    this.info = response.data.data
                    this.info.cover = require('../../assets/book/cover/' + this.info.cover)
                    this.isloading = false
                }
            },
            error=>{
                console.log(error.message)
                this.$bus.$emit('showAlert','数据请求失败')
                this.iserror = true
            }
        )
    }
}
</script>

<style lang='less'>
@lightblack : rgb(61, 61, 61); // 亮黑
.loading_panel{
    width: 1200px;
    height: 500px;
    margin: 20px auto;
    .loading,.iserror{
        width: 1100px;
        height: 50px;
        text-align: center;
        font-size: 20px;
        line-height: 50px;
        margin: 50px 0 0 50px;
    }
}
.book_foreword_panel{
    width: 1200px;
    margin: 20px auto;
    .book_foreword_container{
        width: 1200px;
        box-shadow: 0 0 10px @lightblack;
        .title{
            width: 1100px;
            height: 110px;
            padding: 20px 0 0 0;
            margin: 0 0 0 50px;
            .name{
                width: 1200px;
                height: 60px;
                font-size: 35px;
                font-family: '黑体';
                line-height: 60px;
                font-weight: bolder;
                color: rgb(85, 61, 0);
            }
            .en_name{
                width: 1200px;
                height: 30px;
                line-height: 30px;
            }
        }
        .cover{
            position: relative;
            width: 600px;
            height: 400px;
            margin: 0 0 0 300px;
            -webkit-perspective: 500;
            cursor: pointer;
            .book_cover,.blank,.blank2{
                position: absolute; top : 50%;
                margin: -150px 0 0 190px;
                width: 220px;
                height: 300px;
                transform-origin: left;
                background: #000;
                transition: all .8s;
            }
            .book_cover{
                z-index: 1;
                border: 5px solid rgb(63, 63, 63);
                box-sizing: border-box;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .blank{
                background: linear-gradient(to right,rgb(238, 222, 201),rgb(212, 182, 143));
                // transition: all .6s;
                // transition-delay: .1s;
            }
            .blank2{
                background: linear-gradient(to left,rgb(238, 222, 201),rgb(212, 182, 143));
                box-shadow: 3px 3px 20px rgb(105, 105, 105);
            }
            .mask{
                position: absolute; left: 50%; top : 50%;
                transform : translate(-50%,-50%);
                width: 500px;
                height: 300px;
                button{
                    position: absolute; left: 50%; top : 50%;
                    margin: -20px 0 0 -60px;
                    width: 120px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    color: white;
                    background: rgb(184, 101, 0);
                    border-radius: 8px;
                    transition:all .2s;
                }
                button:hover{
                    background: rgb(255, 144, 8);
                    transform: scale(1.2);
                    box-shadow: 0 0 30px rgb(172, 172, 172);
                }
            }
        }
        .cover:hover .book_cover{
            z-index: 0;
            margin-left: 300px;
            box-shadow: 3px 3px 20px rgb(105, 105, 105);
            transform: rotateY(-180deg);
        }
        .cover:hover .blank{
            margin-left: 300px;
            transform: rotateY(-180deg);
        }
        .cover:hover .blank2{
            margin-left: 300px;
        }
        .author{
            width: 1100px;
            height: 40px;
            line-height: 40px;
            font-weight: bolder;
            margin: 0 0 0 50px;
        }
        .recommend_title{
            width: 1100px;
            font-weight: bolder;
            margin: 0 0 0 50px;
        }
        .recommend{
            margin: 0 0 0 50px;
            width: 1100px;
            padding: 0 0 50px 0;
            line-height: 30px;
            text-indent: 2em;
        }
    }
}

</style>