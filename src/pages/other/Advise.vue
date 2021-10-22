<template>
  <div class="add_advise_panel">
      <div class="title">写给作者</div>
      <div class="topic"></div>
      <div class="content"></div>
  </div>
</template>

<script>
export default {
    name : 'Advise'
}
</script>

<style lang='less'>
@lightblack : rgb(61, 61, 61); // 亮黑
@green : rgb(28, 192, 6); // 绿色
@blue : rgb(16, 152, 206); // 蓝色
.add_advise_panel{
    width: 1200px;
    height: 500px;
    margin: 20px auto;
    box-shadow: 0 0 10px @lightblack;
    .title{
        width: 1200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 30px;
        color: rgb(59, 59, 59);
    }
    .topic{
        width: 1000px;
        height: 50px;
        margin: 50px 0 0 100px;
        background: grey;
    }
    .content{
        width: 1000px;
        height: 200px;
        margin: 50px 0 0 100px;
        background: grey;
    }
}
</style>