<template>
  <div class="user_main_panel">
      <div class="top">
          <div class="user_msg">
              <div class="head"></div>
              <div class="nickname"><span style="color:green"></span> 昵称：{{userInfo.nickname}}
                    <div class="update" @click="updateMyMessage('nickname')"></div>
              </div>
              <div class="age"><span style="color:orange"></span> 年龄：{{userInfo.age}}
                    <div class="update"></div>
              </div>
              <div class="gender"><span style="color:skyblue"></span> 性别：
                    <div class="update"></div>
              </div>
              <div class="address"><span style="color:darkred"></span> 地址：
                    <div class="update"></div>
              </div>
              <div class="register_time"><span style="color:purple"></span> 注册时间：{{userInfo.date}}
                    <div class="update"></div>
              </div>
          </div>
          <div class="user_table">
              <div class="user_table_nav">
                  <ul>
                      <li ref="translate" @click="choseTable('translate',0)"> 翻译</li>
                      <li ref="write" @click="choseTable('write',1)"> 写作</li>
                      <li ref="read" @click="choseTable('read',2)"> 周刊</li>
                      <li ref="book" @click="choseTable('book',3)"> 小说</li>
                  </ul>
              </div>
              <UserTable
                :table_index='table_index'
              />
          </div>
      </div>
      <div class="body"></div>
  </div>
</template>

<script>
import UserTable from './UserTable.vue'
export default {
    name : 'User',
    components:{
        UserTable
    },
    data(){
        return{
            userInfo:{

            },
            table_index:0
        }
    },
    methods:{
        //改变选择的板块
        choseTable(type,index){
            this.$refs.translate.classList.remove('active')
            this.$refs.write.classList.remove('active')
            this.$refs.read.classList.remove('active')
            this.$refs.book.classList.remove('active')
            this.table_index = index
            if(type == 'write'){
                this.$refs.write.classList.add('active')
            }else if(type == 'read'){
                this.$refs.read.classList.add('active')
            }else if(type == 'book'){
                this.$refs.book.classList.add('active')
            }else{
                this.$refs.translate.classList.add('active')
            }
        },
        //更新我的数据
        updateMyMessage(val){
            let msg = 'type=' + val + '&' + 'info=' + '我是帅哥'
            this.$http.post('/updateUserMessage',msg).then(
                response=>{
                    if(response.data.code == 200){
                        this.$bus.$emit('showPrompt','信息修改成功')
                    }
                },
                error=>{
                    this.$bus.$emit('showAlert','未知错误')
                    console.log(error.message)
                }
            )
        }
    },
    mounted(){
        scrollTo(0,0)
        this.userInfo = this.$store.state.userData
        this.$refs.translate.classList.add('active')
    }
}
</script>

<style lang='less'>
@lightblack : rgb(61, 61, 61); // 亮黑
.user_main_panel{
    width: 1200px;
    margin: 20px auto;
    .top{
        width: 1200px;
        height: 500px;
        .user_msg{
            float: left;
            position: relative;
            width: 400px;
            height: 500px;
            box-shadow: 0 0 10px @lightblack;
            .head{
                position: absolute; top: 20px; left: 20px;
                width: 250px;height: 250px;
                border-radius: 50%;
                border: 3px solid grey;
                box-sizing: border-box;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .nickname,.age,.gender,.address,.register_time{
                position: absolute; top: 290px; left: 20px;
                width: 350px;
                height: 30px;
                line-height: 30px;
                background: rgb(247, 247, 247);
                .update{
                    position: absolute; right: 20px; top: 0;
                    width: 30px;
                    height: 30px;
                    font-size: 20px;
                    text-align: center;
                    line-height: 30px;
                    color: darkred;
                    cursor: pointer;
                    transition: all .2s;
                }
                .update:hover{
                    color: red;
                }
            }
            .age{
                top: 330px;
            }
            .gender{
                top: 370px;
            }
            .address{
                top: 410px;
            }
            .register_time{
                top: 450px;
            }
        }
        .user_table{
            float: left;
            width: 780px;
            height: 500px;
            margin:  0 0 0 20px;
            box-shadow: 0 0 10px @lightblack;
            .user_table_nav{
                width: 740px;
                height: 60px;
                margin: 10px 0 0 20px;
                ul{
                    width: 100%;
                    height: 100%;
                    li{
                        float: left;
                        width: 140px;
                        text-align: center;
                        height: 60px;
                        line-height: 60px;
                        font-weight: bolder;
                        color: rgb(206, 206, 206);
                        box-sizing: border-box;
                        border-bottom: 3px solid rgb(206, 206, 206);
                        transition: all .2s;
                        cursor: pointer;
                    }
                    li:nth-of-type(1):hover,li:nth-of-type(1).active{
                        color: green;
                        border-bottom-color: green;
                    }
                    li:nth-of-type(2):hover,li:nth-of-type(2).active{
                        color: rgb(0, 145, 212);
                        border-bottom-color: rgb(0, 145, 212);
                    }
                    li:nth-of-type(3):hover,li:nth-of-type(3).active{
                        color: rgb(212, 120, 14);
                        border-bottom-color: rgb(212, 120, 14);
                    }
                    li:nth-of-type(4):hover,li:nth-of-type(4).active{
                        color: rgb(214, 8, 8);
                        border-bottom-color: rgb(214, 8, 8);
                    }
                }
            }
        }
        
    }
    .body{
        width: 1200px;
        height: 300px;
        margin: 20px 0 0 0;
        box-shadow: 0 0 10px @lightblack;
    }
}
</style>