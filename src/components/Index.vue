<template>
  <div class="home">
      <div class="nav">
          <div class="menu">
              <ul>
                    <li>指南</li>
                    <li>关于我</li>
                    <li>学习</li>
                    <li @click="login">登录</li>
              </ul>
          </div>
      </div>
      <!-- 路由组件 -->
      <router-view/>

      <!-- 返回主页按钮 -->
      <div class="backToHome" @click="backHome">
          <span>返回主页</span>
      </div>
      <!-- 页脚版权区 -->
      <div class="copyright">
      </div>

      <!-- 登录页面 -->
      
      <div class="login_panel" v-show="status.mask">
          <transition name='login'>
          <div class="login" v-show="status.login">
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
                  <div class="img"></div>
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

  </div>
</template>

<script>
export default {
    name : 'Index',
    data(){
        return{
            status : {
                mask : false,
                login : false,
                register : false
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
            let date = new Date()
            let time = `${date.getFullYear()} ${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
            let info = 'account=' + this.login_info.account + '&' + 'password=' + this.login_info.password + '&'
            + 'last_loginDate=' + time
            this.$http.post('/login',info).then(
                response=>{
                    if(response.data.status){
                        if(response.data.code == 201){
                            this.$bus.$emit('showAlert','密码错误！')
                        }else{
                            //成功登录
                            this.$bus.$emit('showPrompt',response.data.msg)
                            this.login_info.account = '';this.login_info.password = ''
                            this.status.mask = false
                        }
                    }
                }
            )
        }
    },
    mounted(){
        
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
        position: relative;
        width: 100%;
        height: 100px;
        background : @lightblack;
        .menu{
            position: absolute; right: 100px; top: 0;
            width: 400px;
            height: 40px;
            ul{
                li{
                    float: left;
                    width: 100px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    user-select: none;
                    color: white;
                    transition: all .2s;
                }
                li:hover{
                    color: skyblue;
                }
            }
        }
    }
    .backToHome{
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
    .login_panel,.register_panel{
        position: fixed; top: 0; left: 0;
        min-width: 1400px;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.514);
        user-select: none;
        .login,.register{
            position: absolute; left: 50%; top : 50%;
            margin: -200px 0 0 -300px;
            width: 600px;
            height: 400px;
            background: rgb(238, 238, 238);
            box-shadow: 0 0 10px white;
            transition: all .3s;
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
}
.login-leave-to,.register-enter,.login-enter,.register-leave-to{
    transform: rotateY(90deg);
}
.login-leave,.register-enter-to,.login-enter-to,.register-leave{
    transform: rotateY(0);
}
</style>