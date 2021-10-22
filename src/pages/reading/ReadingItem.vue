<template>
  <div class="reading_item_panel">
      <div class="top">
          <div class="en_title">{{readingMsg.english_title}}</div>
          <div class="ch_title">{{readingMsg.chinese_title}}</div>
          <div class="author_time">
              <div class="author">作者：{{readingMsg.source}}</div>
              <div class="time">发布时间：{{readingMsg.time}}</div>
          </div>
      </div>
      <div class="reading_content">
          <div class="reading_post">
              <img :src="require('../../assets/reading/illustrations/' + readingMsg.illustration)" alt="">
          </div>
          <div class="paragraph" v-for="c in content" :key='c.index'>
              {{c}}
          </div>
          <div class="finish">
              <div class="star" title="收藏这篇文章" v-show="!isStar" @click="starThis(true)"></div>
              <transition name='star'>
              <div class="is_star" title="已收藏该文章" v-show="isStar" @click="starThis(false)"></div>
              </transition>
              <button class="finishBtn" @click="finishReading">完成阅读</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name : 'ReadingItem',
    data(){
        return{
            readingMsg:{
                english_title:'',
                chinese_title:'',
                source:'',
                tiem:'',
                content:'',
                illustration:'5G插图.jpg'
            },
            content:[],
            isStar:false,
        }
    },
    methods:{
        //收藏该文章
        starThis(val){ 
            if(val){
                if(this.$store.state.userData == ''){
                    this.$bus.$emit('showAlert','请先登录')
                }else{
                    let date = new Date()
                    let time = `${date.getFullYear()} ${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
                    let info = 'user_id=' + this.$store.state.userData.id + '&'
                    + 'target_id=' + this.readingMsg.id + '&'
                    + 'reading_title=' + this.readingMsg.chinese_title + '&'
                    + 'time=' + time
                    this.$http.post('/starOneReading',info).then(
                        response=>{
                            if(response.data.code ==200){
                                this.isStar = true
                                this.$bus.$emit('showPrompt','收藏成功')
                            }
                        },
                        error=>{
                            console.log(error.message)
                        }
                    )
                }
                
            }else{
                //取消一个收藏
                let info = 'user_id=' + this.$store.state.userData.id + '&' + 'target_id=' + this.readingMsg.id
                this.$http.post('/cancelThisReadingStar',info).then(
                    response=>{
                        if(response.data.code == 200){
                            this.isStar = false
                            this.$bus.$emit('showPrompt','取消收藏成功')
                        }
                    },
                    error=>{
                        console.log(error.message)
                    }
                )
                
            }
            
        },
        //完成阅读并提交数据
        finishReading(){
            if(this.$store.state.userData == ''){
                this.$bus.$emit('showAlert','请先登录')
            }else{
                this.$http.get(`/finishOneReading?user_id=${this.$store.state.userData.id}&reading_id=${this.$store.state.readingInfo.id}`).then(
                    response=>{
                        console.log(response.data)
                        if(response.data.code == 200){
                            this.$bus.$emit('showPrompt','完成阅读，经验+5')
                        }else if(response.data.code == 202){
                            this.$bus.$emit('showAlert','同一用户不可重复提交')
                        }else{
                            this.$bus.$emit('showAlert','数据提交失败')
                        }
                    },
                    error=>{
                        console.log(error.message)
                        this.$bus.$emit('showAlert','数据获取失败')
                    }
                )
            }
        }
    },
    created(){
        
        //如果可以获取保存的translatedetail数据，则就提取该数据
        if (sessionStorage.getItem('data_readingItem')) {
            this.readingMsg = JSON.parse(sessionStorage.getItem('data_readingItem'))
        }
        if (sessionStorage.getItem('data_readingContent')) {
            this.content = JSON.parse(sessionStorage.getItem('data_readingContent'))
        }
        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            if(this.readingMsg != ''){
                sessionStorage.setItem('data_readingItem', JSON.stringify(this.readingMsg));
            }else{
                sessionStorage.setItem('data_readingItem', JSON.stringify(JSON.parse(sessionStorage.getItem('data_readingItem'))));
            }
            sessionStorage.setItem('data_readingContent', JSON.stringify(this.content));
        });
            
    },
    mounted(){
        scrollTo(0,0)//页面滚动到顶部
        if(this.$route.query.from == 'UserTable'){
            //选择该文章
            this.$http.get(`/getReadingItemInfo?id=${this.$route.query.data.target}`).then(
                    response=>{
                        if(response.data.code != 200){
                            this.$bus.$emit('showAlert','请求资源不存在')
                        }else{
                            this.$store.commit('reading',response.data.data[0])
                            if(this.$store.state.readingInfo != ''){
                                this.readingMsg = this.$store.state.readingInfo
                            }
                            this.content = this.readingMsg.content.split('&')
                        }
                    }
            )        
        }else{
            if(this.$store.state.readingInfo != ''){
                this.readingMsg = this.$store.state.readingInfo
            }
            this.content = this.readingMsg.content.split('&')
        }
        //检查该文章是否已经被该用户收藏
        let info = 'user_id=' + this.$store.state.userData.id + '&' + 'target_id=' + this.readingMsg.id
        this.$http.post('/checkStatusOfThisReading',info).then(
            response=>{
                console.log(response.data)
                if(response.data.code == 201){
                    console.log(response.data)
                    this.isStar = true
                }
            },
            error=>{
                console.log(error.message)
            }
        )
    },
    
}
</script>

<style lang='less'>
.reading_item_panel{
    margin: 20px auto;
    width: 1200px;
    .top{
        width: 1200px;
        box-shadow: 0 0 10px black;
        .en_title{
            width: 1100px;
            margin: 0 0 0 10px;
            line-height: 60px;
            font-size: 40px;
            font-weight: border;
            font-family: fantasy;
        }
        .ch_title{
            width: 1100px;
            margin: 0 0 0 10px;
            line-height: 30px;
            font-size: 20px;
            font-weight: bolder;
        }
        .author_time{
            width: 1100px;
            height: 30px;
            margin: 10px 0 0 10px;
            .author,.time{
                float: left;
                width: 900px;
                height: 30px;
                line-height: 30px;
            }
            .time{
                text-align: right;
                width: 200px;
            }
        }
    }
    .reading_content{
        width: 1200px;
        padding-top: 20px;
        box-shadow: 0 0 10px black;
        margin: 20px 0 0 0;
        .reading_post{
            margin-left: 100px;
            img{
                min-width: 600px;
                max-width: 1000px;
            }
        }
        .paragraph{
            width: 1000px;
            line-height: 30px;
            font-size: 20px;
            font-weight: bolder;
            text-indent: 2em;
            margin: 5px 0 0 100px;
        }
        .paragraph:nth-last-of-type(even){
            font-size: 18px;
            font-weight: normal;
            color: rgb(109, 62, 0);
        }
        .finish{
            width: 1000px;
            height: 120px;
            margin: 20px 0 0 100px;
            position: relative;
            .star,.is_star{
                position: absolute; right: 240px; top: 20px;
                width: 40px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                font-size: 30px;
                cursor: pointer;
                color: rgb(255, 196, 0);
                transition: all .2s;
            }
            .finishBtn{
                position: absolute; right: 0; top: 20px;
                width: 200px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                background: rgb(216, 141, 0);
                transition:all .2s;
            }
            .finishBtn:hover{
                color: white;
                background: rgb(253, 186, 61);
            }
        }
    }
}
.star-enter{
    transform: scale(1.5);
}
.star-enter-to{
    transform: scale(1);
}
.star_leave{
    opacity: 1;
}
.star-leave-to{
    opacity: 0;
}
</style>