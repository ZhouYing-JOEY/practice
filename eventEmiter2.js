/*
 * @Author: your name
 * @Date: 2021-07-19 22:12:05
 * @LastEditTime: 2021-07-19 23:08:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\eventEmiter2.js
 */
class EventEmiter{
    constructor(){
        this.events=[]
        this.id = 0;
    }
    //sub
    subcribe = (eventName,callback) => {
        const token = 'token_'+this.id++
        if(Object.keys(this.events).includes(eventName)){
            this.events[eventName][token]=callback
        }else{
            this.events[eventName]={
                [token]:callback
            }
        }

    }
    //emit 
    emit = (eventName,data) => {
        if(Object.keys(this.events).includes(eventName)){
            Object.keys(this.events[eventName]).forEach(token => {
                this.events[eventName][token](data)
            })
        }
    }
    //unsub
    //不传参数 取消所有
    //传参 flag = token
    //传参 flag = name
    unsubcribe = (flag) => {
        if(!flag){
            this.events=[]
        }else if(flag.startsWith('token_')){
            Object.keys(this.events).forEach(item => {
                if(Object.keys(this.events[item]).includes(flag)){
                   if(Object.keys(this.events[item]).length === 1){
                    delete this.events[item] 
                   }else{
                    delete this.events[item][flag]
                   }
                }
            })
        }else{
            delete this.events[flag]
        }

    }
}
// export default new EventEmiter()