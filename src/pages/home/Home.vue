<template>
  <div class="home_panel">
        <div class="chose_one">
            <div class="chose_title">选择一个板块进入练习</div>
            <button class="chose_translate hvr-grow-shadow" @click="choseTranslatePanel">翻译练习</button>
            <button class="chose_write hvr-grow-shadow">写作练习</button>
        </div>
        <div class="other">
            <div class="lovely_reading_menu"></div>
            <div class="unkown"></div>
        </div>
  </div>
</template>

<script>
export default {
    name : 'Home',
    methods:{
        choseTranslatePanel(){
            this.$router.push('/translate')
        }
    }
}
</script>

<style lang='less'>
@lightblack : rgb(61, 61, 61); // 亮黑
@green : rgb(28, 192, 6); // 绿色
@blue : rgb(16, 152, 206); // 蓝色
.home_panel{
    margin: 20px auto;
    width: 1200px;
    .chose_one{
            position: relative;
            width: 1200px;
            height: 300px;
            box-shadow: 0 0 10px @lightblack;
            transition: all .2s;
            .chose_title{
                position: absolute; top: 80px; left: 50%;
                width: 300px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                margin: 0 0 0 -150px;
            }
            .chose_translate,.chose_write{
                position: absolute; top: 160px; left: 50%;
                margin: 0 0 0 -250px;
                width: 200px;
                height: 50px;
                color: white;
                text-align: center;
                line-height: 50px;
                border-radius: 10px;
                background: @green;
            }
            .chose_write{
                margin: 0 0 0 50px;
                background: @blue;
            }
        }
        .other{
            width: 1200px;
            height: 400px;
            margin: 20px 0 0 0 ;
            .lovely_reading_menu{
                float: left;
                width: 400px;
                height: 400px;
                box-shadow: 0 0 10px  @lightblack;
                transition: all .2s;
            }
            .unkown{
                float: left;
                width: 780px;
                height: 400px;
                margin-left: 20px;
                box-shadow: 0 0 10px @lightblack;
                transition: all .2s;
            }
        }
        .chose_one:hover,.lovely_reading_menu:hover,.unkown:hover{
            transform: translateY(-3px);
            box-shadow: 0 0 15px black;
        }
}
</style>