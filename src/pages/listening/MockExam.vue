<template>
  <div class="mock_exam_panel">
      <div class="container">
          <div class="title">历年考试真题</div>
          <ul>
              <li v-for="e of exams" :key="e.id" class="hvr-curl-top-right">
                  <div class="topic">{{e.title}}</div>
                  <button class="beginBtn hvr-outline-out" @click="beginMockExam(e.id)">开始考试</button>
              </li>
          </ul>
      </div>
      <div class="skill">
          <div class="title">听力考试技巧</div>
          <h4>一、调整心理状态</h4>
          <div class="text">心理状态就是一个人的心情。心情的好坏，会直接地影响我们工作、学习的效果。</div>
          <h4>二、注意辨别近音</h4>
          <div class="text">
              同音、近音词句一样，在英语语言中也有许多单词读音很接近。它们在被读出时，很容易对考生造成干扰，使你产生多余的联想。另外，在对所提问题设定的选项中，通常会出现与听力材料中读音接近的单词，作为对原句中音或义的干扰。比如：
                W: I've got to buy a new car<br>
                M: Really?<br>
                Q: What does the woman mean?<br>
                选项：<br>
                A) She purchased a car recently.<br>
                B) She knew the car was in the lot.<br>
                C) She always forgets to clean her car.<br>
                D) She really needs a new car.<br>
                可以看出，B)项中的knew是对原文中new的近音干扰，C)项中的forget是对have got to的近音干扰。因此，在遇到这类题时，要求考生要仔细，不要一看到干扰项就立即作出选择，从而中了题设陷阱。
          </div>
          <h4>三、要做必要记录</h4>
          <div class="text">
              同学们对于记忆的培养很重要。记有两种形式，一是用脑记，二是用手记。人的脑力是有时间局限的，超出一定的时间，信息就会弱化，甚至消失。因此，训练作笔录能力大有好处。在听较长的信息时，一边脑记并理解，一边还要做笔录，只有这样，才能有效地理解和判断。如果没有记住关键内容，所做的判断当然无凭无据，正确性就会大打折扣。
          </div>
          <h4>四、快速浏览选项</h4>
          <div class="text">
              考生要切记，对付一切听力考试都行之有效的做法是快速浏览选择项并提炼信息点，再找出选项间的联系点。当录音人在即将开始读Directions时，这就是你阅读选择项的最佳时机。应充分抓住这段时间，速读选项，预测内容，从而做到心中有数。通过阅读，应明确以下信息：
a) 题目所涉及到的主要人物，地点等，如是场景类考题，应迅速联想起与该场景有关的词汇，全神贯注地倾听相关信息。<br>
b) 一般四个选择项的设计都会和录音内容或多或少地有点关系，以使能够造成干扰。
          </div>
          <h4>五、掌握因果逻辑</h4>
          <div class="text">
              在四级听力测试的题目中，有关原因及结果或是引起与被引起的关系比重很大，若是考生对此类问题加强认识，则对提高听力大有裨益。
首先要掌握一些体现原因的词，如because，as，due to，on account of，in that，so…that，such…that，now that，thanks to，owing to，result in，give rise to等等。熟悉这些词或词组的表达法很重要。
另外，表达先后顺序通过时态上也可体现出因果关系。
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name : 'MockExam',
    data(){
        return{
            exams:[]
        }
    },
    methods:{
        //进入考试面板
        beginMockExam(index){
            if(this.$store.state.userData == ''){
                this.$bus.$emit('showAlert','考试前需要先登录')
            }else{
                this.$router.push(
                    {
                        path : '/exam',
                        query:{
                            from : 'MockExam',
                            id : index
                        }
                    }
                )
            }
        }
    },
    mounted(){
        scrollTo(0,0)
        this.$http.get('/getAllListeningMockExams').then(
            response=>{
                if(response.data.code == 200){
                    this.exams = response.data.data
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
.mock_exam_panel{
    width: 1200px;
    margin: 20px auto;
    .container{
        width: 1200px;
        box-shadow: 0 0 10px @lightblack;
        .title{
            width: 1000px;
            margin: 0 0 0 100px;
            height: 80px;
            line-height: 80px;
            font-size: 30px;
            font-weight: bolder;
            color: rgb(88, 88, 88);
            text-align: center;
            border-bottom: 2px solid rgb(88, 88, 88);
        }
        ul{
            width: 1000px;
            margin: 30px 0 0 100px;
            overflow: hidden;
            li{
                float: left;
                width: 200px;
                height: 300px;
                background: rgb(216, 216, 216);
                margin:0 0 30px 40px;
                position: relative;
                .topic{
                    width: 160px;
                    margin: 20px 0 0 20px;
                    line-height: 30px;
                }
                .beginBtn{
                    position: absolute; bottom: 20px; left: 40px;
                    width: 120px;
                    height: 40px;
                    border-radius: 5px;
                    position: absolute;
                }
            }
        }
    }
    .skill{
        margin: 20px 0 0 0;
        padding: 0 0 50px 0;
        width: 1200px;
        box-shadow: 0 0 10px @lightblack;
        .title{
            width: 1000px;
            margin: 0 0 0 100px;
            line-height: 80px;
            height: 80px;
            text-align: center;
            font-size: 30px;
            font-weight: bolder;
            color: rgb(88, 88, 88);
            border-bottom: 2px solid rgb(88, 88, 88);
        }
        h4{
            width: 1000px;
            margin: 0 0 0 100px;
            height: 50px;
            line-height: 50px;
        }
        .text{
            width: 1000px;
            margin:  0 0 0 100px;
            line-height: 30px;
        }
    }
}
</style>