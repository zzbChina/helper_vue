<template>
<div>
  <div class="begin_mock_exam_panel">
      <div class="topic">{{exam.title}}<br>
            <span style="font-size:16px">考试时间：30分钟</span>
            <div class="audio_box">
                <audio :src="exam.resource" id="exam_audio" controls ref="audio"></audio>
            </div>
      </div>
      <div class="SA_part">
          <h3>Section A</h3>
          {{exam.sa_title}}
      </div>
      <div class="questions">
          <div class="p1_title">Questions 1 to 8 are based on the conversation you have just heard.</div>
          <div class="q_box" v-for="(option,id) of this.exam.sa_options" :key="option.index">
              <div class="question_id">第 {{id+1}} 题</div>
              <ul ref="questiona">
                  <li v-for="(q,index) of option" :key="q.index" >
                      <div class="chose_box" @click="choseThis($event,'A',id,index)"></div>
                      <span v-show="index == 0">A</span>
                      <span v-show="index == 1">B</span>
                      <span v-show="index == 2">C</span>
                      <span v-show="index == 3">D</span>
                      {{q}}
                  </li>
              </ul>
          </div>
      </div>
      <div class="SB_part">
          <h3>Section B</h3>
          {{exam.sb_title}}
      </div>
      <div class="questions">
          <div class="p1_title">Questions 9 to 15 are based on the passage you have just heard.</div>
          <div class="q_box" v-for="(option,id) of this.exam.sb_options" :key="option.index">
              <div class="question_id">第 {{id+9}} 题</div>
              <ul ref="questionb">
                  <li v-for="(q,index) of option" :key="q.index" >
                      <div class="chose_box" @click="choseThis($event,'B',id,index)"></div>
                      <span v-show="index == 0">A</span>
                      <span v-show="index == 1">B</span>
                      <span v-show="index == 2">C</span>
                      <span v-show="index == 3">D</span>
                      {{q}}
                  </li>
              </ul>
          </div>
      </div>
      <div class="SC_part">
          <h3>Section C</h3>
          {{exam.sc_title}}
      </div>
      <div class="questions">
          <div class="p1_title">Questions 16 to 25 are based on the recording you have just heard.</div>
          <div class="q_box" v-for="(option,id) of this.exam.sc_options" :key="option.index">
              <div class="question_id">第 {{id+16}} 题</div>
              <ul ref="questionc">
                  <li v-for="(q,index) of option" :key="q.index" >
                      <div class="chose_box" @click="choseThis($event,'C',id,index)"></div>
                      <span v-show="index == 0">A</span>
                      <span v-show="index == 1">B</span>
                      <span v-show="index == 2">C</span>
                      <span v-show="index == 3">D</span>
                      {{q}}
                  </li>
              </ul>
          </div>
          <div class="check_my_answer">
              <button class="commit" @click="finishExam">完成考试</button>
          </div>
      </div>
  </div>
  <div class="begin_mock_mask" v-show="begin_mask">
      <div class="confirm_box">
          <div class="title">模&nbsp;拟&nbsp;考&nbsp;试</div>
          <div class="time">考试时间:30分钟</div>
          <button style="background:orange;color:white" @click="starExam" class="hvr-push">开始考试</button>
          <button @click="$router.push('/mock_exam')" class="hvr-push">放弃考试</button>
      </div>
  </div>
  <div class="exam_report" v-show="report.status">
      <div class="box">
          <div class="title">成绩报告单</div>
          <div class="spend_time">本次考试你用了分钟</div>
          <div class="score">最终得分：{{report.score}}&nbsp;[答错{{error.length}}题]</div>
          <div class="error_record">
              <ul>
                  <li v-for="e of error" :key="e.index">
                      {{e.num}}:{{e.msg}}
                  </li>
              </ul>
          </div>
          <button class="exam_again" @click="tryAgain">再次测试</button>
          <button class="save_and_exit" @click="saveAndExit">保存并退出</button>
      </div>
  </div>
</div>
</template>

