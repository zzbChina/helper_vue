<template>
  <div>
      <div class="loading_panel" v-show="isloading">
          <div class="loading" v-show="!iserror">加载中，请耐心等待...</div>
          <div class="error" v-show="iserror">加载失败，请返回上一级</div>
      </div>
      <div class="book_detail_panel">
        <div class="book_pages">
            <div class="topic">Chapter{{book.chapter}}&nbsp;&nbsp;{{book.title}}&nbsp;part{{book.page}}</div>
            <div class="picture">
                <img :src="book.picture" alt="">
            </div>
            <div class="content" v-for="c in book.content" :key="c.index">{{c}}</div>
            <div class="controlBtn">
                <button class="back" @click="lastPages">上一页</button>
                <button class="next" @click="nextPages">下一页</button>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name : 'Book',
    data(){
        return{
            book:[
                
            ],
            isloading:true,
            iserror : false,
            page:1
        }
    },
    methods:{
        //前往下一页
        nextPages(){
            scrollTo(0,0)
            this.page += 1
            this.isloading = true
            let info = 'conn_id=' + this.$store.state.bookId + '&' + 'page=' + this.page
            this.$http.post('/getThisBookMsgByPage',info).then(
                response=>{
                    this.book = response.data.data
                    this.book.content = this.book.content.split('&')
                    this.book.picture = require('../../assets/book/picture/' + this.book.picture)
                    this.isloading = false
                },
                error=>{
                    this.$bus.$emit('showAlert','数据请求失败')
                    console.log(error.message)
                }
            )
        },
        //回到上一页
        lastPages(){
            scrollTo(0,0)
            this.page -= 1
            if(this.page < 1){
                this.page = 1
            }else{
                this.isloading = true
                let info = 'conn_id=' + this.$store.state.bookId + '&' + 'page=' + this.page
                this.$http.post('/getThisBookMsgByPage',info).then(
                    response=>{
                        this.book = response.data.data
                        this.book.content = this.book.content.split('&')
                        this.book.picture = require('../../assets/book/picture/' + this.book.picture)
                        this.isloading = false
                    },
                    error=>{
                        this.$bus.$emit('showAlert','数据请求失败')
                        console.log(error.message)
                    }
                )
            }
        }
    },
    mounted(){
        let info = 'conn_id=' + this.$store.state.bookId + '&' + 'page=1'
        console.log(this.$store.state.bookId)
        this.$http.post('/getThisBookMsgByPage',info).then(
            response=>{
                this.book = response.data.data
                this.book.content = this.book.content.split('&')
                this.book.picture = require('../../assets/book/picture/' + this.book.picture)
                console.log(this.book)
                this.isloading = false
            },
            error=>{
                this.$bus.$emit('showAlert','数据请求失败')
                console.log(error.message)
            }
        )
    }
}
</script>

<style lang='less'>
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
.book_detail_panel{
    width: 1200px;
    margin: 20px auto;
    .book_pages{
        width: 1200px;
        line-height: 30px;
        margin: 0 0 20px 0;
        box-shadow: 0 0 10px black;
        .topic{
            width: 1150px;
            height: 60px;
            line-height: 60px;
            padding: 0 0 0 50px;
            font-size: 30px;
            font-weight: bolder;
            color: rgb(78, 0, 0);
        }
        .picture{
            margin: 0 0 0 50px;
            img{
                max-width: 1100px;
            }
        }
        .content{
            width: 1100px;
            line-height: 30px;
            margin: 0 0 0 50px;
            text-indent: 2em;
        }
        .content:nth-of-type(even){
            color: darkred;
        }
        .content:nth-of-type(odd){
            font-size: 20px;
            // font-weight: bolder;
        }
        .controlBtn{
            width: 1200px;
            height: 100px;
            position: relative;
            .next,.back{
                position: absolute; right: 50px; top: 50px;
                width: 120px;height: 40px;
                line-height: 40px;
                text-align: center;
                background: rgb(192, 125, 0);
                color: white;
                transition: all .2s;
            }
            .back{
                background: rgb(71, 186, 231);
                right: 200px;
            }
            .next:hover,.back:hover{
                opacity: 0.8;
            }
        }
    }
}
</style>