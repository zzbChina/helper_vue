<template>
  <div class="write_detail_panel">
      <div class="topic">
          <div class="postImage">
              <img :src="detail_write.postImage" alt="">
          </div>
          <div class="title">{{detail_write.content}}</div>
          <div class="show_reference" @click="checkReference">参考答案</div>
      </div>
      
      <!-- 内容板块 -->
      <div class="content">
          <div class="content_title">
              <input type="text" placeholder="设置一个标题吧" ref="textarea" v-model="commit.topic">
          </div>
          <div class="style_btn">
              <ul>
                  <li @click="choseFontStyle">设置字体形态</li>
                  <li @click="choseFontSize">设置字体大小</li>
                  <li @click="choseFontColor"><span style="color:purple">设置字体颜色</span></li>
              </ul>
          </div>
          <div class="content_body">
              <textarea ref="textarea" v-model="commit.content"></textarea>
          </div>
          <div class="statistics_words">一共有 {{commit.words}} 个单词 </div>
          <!-- 笔记本 -->
          <div class="notebook">
                <img :src="require('../../assets/notebook.jpg')" alt="" @click="checkMyNote">
          </div>
          <div class="add_notebook">
              <h5> 笔记</h5>
              <button class="add" @click="checkMyNote">添加</button>
          </div>
          <div class="my_notebook" v-show="status.note">
              <transition name="note">
                  <div class="panel" v-show="status.note">
                      <div class="title">我的笔记 </div>
                      <div class="set_title">
                          <input type="text" placeholder="设置一个标题吧" v-model="commit.note.title">
                      </div>
                      <textarea placeholder='笔记内容...' v-model='commit.note.content'></textarea>
                    <div class="close" @click="status.note = false">
                        <div class="inner"></div>
                    </div>
                    <button class="saveBtn" @click="status.note = false">保存</button>
                </div>
              </transition>       
          </div>

          <!-- 个性面板 -->
          <transition name='style'>
          <div class="style_panel" v-show="status.style">
              <div class="font_style" v-show="status.font.style">
                  <ol>
                      <li class="hvr-wobble-skew" style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;" @click="choseThisFontStyle('Franklin')">Franklin</li>
                      <li class="hvr-wobble-skew" style="font-family:'Times New Roman', Times, serif" @click="choseThisFontStyle('Roman')">Roman</li>
                      <li class="hvr-wobble-skew" style="font-family: Microsoft YaHei;" @click="choseThisFontStyle('fantasy')">fantasy</li>
                  </ol>
              </div>
              <div class="font_size" v-show="status.font.size">
                  <div class="font_size_number">字号大小
                      <div class="number">{{fontSize}}</div>
                      <div class="down_size" @click="changeFontSize('down')"></div>
                      <div class="up_size" @click="changeFontSize('up')"></div>
                  </div>
              </div>
              <div class="font_color" v-show="status.font.color">
                  <ul class="color" @click="choseColor($event)">
                      <li style="background:darkred"></li>
                      <li style="background:green"></li>
                      <li style='background:black'></li>
                      <li style="background:purple"></li>
                      <li style="background:rgb(112, 64, 0)"></li>
                  </ul>
              </div>
              <div class="close_style" @click="status.style = false"></div>
          </div>
          </transition>

          <button class="submit hvr-radial-in">提交 </button>
          <!-- <button class="clear hvr-push">清空 </button> -->
      </div>

      <!-- 重点词汇预板块 -->
      <div class="key_words_panel_pre"> 重点词汇</div>

      <!-- 重点词汇板块 -->
      <div class="key_words_panel">
          <div class="keyword" v-for="(k,index) in refer.keywords" :key="k.index">
              <div class="index">{{index+1}}</div>
              <div class="word">{{k.word}}</div>
              <div class="translation">{{k.translation}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name : 'WriteDetail',
    props:['detail_write'],
    data(){
        return{
            refer:{
                msg : '隐藏',
                keywords:[]
            },
            //个性面板转台
            status:{
                style : false,
                font:{
                    style: false,
                    size : false,
                    color: false
                },
                note : false
            },
            fontSize:18,
            commit:{
                topic:'',
                centent : '',
                words:'',
                note:{
                    title : '',
                    content:''
                }
            }
        }
    },
    methods:{
        //选择个性化板块
        choseFontColor(){
            this.status.style = true

            this.status.font.size = false,
            this.status.font.color = true,
            this.status.font.style = false
        },
        choseFontSize(){
            this.status.style = true

            this.status.font.size = true,
            this.status.font.color = false,
            this.status.font.style = false
        },
        choseFontStyle(){
            this.status.style = true

            this.status.font.size = false,
            this.status.font.color = false,
            this.status.font.style = true
        },
        //选择字体
        choseThisFontStyle(type){
            if(type == 'Franklin'){
                this.removeClassList('Roman','fantasy')
                this.$refs.textarea.classList.add('Franklin')
                this.status.style = false
            }else if(type == 'Roman'){
                this.removeClassList('Franklin','fantasy')
                this.$refs.textarea.classList.add('Roman')
                this.status.style = false
            }else if(type == 'fantasy'){
                this.removeClassList('Franklin','Roman')
                this.$refs.textarea.classList.add('fantasy')
                this.status.style = false
            }
        },
        //消除类名复用函数
        removeClassList(x,y){
            for(let i=0;i<this.$refs.textarea.classList.length;i++){
                if(this.$refs.textarea.classList[i] == x){
                    this.$refs.textarea.classList.remove(x)
                    if(this.$refs.textarea.classList[i] == y){
                        this.$refs.textarea.classList.remove(y)
                    }
                }else if(this.$refs.textarea.classList[i] == y){
                    this.$refs.textarea.classList.remove(y)
                    if(this.$refs.textarea.classList[i] == x){
                        this.$refs.textarea.classList.remove(x)
                    }
                }
            }
        },
        //选择字体颜色
        choseColor(e){
            this.$refs.textarea.style.color = e.target.style.background
        },
        //改变字体大小
        changeFontSize(type){
            if(type == 'down'){
                if(this.fontSize > 15){
                    this.fontSize --;
                    this.$refs.textarea.style.fontSize = this.fontSize + 'px'
                }
            }else{
                if(this.fontSize < 25){
                    this.fontSize ++;
                    this.$refs.textarea.style.fontSize = this.fontSize + 'px'
                }
            }
        },
        //查看我的笔记
        checkMyNote(){
            this.status.note = true
        },
        //查看参考答案
        checkReference(){
            console.log(1)
        }
    },
    watch:{
        'commit.content':{
            handler(){
                let words = this.commit.content.split(' ')
                this.commit.words = words.length
                for(let w of words){
                    if(w.indexOf('.') != -1 || w.indexOf(',') != -1){
                        this.commit.words ++
                    }
                }
            }
        }
    },
    mounted(){
        //获取重点单词
        this.$http.get(`/getAllKeyWordsAboutIt?conn_id=${this.detail_write.id}&type=write`).then(
            response=>{
                if(response.data.status != false){
                    this.refer.keywords = response.data.data
                }
            }
        )
    }
}
</script>

