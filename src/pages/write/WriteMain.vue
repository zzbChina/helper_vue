<template>
  <div class="write_main_panel">
      <!-- 菜单选择部分 -->
      <div class="write_menu" v-if="status.show">
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

      <div class="write_result" v-if="status.show">
          <div class="detail">
              <div class="postImage">
                  <img :src="detail_write.postImage" alt="">
              </div>
              <div class="title">{{detail_write.title}}</div>
              <div class="year">年份：{{detail_write.year}}</div>
              <div class="level">类型：{{detail_write.level}}</div>
              <div class="type">等级：{{detail_write.type}}</div>
              
              <!-- 写作按钮 -->
              <button @click="intoWritePanel">写作</button>
          </div>

          <div class="result_items_box">
              <ul>
                  <li v-for="(w,index) in writes" :key="w.id" @click="selectIt(index)">
                      &nbsp; &nbsp; &nbsp;{{w.title}} &nbsp; &nbsp;{{w.topic}}
                  </li>
              </ul>
          </div>
      </div>

      <router-view
      :detail_write='detail_write'
      />
  </div>
</template>

<script>
export default {
    name : 'WriteMain',
    data(){
        return{
            years:['2021','2020','2019','2018','2017','更早'],
            types:['风景翻译','文化翻译','现象翻译','议论作文','历史翻译','状物翻译'],
            levels:['大学四级','大学六级'],
            detail_write:'',
            writes:[],
            status:{
                show : true
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
            this.detail_write = this.writes[id]
            this.detail_write.postImage = this.writes[id].postImage
        },
        //进入写作面板
        intoWritePanel(){
            this.status.show = false
            this.$router.push('/write/write_detail')
        }
    },
    watch:{
        $route(){
            if(this.$route.path=="/write/write_detail"){
                this.status.show = false
            }else if(this.$route.path == "/write"){
                this.status.show = true
            }
        }
    },
    mounted(){
        //获取所有写作材料
        this.$http.get('/getAllWriteMaterials').then(
            response=>{
                this.writes = response.data.data
                this.writes.forEach((w)=>{
                    w.postImage = require('../../assets/postImage/' + w.postImage)
                })
                if(this.$route.path == "/write"){
                    this.selectIt(0)
                }
                console.log(this.writes)
            },
            error=>{
                console.log(error.message)
            }
        )

        if(this.$route.path=="/translate/translate_detail"){
                this.status.show = false
        }
    }
}
</script>

<style lang='less'>
@lightblack : rgb(61, 61, 61); // 亮黑
@green : rgb(28, 192, 6); // 绿色
@blue : rgb(16, 152, 206); // 蓝色
.write_main_panel{
    width: 1200px;
    margin: 20px auto;
    .write_menu{
        position: relative;
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
    .write_result{
        position: relative;
        width: 1200px;
        height: 500px;
        margin: 20px 0 0 0;
        box-shadow: 0 0 10px @lightblack;
        .detail{
            position: absolute; top: 20px; right: 20px;
            width: 300px;
            height: 460px;
            box-sizing: border-box;
            border: 5px solid rgb(198, 135, 235);
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
                background: rgb(154, 30, 192);
                color: white;
                transition: all .2s;
            }
            button:hover{
                opacity: 0.8;
            }
        }
        .result_items_box{
            position: absolute; left: 20px; top: 20px;
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
            ul::-webkit-scrollbar{
                width: 10px;
            }
            ul::-webkit-scrollbar-thumb{
                background: rgb(209, 124, 248);
                border-radius: 5px;
            }
        }
    }
}
</style>