<script>
export default {
    name : 'BeginMockExam',
    data(){
        return{
            exam:{
                title:'',
                sa_options : '',
                resource:''
            },
            begin_mask:true,
            commit:{
                sa:[],
                sb:[],
                sc:[]
            },
            error:[],
            report : {
                status:false,
                score:0
            }
        }
    },
    methods:{
        //将索引号转化为ABCD
        transformIndex(value){
            if(value == 0){
                return 'A'
            }else if(value == 1){
                return 'B'
            }else if(value == 2){
                return 'C'
            }else if(value == 3){
                return 'D'
            }
        },
        //选择这个选项
        choseThis(e,panel,id,index){
            if(panel == 'A'){
                for(let i=0;i<4;i++){
                    this.$refs.questiona[id].children[i].children[0].classList.remove('active')
                }               
                this.commit.sa[id] = this.transformIndex(index)
                e.target.classList.add('active')
            }else if(panel == 'B'){
                for(let i=0;i<4;i++){
                    this.$refs.questionb[id].children[i].children[0].classList.remove('active')
                }
                this.commit.sb[id] = this.transformIndex(index)
                e.target.classList.add('active')
            }else if(panel == 'C'){
                for(let i=0;i<4;i++){
                    this.$refs.questionc[id].children[i].children[0].classList.remove('active')
                }
                this.commit.sc[id] = this.transformIndex(index)
                e.target.classList.add('active')
            }
        },
        //开始考试
        starExam(){
            this.begin_mask = false
            this.$refs.audio.play()
        },
        //完成考试
        finishExam(){  
            let res =   this.checkEmptyOptions()
            console.log(res)
            if(this.checkEmptyOptions()){
                let s = []
                for(let i=0;i<8;i++){
                    s.push(this.commit.sa[i])
                }
                for(let i=0;i<7;i++){
                    s.push(this.commit.sb[i])
                }
                for(let i=0;i<10;i++){
                    s.push(this.commit.sc[i])
                }
                for(let i=0;i<this.exam.answer.length;i++){
                    if(s[i] != this.exam.answer[i]){
                        this.error.push({
                            num : `第${i+1}题`,
                            msg : `你的答案:${s[i]}->正确答案:${this.exam.answer[i]}`
                        })
                    }
                }
                this.report.score = Math.round(7.1 * (25-this.error.length))
                this.report.status = true
            }else{
                this.$bus.$emit('showAlert','你还有选项没有填写')
            }
        },
        //检查是否有选项忘记填写函数
        checkEmptyOptions(){
            let res = 0
            for(let i=0;i<this.commit.sa.length;i++){
                if(this.commit.sa[i] == 'A' || this.commit.sa[i] == 'B' || this.commit.sa[i] == 'C' ||this.commit.sa[i] == 'D'){
                    res = res+1
                }
            }
            for(let i=0;i<this.commit.sb.length;i++){
                if(this.commit.sb[i] == 'A' || this.commit.sb[i] == 'B' || this.commit.sb[i] == 'C' ||this.commit.sb[i] == 'D'){
                    res = res+1
                }
            }
            for(let i=0;i<this.commit.sc.length;i++){
                if(this.commit.sc[i] == 'A' || this.commit.sc[i] == 'B' || this.commit.sc[i] == 'C' ||this.commit.sc[i] == 'D'){
                    res = res+1
                }
            }
            if(res == 25){
                return true
            }else{
                return false
            }
        },
        //再次测试
        tryAgain(){
            window.location.reload()   
        },
        //保存并退出
        saveAndExit(){
            this.$router.push('/mock_exam')
        }
    },
    mounted(){
        //获取该考试的内容
        this.$http.get(`/getListeningById?id=${this.$route.query.id}`).then(
            response=>{
                if(response.data.code == 200){
                    this.exam = response.data.data[0]
                    this.exam.resource = require('../../assets/listen/mock/' + this.exam.resource)
                    this.exam.answer = this.exam.answer.split('\n')
                    this.exam.sa_options = this.exam.sa_options.split('&')
                    for(let i=0;i<this.exam.answer.length;i++){
                        this.exam.answer[i] = this.exam.answer[i].slice(4,5)//截取答案字符串的答案部分
                    }
                    console.log(this.exam.answer)
                    for(let i=0;i<this.exam.sa_options.length;i++){
                        this.exam.sa_options[i] = this.exam.sa_options[i].split('/')
                    }
                    this.exam.sb_options = this.exam.sb_options.split('&')
                    for(let i=0;i<this.exam.sb_options.length;i++){
                        this.exam.sb_options[i] = this.exam.sb_options[i].split('/')
                    }
                    this.exam.sc_options = this.exam.sc_options.split('&')
                    for(let i=0;i<this.exam.sc_options.length;i++){
                        this.exam.sc_options[i] = this.exam.sc_options[i].split('/')
                    }
                    //数据保存
                    for(let i=0;i<8;i++){
                        this.commit.sa.push({})
                    }
                    for(let i=0;i<7;i++){
                        this.commit.sb.push({})
                    }
                    for(let i=0;i<10;i++){
                        this.commit.sc.push({})
                    }
                }
            },
            error=>{
                console.log(error.message)
            }
        )
    }
}
</script>

