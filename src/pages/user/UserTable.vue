<template>
  <div class="user_table_panel">
      <ul ref="table" >
          <li class="translate_part">
              <div class="left">
                  <div class="topic">我的翻译列表</div>
                  <ol>
                      <li v-for="(t,index) of myData.translates" :key="t.id" >
                          {{t.topic}}
                          <div class="edit" @click="pushToTranslateDetail(index)"></div>
                      </li>
                  </ol>
              </div>
              <div class="right"></div>
          </li>
          <li class="write_part">
              <div class="left">
                  <div class="topic">我的写作列表</div>
              </div>
              <div class="right"></div>
          </li>
          <li class="read_part">
              <div class="top">收藏的周刊阅读</div>
              <div class="stars">
                  <ol>
                      <li v-for="r of myData.readings" :key="r.id" @click="pushToReadingItem(r.target_id)" :title="r.time">
                          {{r.reading_title}}
                      </li>
                  </ol>
              </div>
          </li>
          <li>4</li>
      </ul>
  </div>
</template>

<script>
export default {
    name : 'UserTable',
    props:['table_index'],
    data(){
        return{
            myData:{
                translates:[],
                writes:[],
                readings : []
            }
        }
    },
    methods:{
        pushToTranslateDetail(index){
            this.$router.push(
                {
                    path : '/translate/translate_detail',
                    query:{
                        from : 'UserTable',
                        data : {
                            id : this.myData.translates[index].target_id
                        }
                    }
                    
                }
            )
        },
        //跳转至周刊详细面板
        pushToReadingItem(id){
            this.$router.push(
                {
                    path : '/reading',
                    query :{
                        from : 'UserTable',
                        data : {
                            target : id
                        }
                    }
                }
            )
        }
    },
    watch:{
        table_index:{
            handler(){
                this.$refs.table.style.left = (-740*this.table_index) + 'px'
            }
        }
    },
    mounted(){
        this.$http.get(`/checkMyTranslateData?type=translate&target_id=${this.$store.state.userData.id}`).then(
            response=>{
                console.log(response.data)
                this.myData.translates = response.data.data
                this.$http.get(`/checkMyTranslateData?type=write&target_id=${this.$store.state.userData.id}`).then(
                    response=>{
                        console.log(response.data)
                    },
                    error=>{
                        console.log(error.message)
                    }
                )
            },
            error=>{
                console.log(error.message)
            }
        )

        //请求自己的收藏的周刊
        this.$http.get(`/getAllMyStars?user_id=${this.$store.state.userData.id}`).then(
            response=>{
                if(response.data.code == 200){
                    this.myData.readings = response.data.data
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
.user_table_panel{
    width: 740px;
    height: 380px;
    margin: 10px 0 0 20px;
    overflow: hidden;
    position: relative;
    ul{
        position: absolute; left: 0; top: 0;
        width: 400%;
        height: 100%;
        transition: all .3s;
        li{
            float: left;
            width: 740px;
            height: 380px;
        }
        .translate_part,.write_part{
            .left{
                float: left;
                width: 500px;
                height: 380px;
                .topic{
                    width: 500px;
                    height: 60px;
                    font-size: 22px;
                    color: rgb(80, 80, 80);
                    line-height: 60px;
                    text-align: center;
                    font-weight: bolder;
                }
                ol{
                    width: 460px;
                    height: 300px;
                    margin: 0 0 0 20px;
                    li{
                        position: relative;
                        width: 400px;
                        height: 40px;
                        padding: 0 0 0 20px;
                        line-height: 40px;
                        margin: 10px 0 10px 20px;
                        box-shadow: 0 2px 10px rgb(155, 155, 155);
                        transition: all .2s;
                        user-select: none;
                        .edit{
                            position: absolute; right: 20px; top: 5px;
                            width: 30px;
                            height: 30px;
                            text-align: center;
                            line-height: 30px;
                            font-size: 30px;
                            color: rgb(255, 187, 0);
                            border-radius: 4px;
                            cursor: pointer;
                        }
                    }
                    li:hover{
                        transform: translateY(-5px);
                        box-shadow: 0 5px 10px rgb(112, 112, 112);
                    }
                }
            }
            .right{
                float: left;
                width: 240px;
                height: 380px;
                background: grey;
            }
        }
        .read_part{
            .top{
                width: 100%;
                height: 60px;
                font-weight: bolder;
                font-size: 20px;
                color: rgb(77, 77, 77);
                text-align: center;
                line-height: 60px;
            }
            .stars{
                width: 740px;
                height: 300px;
                ol{
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    li{
                        width: 710px;
                        height: 40px;
                        padding: 0 0 0 10px;
                        line-height: 40px;
                        margin: 5px 0 10px 10px;
                        box-shadow: 0 5px 10px rgb(139, 139, 139);
                        transition: all .2s;
                        cursor: pointer;
                        user-select: none;
                    }
                    li:hover{
                        transform: translateY(-3px);
                        box-shadow: 0 10px 10px rgb(110, 110, 110);
                    }
                }
            }
        }
    }
}
</style>