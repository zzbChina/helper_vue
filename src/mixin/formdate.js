let formdate = {
    methods:{
        getTime(){
            let date = new Date()
            let time = `${date.getFullYear()} ${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
            return time
        }
    }
}

export default formdate