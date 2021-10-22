<template>
  <div class="home">
      <div class="nav">
          <div class="logo" title="祝英语四六级都可以高分通过">
              <img :src="require('../assets/logo.jpg')" alt="">
          </div>
          <div class="youdao_search">
              <div class="youdao">整句翻译</div>
              <input type="text" placeholder="请输入整段汉语...">
              <button class="searchBtn"></button>
          </div>
          <div class="menu">
              <ul>
                    <li>语法</li>
                    <li>攻略</li>
                    <li @click="show">翻译</li>
                    <li @click="login" ref="loginBtn" v-show="!status.logined">登录</li>
              </ul>
              <div class="user_panel" v-show="status.logined" @click="intoUser">
                  <div class="nickname">{{user.nickname}}</div>
              </div>
          </div>
      </div>
      <!-- 路由组件 -->
      <router-view/>

      <!-- 有道组件 -->
      <YouDao 
        v-show="youdao.translate.open"
      />
      <!-- 返回主页按钮 -->
      <div class="backToHome" @click="backHome">
          <span>返回主页</span>
      </div>
      <!-- 返回上一级按钮 -->
      <div class="backToPre" @click="backRouter" v-show="status.backBtn">
          <span>返回上页</span>
      </div>
      <!-- 页脚版权区 -->
      <div class="copyright">
          <div class="menu">
              <ul>
                  <li>关于</li>
                  <li @click="addSomeAdvise">建议</li>
                  <li>帮助</li>
                  <li>保护</li>
              </ul>
          </div>
          <div class="power">powerBy 郑子彬 2021/10/14</div>
          <div class="ICP_id">备案/许可证编号为：<a href="https://beian.miit.gov.cn">闽ICP备2021014843号</a> </div>
      </div>

      <!-- 登录页面 -->
      
      <div class="login_panel" v-show="status.mask">
          <transition name='login'>
          <div class="login" v-show="status.login">
              <div class="help">
                  <div class="msg">登录的账号可以是任意的字符，不需要QQ号或者邮箱等规范格式，密码推荐不输入自己常用密码</div>
              </div>
              <div class="close" @click="status.mask = false"></div>
              <div class="title">
                  登录
              </div>
              <!-- 输入账号 -->
              <div class="account">
                  <div class="img"></div>
                  <input type="text" @focus="focusAccount('login')" @blur="checkAccount('login')" v-model="login_info.account">
                  <div class="inputAlert" ref="accountPrompt">
                      {{alert.accountMsg}}
                  </div>
              </div>
              <!-- 输入密码 -->
              <div class="password" ref="passowrd">
                  <div class="img">
                  </div>
                  <input type="password" @focus="focusPassword('login')" @blur="checkPassword('login')" v-model="login_info.password">
                  <div class="inputAlert" ref="passwordPrompt">
                      {{alert.passwordMsg}}
                  </div>
              </div>
              <!-- 登录按钮 -->
              <button @click="loginMyAccount">登录</button>

              <div class="in_register" @click="toggleToRegister">没有账号？立即注册</div>
          </div>
          </transition>

          <transition name="register">
            <div class="register" v-show="status.register">
                <div class="close" @click="status.mask = false"></div>
                <div class="title">注册</div>
                <div class="account">
                    <div class="img"></div>
                    <input type="text" v-model="register_info.account" @focus="focusAccount('register')" @blur='checkAccount("register")' placeholder="输入2-12位字符作为你的账号">
                    <div class="inputAlert" ref="registerAccount">
                      {{alert.accountMsg}}
                  </div>
                </div>
                <div class="password">
                    <div class="img"></div>
                    <input type="password" v-model="register_info.password" @focus="focusPassword('register')" @blur='checkPassword("register")' placeholder='输入你的密码'>
                    <div class="inputAlert" ref="registerPassword">
                      {{alert.passwordMsg}}
                  </div>
                </div>
                <div class="repassword">
                    <div class="img"></div>
                    <input type="password" v-model="register_info.repassword" @focus='focusRepassword' @blur='checkRepassword' placeholder="再次输入密码">
                    <div class="inputAlert" ref="registerRepassword">
                      {{alert.repasswordMsg}}
                  </div>
                </div>
                <button @click="registerAccount">注册</button>
                <div class="back_login" @click="backToLogin">返回登录</div>
            </div>
          </transition>
          
      </div>

      <!-- 有道词典快捷 -->
      <transition name="youdao_dict_btn">
      <div class="youdao_dict_btn" @click="openYouDaoDict" v-show='!youdao.dict.open'>
          有道词典
      </div>
      </transition>
      <!-- 有道词典 -->
      <transition name="youdao_dict">
      <div class="youdao_dict hvr-curl-bottom-right" v-show="youdao.dict.open">
          <input type="text" v-model="youdao.dict.info" placeholder="请输入英文单词">
          <div class="searchBtn" @click="youdaoDictSearch"></div>
          <div class="content" v-show="youdao.dict.result.translation">
              <div class="translation">{{youdao.dict.result.translation}}</div>
              <div class="audio">[{{youdao.dict.result.phonetic}}]
                  <div class="audioBtn" @click="$refs.audio.play()"></div>
                  <audio :src="youdao.dict.result.audio" controls autoplay ref="audio"></audio>
              </div>
              <div class="explains" v-for="(e,index) in youdao.dict.result.explains" :key="e.index">{{index+1}}. {{e}}</div>
              <div class="wfs_title">单词形式</div>
              <div class='wfs' v-for='w in youdao.dict.result.wfs' :key="w.index">
                  {{w.wf.name}}{{w.wf.value}}
              </div>
              <div class="exam_type">考试范围</div>
              <div class="type" v-for="(t,index) in youdao.dict.result.exam_type" :key="t.index">{{index+1}}. {{t}}</div>
              
          </div>
          <transition name="youdao_error">
          <div class="error" v-show="youdao.dict.error">你查找的单词不存在</div>
          </transition>
          <button class="closeBtn hvr-shrink" @click="youdao.dict.open = false">关闭</button>
      </div>
      </transition>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import $ from 'jquery'
