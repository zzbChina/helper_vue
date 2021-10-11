<template>
    <div>
      <Index/>

      <!-- 警告框 -->
      <transition name="alert">
      <div class="alert" v-show="alert.status">
        {{alert.info}}
      </div>
      </transition>>

      <!-- 提示框 -->
      <transition name="alert">
      <div class="prompt" v-show="prompt.status">
        {{prompt.info}}
      </div>
      </transition>>
    </div>
</template>

<script>
import Index from './components/Index'
export default {
  name: 'App',
  components : {
    Index
  },
  data(){
    return{
      alert:{
        info : '',
        status : false
      },
      prompt:{
        info : '',
        status : false
      }
    }
  },
  methods:{
    //弹出警示框
    showAlert(msg){
      this.alert.info = msg
      this.alert.status = true
      setTimeout(()=>{
        this.alert.status = false
      },1000)
    },
    //弹出提示框
    showPrompt(msg){
      this.prompt.info = msg
      this.prompt.status = true
      setTimeout(()=>{
        this.prompt.status = false
      },1000)
    }
  },
  mounted(){
    this.$bus.$on('showAlert',this.showAlert)
    this.$bus.$on('showPrompt',this.showPrompt)
  }

}
</script>

<style lang='less'>
.alert,.prompt{
  position: absolute; top: 30px; left: 50%;
  width: 400px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: white;
  font-weight: bolder;
  background: linear-gradient(to top,rgb(255, 0, 0),transparent);
  border-radius: 0 0 10px 10px;
  margin-left: -200px;
  transition: all .2s;
}
.prompt{
  background: linear-gradient(to top,rgb(0, 255, 13),transparent);
}
.alert-enter,.alert-leave-to{
  transform: translateY(-30px);
  opacity: 0;
}
.alert-enter-to,.alert-leave{
  transform: translateY(0);
  opacity: 1;
}
</style>
