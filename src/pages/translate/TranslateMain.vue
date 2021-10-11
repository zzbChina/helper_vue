<template>
  <div class="translate_main_panel">
      <!-- 菜单选择部分 -->
      <div class="translate_menu">
          <div class="chose_years">
              <div class="title">选择年份</div>
              <ul>
                  <li v-for="(y,index) in years" :key="y.index" class="hvr-outline-out" @click="choseYears(index)" ref="years">
                      {{y}}
                  </li>
              </ul>
          </div>
          <div class="chose_type">
              <div class="title">选择类型</div>
              <ul>
                  <li v-for="(t,index) in types" :key="t.index" class="hvr-outline-out" @click="choseTypes(index)" ref="types">
                      {{t}}
                  </li>
              </ul>
          </div>
          <div class="chose_level">
              <div class="title">选择级别</div>
              <ul>
                  <li v-for="(l,index) in levels" :key="l.index" class="hvr-outline-out" @click="choseLevels(index)" ref="levels">
                      {{l}}
                  </li>
              </ul>
          </div>
      </div>
      <!-- 结果展示部分 -->
      <div class="search_result">
          <div class="detail_part">
              <div class="postImage">
                  <img :src="detail_translate.postImage" alt="">
              </div>
              <div class="title">{{detail_translate.title}}</div>
              <div class="year">年份：{{detail_translate.year}}</div>
              <div class="type">类型：{{detail_translate.type}}</div>
              <div class="level">等级：{{detail_translate.level}}</div>
              <!-- 翻译按钮 -->
              <button>翻译</button>
          </div>
          <div class="result_items_box">
              <ul>
                  <li v-for="(t,index) in translates" :key="t.id" @click="selectIt(index)">
                      &nbsp; &nbsp; &nbsp;{{t.title}} &nbsp; &nbsp;{{t.topic}}
                  </li>
              </ul>
          </div>
          <div class="result_number">一共找到 {{translates.length}} 个结果</div>
      </div>
  </div>
</template>

<script>
export default {
    name : 'TranslateMain',
    data(){
        return{
            years:['2021','2020','2019','2018','2017','更早'],
            types:['风景翻译','文化翻译','现象翻译','议论翻译','历史翻译','状物翻译'],
            levels:['大学四级','大学六级'],

            translates:[],
            detail_translate:{
                postImage : '',
                title : '',
                year : '',
                type : '',
                level : '',
            }
        }
    },
    methods:{
        //选择年份
        choseYears(id){
            for(let i=0;i<this.years.length;i++){
                this.$refs.years[i].classList.remove('active')
            }
            this.$refs.years[id].classList.add('active')
            console.log(this.$router)
        },
        //选择类型
        choseTypes(id){
            for(let i=0;i<this.types.length;i++){
                this.$refs.types[i].classList.remove('active')
            }
            this.$refs.types[id].classList.add('active')
        },
        //选择级别
        choseLevels(id){
            for(let i=0;i<this.levels.length;i++){
                this.$refs.levels[i].classList.remove('active')
            }
            this.$refs.levels[id].classList.add('active')
        },
        //选择文章
        selectIt(id){
            this.detail_translate = this.translates[id]
            this.detail_translate.postImage = require('../../assets/postImage/' + this.translates[id].postImage)
        }
    },
    mounted(){
        //获取所有的翻译材料
        this.$http.get('/getAllTranslateMaterials').then(
            response=>{
                console.log(response.data)
                this.translates = response.data.data
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
@green : rgb(28, 192, 6); // 绿色
@blue : rgb(16, 152, 206); // 蓝色

.translate_main_panel{
    position: relative;
    margin: 20px auto;
    width: 1200px;
    background: white;
    .translate_menu{
        width: 1200px;
        height: 200px;
        user-select: none;
        box-shadow: 0 0 10px @lightblack;
        .chose_years,.chose_type,.chose_level{
            position: absolute; left: 50px;
            width: 1100px;
            height: 40px;
            border-bottom: 3px solid rgb(173, 173, 173);
            .title{
                position: absolute; top: 5px; left: 0;
                width: 100px;
                height: 30px;
                color: white;
                text-align: center;
                line-height: 30px;
                background: black;
            }
            ul{
                position: absolute; left: 120px; top: 5px;
                height: 30px;
                li{
                    float: left;
                    height: 30px;
                    width: 120px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    font-size: 15px;
                    font-weight: bolder;
                    margin-left: 30px;
                    color: rgb(199, 199, 199);
                    cursor: pointer;
                    transition: all .2s;
                }
                li:hover{
                    color: rgb(255, 123, 0);
                }
                li.active{
                    background: rgb(42, 179, 0);
                    color:rgb(255, 255, 255);
                }
            }
        }
        .chose_years{
            top: 20px;
        }
        .chose_type{
            top: 80px;
            .title{
                background: @blue;
            }
        }
        .chose_level{
            top: 140px;
            .title{
                background: purple;
            }
        }
    }
    .search_result{
        position: relative;
        width: 1200px;
        height: 500px;
        margin: 20px 0 0 0;
        box-shadow: 0 0 10px @lightblack;
        .detail_part{
            position: absolute; top: 20px; left: 20px;
            width: 300px;
            height: 460px;
            box-sizing: border-box;
            border: 5px solid rgb(169, 218, 238);
            user-select: none;
            .postImage{
                position: absolute; top: 20px; left: 20px;
                width: 150px;
                height: 200px;
                box-sizing: border-box;
                border: 4px solid rgb(163, 163, 163);
                background: rgb(163, 163, 163);
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .title,.year,.type,.level{
                position: absolute; left: 20px; top: 250px;
                width: 250px;
                height: 40px;
                line-height: 40px;
            }
            .title{
                line-height: 25px;
            }
            .year{
                top: 300px;
                height: 30px;
                line-height: 30px;
            }
            .type{
                top: 330px;
                height: 30px;
                line-height: 30px;
            }
            .level{
                top: 360px;
                height: 30px;
                line-height: 30px;
            }
            button{
                position: absolute; top: 400px; left: 20px;
                width: 250px;
                height: 40px;
                background: rgb(10, 168, 168);
                color: white;
                transition: all .2s;
            }
            button:hover{
                opacity: 0.8;
            }
        }
        .result_items_box{
            position: absolute; left: 340px; top: 20px;
            width: 800px;
            height: 350px;
            ul{
                width: 800px;
                height: 350px;
                overflow-y: scroll;
                overflow-x: hidden ;
                li{
                    width: 700px;
                    height: 40px;
                    line-height: 40px;
                    margin: 20px 0 20px 50px;
                    box-shadow: 0 0 10px rgb(179, 179, 179);
                    transition: all .2s;
                    cursor: pointer;
                }
                li:hover{
                    transform: translateY(-3px);
                    box-shadow: 0 5px 20px rgb(87, 87, 87);
                }
            }
            ul::-webkit-scroll{
                width: 10px;
            }
            ul::-webkit-scroll-theme{
                background: #000;
            }
        }
        .result_number{
            position: absolute; left: 340px;bottom: 20px;
            width: 200px;
            height: 40px;
            font-size: 16px;
            font-weight: bolder;
            color: rgb(10, 163, 173);
            text-align: center;
            line-height: 40px;
            
        }
    }
}

</style>