import YouDao from './YouDao.vue'
export default {
    name : 'Index',
    components:{
        YouDao
    },
    data(){
        return{
            status : {
                mask : false,
                login : false,
                register : false,
                backBtn : false,
                logined:false,
            },
            login_info:{
                account : '',
                password : ''
            },
            register_info:{
                account : '',
                password : '',
                repassword : ''
            },
            alert : {
                accountMsg : '请输入你的账号',
                passwordMsg : '请输入6-20位密码',
                repasswordMsg : '请再次输入密码'
            },
            //用户昵称
            user:{
                nickname : ''
            },
            youdao:{
                dict:{
                    info:'',
                    open: false,
                    result:{
                        translation:'',
                        explains:[],
                        wfs:'',
                        audio:'',
                        exam_type:'',
                    },
                    error:false,
                },
                translate:{
                    open:false
                }
            }
        }
    },
    methods:{
        //回到Home页面
        backHome(){
            this.$router.push('/home');
        },
        //登录
        login(){
                this.status.login = true,
                this.status.register = false
                this.status.mask = true
        },
        //账户获得焦点
        focusAccount(type){
            if(type == 'login'){
                if(this.login_info.account == ''){
                    this.$refs.accountPrompt.classList.add('active')
                }
            }else{
                if(this.register_info.account == ''){
                    this.$refs.registerAccount.classList.add('active')
                }
            }
        },
        //检查账户是否驶入正确
        checkAccount(type){
            if(type == 'login'){
                if(this.login_info.account != ''){
                    this.$refs.accountPrompt.classList.remove('active')
                }
            }else{
                if(this.register_info.account.length > 2){
                    this.$refs.registerAccount.classList.remove('active')
                }
            }
        },
        //密码获得焦点
        focusPassword(type){
            if(type == 'login'){
                if(this.login_info.password.length < 6 || this.login_info.password.length > 20){
                    this.$refs.passwordPrompt.classList.add('active');
                }
            }else{
                if(this.register_info.password.length < 6 || this.register_info.password.length > 20){
                    this.$refs.registerPassword.classList.add('active')
                }
            }
        },
        //确定密码获取焦点
        focusRepassword(){
            this.$refs.registerRepassword.classList.add('active')
        },
        //检查密码是否格式正确
        checkPassword(type){
            if(type == 'login'){
                if(this.login_info.password.length >= 6 && this.login_info.password.length <= 20){
                    this.$refs.passwordPrompt.classList.remove('active')
                }
            }else{
                if(this.register_info.password.length >= 6 && this.register_info.password.length <= 20){
                    this.$refs.registerPassword.classList.remove('active')
                }
            }
        },
        //检查二次密码是否正确
        checkRepassword(){
            if(this.register_info.password != this.register_info.repassword){
                this.alert.repasswordMsg = '两次密码不一致'
            }else if(this.register_info.password == this.register_info.repassword && this.register_info.password != ''){
                this.$refs.registerRepassword.classList.remove('active')
            }
        },
        toggleToRegister(){
            this.status.login = false,
            this.status.register = true
        },
        //返回登录页面
        backToLogin(){
            this.status.register = false,
            this.status.login = true
        },
        //注册
        registerAccount(){
            console.log(this.register_info.account)
            if(this.register_info.account == '' || this.register_info.passowrd == ''){
                this.$bus.$emit('showAlert','信息不能为空')
            }else if(this.register_info.account.length < 3 ){
                this.$bus.$emit('showAlert','账号不能短于2个字符')
            }else if(this.register_info.account.length > 12){
                this.$bus.$emit('showAlert','账号不能设置超过12位字符')
            }else if(this.register_info.password.length < 6 || this.register_info.password.length > 20){
                this.$bus.$emit('showAlert','密码的长度必须为6-20位')
            }else if(this.register_info.password != this.register_info.repassword){
                this.$bus.$emit('showAlert','两次密码输出不一致')
            }else{
                let date = new Date()
                let time = `${date.getFullYear()} ${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
                let nickname = `用户${Math.round(Math.random()*10000)}`
                let info = 'account=' + this.register_info.account + '&' + 'password=' + this.register_info.password
                + '&' + 'nickname=' + nickname + '&' + 'date=' + time
                this.$http.post('/register',info).then(
                    response=>{
                        if(response.data.status){
                            if(response.data.code == 404){
                                this.$bus.$emit('showAlert',response.data.msg)
                            }else{
                                //成功登录
                                this.$bus.$emit('showPrompt',response.data.msg)
                                this.login() // 切换到登录界面
                            }
                        }
                    },
                    error=>{
                        console.log(123)
                        console.log(error.message)
                    }
                )
                
            }
        },
        //登录我的账号
        loginMyAccount(){
            if(this.login_info.account == ''){
                this.$bus.$emit('showAlert','账号不能会空')
            }else if(this.login_info.password == ''){
                this.$bus.$emit('showAlert','密码不能为空')
            }else{
                let date = new Date()
                let time = `${date.getFullYear()} ${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
                let info = 'account=' + this.login_info.account + '&' + 'password=' + this.login_info.password + '&'
                + 'last_loginDate=' + time
                this.$http.post('/login',info).then(
                    response=>{
                        if(response.data.status){
                            if(response.data.code == 201){
                                this.$bus.$emit('showAlert','密码错误！')
                            }else if(response.data.code == 202){
                                this.$bus.$emit('showAlert',response.data.msg)
                            }else{
                                //成功登录
                                this.$bus.$emit('showPrompt',response.data.msg)
                                this.login_info.account = '';this.login_info.password = ''
                                this.status.mask = false
                                //将用户信息写入vuex
                                this.$store.commit('login',response.data.data[0])
                                this.status.logined = true
                                this.user.nickname = response.data.data[0].nickname
                            }
                        }
                    }
                )
            }
        },
        //返回上一级路由
        backRouter(){
            if(this.$route.path != '/home'){
                this.$router.back()
            }
        },
        show(){
            console.log(this.$store.state.userData)
        },
        //进入用户板块
        intoUser(){
            this.$router.push('/user')
        },
        //打开有道翻译面板
        openYouDaoDict(){
            this.youdao.dict.open = true
        },
        //有道词典翻译
        youdaoDictSearch(){
            if(this.youdao.dict.info == ''){
                return
            }
                let vue = this
                var appKey = '4002943f11ba74d2';
                var key = 'GVZACwEwEpwY9BjCaKubuuUxbnKheQNJ';//注意：暴露appSecret，有被盗用造成损失的风险
                var salt = (new Date).getTime();
                var curtime = Math.round(new Date().getTime()/1000);
                var query = this.youdao.dict.info;
                // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
                var from = 'zh-CHS';
                var to = 'en';
                var str1 = appKey + this.truncate(query) + salt + curtime + key;
                var vocabId =  '您的用户词表ID';

                var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
                $.ajax({
                    url: 'http://openapi.youdao.com/api',
                    type: 'post',
                    dataType: 'jsonp',
                    data: {
                        q: query,
                        appKey: appKey,
                        salt: salt,
                        from: from,
                        to: to,
                        sign: sign,
                        signType: "v3",
                        curtime: curtime,
                        vocabId: vocabId,
                    },
                    success: function (data) {
                        if(data.isWord){
                            vue.youdao.dict.result = data
                            vue.youdao.dict.result.translation = data.translation[0]
                            vue.youdao.dict.result.explains = data.basic.explains
                            vue.youdao.dict.result.phonetic = data.basic.phonetic
                            vue.youdao.dict.result.audio = `https://dict.youdao.com/dictvoice?audio=${vue.youdao.dict.result.translation}&type=1`
                            vue.youdao.dict.result.exam_type = data.basic.exam_type
                            vue.youdao.dict.result.wfs = data.basic.wfs
                        }else{
                            vue.youdao.dict.error = true
                            setTimeout(()=>{
                                vue.youdao.dict.error = false
                            },1400)
                        }
                        console.log(data)
                    } 
                    
                });
        },
        truncate(q){
            var len = q.length;
            if(len<=20) return q;
            return q.substring(0, 10) + len + q.substring(len-10, len);
        },
        //提供建议
        addSomeAdvise(){
            this.$router.push('/advise')
        }
        
    },
    watch:{
        $route(){
            if(this.$route.path != '/home'){
                this.status.backBtn = true
            }else{
                this.status.backBtn = false
            }
        },
        $store(){
            if(this.$store.state.userData != ''){
                this.$refs.loginBtn.style.display = 'none'
            }  
        }
        
    },
    mounted(){
        if(this.$route.path != '/home'){
            this.status.backBtn = true
        }else{
            this.status.backBtn = false
        }
        console.log(window.innerWidth)
    }
}
</script>

<style lang='less'>
@lightblack : rgb(61, 61, 61); // 亮黑
@green : rgb(28, 192, 6); // 绿色
@blue : rgb(16, 152, 206); // 蓝色
.home{
    min-width: 1450px;
    .nav{
        position: relative;
        width: 100%;
        height: 100px;
        background : @lightblack;
        .logo{
            position:absolute;top: 0; left: 10px;
            width: 100px;
            height: 100px;
            img{
                width: 100%;
                height: 100%;
                cursor: pointer;
                user-select: none;
            }
        }
        .youdao_search{
            position: absolute; top: 30px; left: 350px;
            width: 500px;
            height: 40px;
            background: white;
            box-shadow: 0 0 5px darkred;
            .youdao{
                position : absolute;left:-100px;top:0;
                width: 100px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: white;
                background: rgb(240, 140, 10);
            }
            input{
                width: 500px;
                height: 40px;
            }
            input:focus{
                outline: 0;
            }
            .searchBtn{
                position: absolute; right: -40px; top: 0;
                width: 40px;height: 40px;
                text-align: center;
                line-height: 40px;
                color: white;
                background: rgb(240, 140, 10);
                transition: all .2s;
            }
            .searchBtn:hover{
                background: rgb(255, 186, 96);
                font-size: 25px;
            }
        }
        .menu{
            position: absolute; right: 100px; top: 0;
            width: 400px;
            height: 40px;
            .user_panel{
                position: absolute; right: 25px; top: 10px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: white;
                cursor: pointer;
                .nickname{
                    position: absolute; top: 45px; left: 50%;
                    width: 180px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    margin-left: -90px;
                    color: white;
                }
            }
            ul{
                li{
                    float: left;
                    width: 100px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    user-select: none;
                    color: white;
                    cursor: pointer;
                    transition: all .2s;
                }
                li:hover{
                    color: skyblue;
                }
            }
        }
    }
    .backToHome,.backToPre{
        position: fixed; left: 50%; bottom: 170px;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 70px;
        font-size: 25px;
        color:rgb(139, 139, 139);
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
    .backToPre{
        bottom: 275px;
    }
    .backToPre:hover{
        transform: translateY(-3px);
        box-shadow: 0 0 15px black;
        color: rgb(221, 61, 12);
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
        color: rgb(207, 207, 207);
        
        ul{
            margin: 0 auto;
            width: 1200px;
            height: 50px;
            border-bottom: 2px solid rgb(207, 207, 207);
            li{
                float: left;
                margin: 0 0 0 40px;
                width: 250px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                cursor: pointer;
                user-select: none;
            }
            li:hover{
                color:white;
            }
        }
        .power{
            margin: 0 auto;
            margin-top: 20px;
            width: 1200px;
            height: 30px;
            line-height: 30px;
            text-align: center;
        }
        .ICP_id{
            margin: 0 auto;
            width: 1200px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            a{
                color: rgb(207, 207, 207);
            }
        }
    }
    .login_panel,.register_panel{
        position: fixed; top: 0; left: 0;
        min-width: 1400px;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.514);
        user-select: none;
        z-index: 3;
        .login,.register{
            position: absolute; left: 50%; top : 50%;
            margin: -200px 0 0 -300px;
            width: 600px;
            height: 400px;
            background: rgb(238, 238, 238);
            box-shadow: 0 0 10px white;
            transition: all .3s;
            .help{
                position: absolute; top: 10px; left: 10px;
                width: 30px;
                height: 30px;
                font-size: 25px;
                color: rgb(0, 238, 255);
                text-align: center;
                line-height: 30px;
                cursor: pointer;
                z-index: 1;
                // overflow: hidden;
                .msg{
                    position: absolute; bottom: 40px; left: -10px;
                    width: 300px;
                    height: 0;
                    transition: all .3s;
                    font-size: 15px;
                    text-indent: 2em;
                    color: transparent;
                    background: rgb(238, 238, 238);
                    box-shadow: 0 0 10px white;
                    line-height: 19px;
                    border-radius: 10px 10px 0 0;
                }
            }
            .help:hover{
                overflow: visible;
            }
            .help:hover .msg{
                color: black;
                height: 60px;
            }
            .close{
                position: absolute; right: 10px; top: 10px;
                width: 30px;
                height: 30px;
                font-size: 30px;
                text-align: center;
                line-height: 30px;
                color: darkred;
                cursor: pointer;
                transition: all .2s;
            }
            .close:hover{
                color: red;
            }
            .titel,.account,.password,.repassword{
                position: relative;
                margin: 40px 0 0 96px;
                width: 400px;
                height: 50px;
                border: 4px solid skyblue;
                background: aliceblue;
                .img{
                    position: absolute; top: 0; left: 0;
                    width: 50px;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    font-size: 25px;
                    color: rgb(0, 100, 139);
                }
                input{
                    margin-left:50px ;
                    width: 350px;
                    height: 50px;
                }
                input:focus{
                    outline: 0;
                }
                .inputAlert{
                    display: none;
                    position: absolute; top: 0px; right: 460px;
                    width: 200px;
                    height: 50px;
                    font-weight: bolder;
                    text-align: center;
                    line-height: 50px;
                    background: rgb(255, 255, 255);
                    border-radius: 10px;
                    animation: move .3s 1;
                }
                .inputAlert:after{
                    position: absolute; top: 10px; right: -30px;
                    content:'';
                    border:15px solid transparent;
                    border-left-color: rgb(255, 255, 255);
                }
                .inputAlert.active{
                    display: block;
                }
                @keyframes move {
                   0%{
                      transform: translateX(10px);
                   }
                   100%{
                      transform: translateX(0);
                   }
                }
            }
            .title{
                text-align: center;
                line-height: 50px;
                font-size: 30px;
                font-weight: bolder;
                color: rgb(65, 65, 65);
            }
            button{
                width: 400px;
                height: 60px;
                text-align: center;
                line-height: 60px;
                color: white;
                font-size: 18px;
                margin: 40px 0 0 100px;
                background: rgb(0, 134, 187);
                transition: all .2s;
            }
            button:hover{
                background: skyblue;
            }
            .in_register,.back_login{
                position: absolute; right: 10px; bottom: 5px;
                width: 200px;
                height: 30px;
                text-align: right;
                line-height: 30px;
                color: rgb(116, 116, 116);
                transition: all .2s;
                cursor: pointer;
            }
            .in_register:hover,.back_login:hover{
                color: rgb(0, 153, 255);
            }
        }
        .register{
            margin: -250px 0 0 -300px;
            height: 500px;
        }
        
    }
    .youdao_dict_btn{
        position: fixed; left: 0; top: 180px;
        width: 40px;
        height: 100px;
        border-radius: 5px;
        border: 3px solid rgb(255, 156, 27);
        background: rgb(153, 1, 1);
        color: white;
        text-align: center;
        font-size:21px;
        padding:10px 0 ;
        line-height: 25px;
        cursor: pointer;
        user-select: none;
        transition: all .2s;
        transition-delay: .3s;
    }
    .youdao_dict{
        position: fixed; top: 180px; left: 40px;
        width: 320px;
        height: 360px;
        box-shadow: 5px 5px 15px @lightblack;
        transition: all .4s;
        background: white;
        z-index: 2;
        input{
            position: absolute; top: 10px; left: 10px; 
            width: 260px;
            height: 40px;
            background: rgb(201, 201, 201);
        }
        input:focus{
            outline:none
        }
        .searchBtn{
            position: absolute; left: 270px; top: 10px;
            width: 40px;
            height: 40px;
            background: darkred;
            text-align: center;
            line-height: 40px;
            color: white;
            transition:all .2s;
            cursor: pointer;
        }
        .searchBtn:hover{
            background: red;
        }
        .content{
            position: absolute; left: 10px; top: 60px;
            width: 300px;
            // height: 200px;
            max-height: 220px;
            overflow-x: hidden;
            overflow-y: scroll;
            .translation{
                width: 300px;
                height: 40px;
                line-height: 40px;
                font-size: 24px;
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-weight: bolder;
                color: rgb(145, 0, 0);
            }
            .audio{
                width: 300px;
                line-height: 30px;
                color:orange;
                position: relative;
                .audioBtn{
                    position:absolute;right: 30px; top: 5px;
                    width: 20px;
                    height: 20px;
                    color: rgb(255, 123, 0);
                    text-align: center;
                    line-height: 20px;
                    cursor: pointer;
                    transition:all .2s;
                }
                .audioBtn:hover{
                    transform: scale(1.1);
                }
                audio{
                    display: none;
                }
            }
            .explains{
                width: 300px;
                line-height: 25px;
                font-size: 15px;
            }
            .wfs_title{
                width: 300px;
                height: 30px;
                line-height: 30px;
                font-weight: bolder;
                color: rgb(141, 0, 223);
            }
            .wfs{
                width: 300px;
                line-height: 30px;
                color: rgb(67, 0, 105);
            }
            .exam_type{
                width:300px;
                height: 30px;
                line-height: 30px;
                font-weight: bolder;
                color: skyblue;
            }
            .type{
                width: 300px;
                line-height: 20px;
                font-size: 15px;
            }
            
        }
        .error{
            position: absolute; left: 10px; top: 60px;
            width:300px;
            height:220px;
            text-align: center;
            line-height: 220px;
            font-weight: bolder;
            background: white;
            color: rgb(151, 0, 0);
            transition:all .2s;
        }
        .content::-webkit-scrollbar{
                width: 5px;
        }
        .content::-webkit-scrollbar-thumb{
                background: rgb(248, 124, 124);
                border-radius: 5px;
            }
        .closeBtn{
            position: absolute; bottom: 10px; left: 50%;
            width: 200px;height: 40px;
            text-align: center;
            line-height: 40px;
            color: white;
            background: darkred;
            transition: all .2s;
            margin: 0 0 0 -100px;
        }
        .closeBtn:hover{
            background: red;
        }
    }
}
.login-leave-to,.register-enter,.login-enter,.register-leave-to{
    transform: rotateY(90deg);
}
.login-leave,.register-enter-to,.login-enter-to,.register-leave{
    transform: rotateY(0);
}
.youdao_dict_btn-leave,.youdao_dict_btn-enter-to{
    transform: translateX(0);
}
.youdao_dict_btn-leave-to,.youdao_dict_btn-enter{
    transform: translateX(-45px);
}
.youdao_dict-enter,.youdao_dict-leave-to{
    transform: translateX(-400px);
}
.youdao_dict-enter-to,.youdao_dict-leave{
    transform: translateX(0);
}
.youdao_error-enter,.youdao_error-leave-to{
    opacity: 0;
    transform: scale(0.5);
}
.youdao_error-enter-to,.youdao_error-leave{
    opacity: 1;
    transform: scale(1);
}
</style>