<style lang='less'>
@lightblack : rgb(61, 61, 61); // 亮黑
@green : rgb(28, 192, 6); // 绿色
@blue : rgb(16, 152, 206); // 蓝色
.write_detail_panel{
    .topic{
        width: 1200px;
        height: 300px;
        box-shadow: 0 0 10px black;
        position: relative;
        .postImage{
            position: absolute; left: 20px; top: 20px;
            width: 180px;
            height: 260px;
            box-sizing: border-box;
            border:4px solid rgb(194, 194, 194);
            img{
                width: 100%;
                height: 100%;
            }
        }
        .title{
            position: absolute; top: 50%;left: 260px;
            width: 800px;
            height: 60px;
            line-height: 20px;
            margin: -30px 0 0 0;
        }
        .show_reference{
            position: absolute; right: 20px; top: 20px;
            width: 150px;
            height: 40px;
            color: white;
            text-align: center;
            line-height: 40px;
            background: rgb(43, 43, 43);
            cursor: pointer;
            transition: all .2s;
        }
        .show_reference:hover{
            opacity: 0.8;
        }
    }
    .content{
        position: relative;
        width: 1200px;
        height: 500px;
        margin-top: 20px;
        box-shadow: 0 0 10px @lightblack;
        .content_title{
            position: absolute; top: 20px; left: 20px;
            width: 300px;
            height: 30px;
            box-sizing: border-box;
            border-bottom: 3px solid skyblue;
            input{
                width: 100%;
                height: 100%;
            }
            input:focus{
                outline: 0;
            }
        }
        .content_body{
            position: absolute; top: 60px; left: 20px;
            width: 1160px;
            height: 300px;
            box-sizing: border-box;
            border: 3px solid skyblue;
            textarea{
                width: 100%;
                height: 100%;
                border: 0;
                resize: none;
                font-size: 18px;
            }
            textarea.Franklin{
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            }
            textarea.Roman{
                font-family:'Times New Roman', Times, serif
            }
            textarea.fantasy{
                font-family: Microsoft YaHei;
            }
            textarea:focus{
                outline: 0;
            }
        }
        .statistics_words{
            position: absolute; top: 375px; right: 20px;
            width: 300px;
            height: 30px;
            text-align: right;
            line-height: 30px;
        }
        .notebook{
            position: absolute; left: 20px; top: 375px;
            width: 80px;
            height: 100px;
            border: 3px solid grey;
            overflow: hidden;
            img{
                width: 100%;
                height:100%;
                transition: all .2s;
                cursor: pointer;
            }
        }
        .add_notebook{
            position: absolute; left: 120px; top: 375px;
            width: 80px;
            height: 100px;
            h5{
                position: absolute; top: 0; left: 0;
                width: 80px;
                height: 30px;
                font-size: 20px;
            }
            .add{
                position: absolute; left: 0; bottom: 0;
                width: 80px;
                height: 30px;
                color: white;
                line-height: 30px;
                text-align: center;
                background: rgb(158, 0, 0);
                border-radius: 5px;
                transition: all .2s;
            }
            .add:hover{
                background: red;
            }

        }
        .notebook:hover img{
            transform: scale(1.1);
        }
        .my_notebook{
            position: absolute; top: 0;left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0);
            overflow: hidden;
            .panel{
                position: absolute; left: 0; top : 0;
                width: 800px;
                height: 100%;
                background: rgb(241, 231, 231);
                transition: all .3s;
                .title{
                    position: absolute; top: 5px; left: 50%;
                    width: 200px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    margin: 0 0 0 -100px;
                    color: rgb(82, 49, 0);
                    font-size: 25px;
                    user-select: none;
                }
                .set_title{
                    position: absolute; top: 50px; left: 20px;
                    width: 300px;
                    height: 30px;
                    input{
                        width: 300px;
                        height: 30px;
                    }
                }
                textarea{
                    position: absolute; top: 100px; left: 20px;
                    width: 740px;
                    height: 290px;
                    background: rgb(255, 255, 255);
                }
                .close{
                    position: absolute; top: 50%; right: -20px;
                    width: 40px;
                    height: 80px;
                    background: rgb(255, 219, 60);
                    margin-top: -40px;
                    border-radius: 10px;
                    .inner{
                        position: absolute; left: 50%; top : 50%;
                        transform : translate(-50%,-50%);
                        width: 30px;
                        height: 70px;
                        background: rgb(139, 0, 0);
                        border-radius: 10px;
                        text-align: center;
                        line-height: 70px;
                        color: rgb(255, 226, 97);
                        transition: all .2s;
                        box-shadow: 0 0 5px rgb(73, 0, 0);
                        cursor: pointer;
                    }
                    .inner:hover{
                        font-size: 20px;
                    }
                }
                .saveBtn{
                    position: absolute; right: 40px; bottom: 50px;
                    width: 120px;
                    height: 40px;
                    border-radius: 10px;
                    background: rgb(28, 152, 201);
                    text-align: center;
                    line-height: 40px;
                    color: white;
                }
                .saveBtn:hover{
                    background: skyblue;
                }
            }
        }
        .style_btn{
            position: absolute; top: 20px; right: 20px;
            width: 450px;
            height: 30px;
            // background: #000;
            ul{
                li{
                    float: left;
                    width: 140px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    border-bottom: 3px solid skyblue;
                    cursor: pointer;
                    user-select: none;
                    transition: all .2s;
                }
                li:hover{
                    font-size: 18px;
                }
            }
        }
        .style_panel{
            position: absolute; right: 30px; top: 60px;
            width: 450px;
            height: 90px;
            background: rgb(240, 240, 240);
            opacity: 0.8;
            transform-origin: top;
            transition: all .3s;
            border-radius: 0 0 10px 10px;
            .font_style,.font_color{
                width: 450px;
                height: 50px;
                ol{
                    li{
                        float: left;
                        width: 100px;
                        height: 40px;
                        line-height: 30px;
                        text-align: center;
                        margin: 10px 0 0 37.5px;
                        box-sizing: border-box;
                        border: 5px solid grey;
                        cursor: pointer;
                    }
                }
                .color{
                    width: 300px;
                    height: 100px;
                    margin-left: 80px;
                    li{
                        float: left;
                        width: 40px;
                        height: 40px;
                        box-sizing: border-box;
                        border: 5px solid grey;
                        margin: 10px 10px;
                        background: rgb(226, 14, 14);
                        cursor: pointer;
                    }
                }
            }
            .font_size{
                width: 100%;
                height: 100px;
                .font_size_number{
                    position: absolute; left: 75px; top : 10px;
                    margin: 0 0 0 0;
                    width: 300px;
                    height: 40px;
                    font-weight: bolder;
                    line-height: 40px;
                    user-select: none;
                    .number{
                        position: absolute; left: 150px; top: 0;
                        width: 40px;
                        height: 40px;
                        text-align: center;
                        line-height: 30px;
                        box-sizing: border-box;
                        border: 5px solid grey;
                    }
                    .down_size,.up_size{
                        position: absolute; top: 0;left: 110px;
                        width: 40px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        cursor: pointer;
                        color: darkred;
                        transition: all .2s;
                    }
                    .up_size{
                        left: 190px;
                    }
                    .down_size:hover,.up_size:hover{
                        transform: scale(1.1);
                    }
                }
            }
            .close_style{
                position: absolute; left: 50%; top : 75px;
                margin-left: -10px;
                width: 20px;
                height: 20px;
                font-size: 20px;
                cursor: pointer;
                transition: all .2s;
            }
            .close_style:hover{
                transform: scale(1.1);
            }
        }
        .submit{
            position: absolute; right: 20px; bottom: 20px;
            width: 220px;
            height: 40px;
            // color: white;
            // background: rgb(13, 190, 196);
            transition: all .2s;
        }
        .submit:hover{
            opacity: 0.8;
        }
    }
    .key_words_panel_pre{
        margin:20px 0;
        width: 1200px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        user-select: none;
        color: gray;
        box-shadow: 0 0 10px @lightblack;
        cursor: pointer;
    }
    .key_words_panel{
        margin: 20px 0;
        padding: 20px 0;
        width: 1200px;
        box-shadow: 0 0 10px @lightblack;
        .keyword{
            position: relative;
            width: 1000px;
            height: 40px;
            line-height: 40px;
            margin: 20px 0 0 100px;
            border-radius: 5px;
            border: 2px solid rgb(5, 119, 134);
            box-shadow: 0 0 5px rgb(4, 122, 138);
            .index{
                position: absolute; top: 5px; left: -40px;
                width: 30px;height: 30px;
                border-radius: 50%;
                background: @lightblack;
                text-align: center;
                line-height: 30px;
                color: white;
            }
            .word,.translation{
                position: absolute; left: 10px; top: 0;
                width: 200px;
                height: 40px;
                line-height: 40px;
                color: black;
            }
            .translation{
                left: 300px;
                width: 300px;
            }
        }
    }
}
.style-enter,.style-leave-to{
    transform: rotateX(90deg);
}
.style-enter-to,.style-leave{
    transform: rotateX(0);
}
.note-enter,.note-leave-to{
    transform: translateX(-800px);
}
.note-enter-to,.note-leave{
    transform: translateX(0);
}
</style>