<style lang='less'>
@lightblack : rgb(61, 61, 61); // 亮黑
.begin_mock_exam_panel{
    width: 1200px;
    margin: 20px auto;
    .topic{
        width: 1100px;
        padding: 0 0 0 100px;
        line-height: 60px;
        font-size: 30px;
        font-weight: bolder;
        box-shadow: 0 0 10px @lightblack;
        .audio_box{
            width: 1000px;
            height: 80px;
            #exam_audio{
                width: 1000px;
                // height: 40px;
                display: block !important;
            }
        }
    }
    .SA_part,.SB_part,.SC_part{
        width: 1000px;
        padding: 0 100px 0 100px;
        margin: 20px 0 0 0;
        line-height: 30px;
        box-shadow: 0 0 10px @lightblack;
    }
    .questions{
        width: 1200px;
        margin: 20px 0 0 0;
        padding: 0 0 20px 0;
        box-shadow: 0 0 10px @lightblack;
        .p1_title{
            width: 1000px;
            margin: 0 0 0 100px;
            line-height: 50px;
            font-weight: bolder;
            color: rgb(141, 85, 0);
        }
        .q_box{
            width: 1000px;
            margin: 0 0 20px 100px;
            background: rgb(248, 248, 248);
            .question_id{
                background: white;
            }
            ul{
                li{
                    width: 1000px;
                    line-height: 30px;
                    position: relative;
                    .chose_box{
                        position: absolute; left: -30px; top: 5px;
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        line-height: 20px;
                        font-size: 20px;
                        cursor: pointer;
                        color: rgb(226, 226, 226);
                        transition: all .2s;
                    }
                    .chose_box:hover{
                        color: rgb(106, 189, 117);
                    }
                    .chose_box.active{
                        color:rgb(0, 209, 28);
                    }
                    span{
                        color: darkred;
                    }
                }
            }
            
        }
        .check_my_answer{
            width: 1000px;
            height: 200px;
            margin: 0 0 0 100px;
            position: relative;
            .commit{
                position: absolute; right: 0; top: 50px;
                width: 200px;
                height: 50px;
                background: rgb(182, 118, 0);
                color: white;
                line-height: 50px;
                text-align: center;
                transition: all .2s;
            }
            .commit:hover{
                background: orange;
            }
        }
    }
}
.begin_mock_mask{
    position: fixed;top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.432);
    .confirm_box{
        position: absolute; left: 50%; top : 50%;
        margin: -200px 0 0 -200px;
        width: 400px;
        height: 350px;
        background: white;
        .title{
            width: 400px;
            height: 80px;
            font-size: 25px;
            line-height: 80px;
            text-align: center;
        }
        .time{
            width: 400px;
            line-height: 40px;
            height: 80px;
            text-align: center;
        }
        button{
            width: 200px;
            height: 40px;
            line-height: 40px;
            margin: 20px 0 0 100px;
        }
    }
}
.exam_report{
    position: fixed;top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.432);
    
    .box{
        position: absolute; left: 50%; top : 50%;
        transform : translate(-50%,-50%);
        width: 400px;
        height: 500px;
        background: white;
        user-select: none;
        .title{
            width: 400px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            font-weight: bolder;
            font-size: 30px;
            color: rgb(88, 88, 88);
        }
        .spend_time{
            width: 400px;
            height: 50px;
            line-height: 50px;
            text-align: center;
        }
        .score{
            width: 400px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            
        }
        .error_record{
            position: relative;
            width: 320px;
            height: 150px;
            margin: 20px 0 0 40px;
            background: rgb(245, 245, 245);
            ul{
                width: 100%;
                height: 100%;
                overflow-y: scroll;
                overflow-x: hidden;
                li{
                    width: 310px;
                    height: 40px;
                    padding: 0 0 0 10px;
                    border-bottom: 1px solid grey;
                    box-sizing: border-box;
                    line-height: 39px;
                }
            }
        }
        .error_record:before{
            position: absolute; top: -35px; left: 50%;
            width: 200px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            margin: 0 0 0 -100px;
            content: '错题记录';
            color: darkred;
        }
        button{
            width: 200px;
            height: 40px;
            margin: 15px 0 0 100px;
            line-height: 40px;
            text-align: center;
            color: white;
            border-radius: 5px;
            transition: all .2s;
            background: rgb(66, 66, 66);
        }
        .exam_again{
            background: rgb(180, 81, 0);
        }
        button:hover{
            opacity: 0.9;
        }
    }
}
</style>