/*
 * @Author: your name
 * @Date: 2021-04-16 14:58:45
 * @LastEditTime: 2021-08-11 18:34:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\queue.js
 */
class queue{
    constructor(){
        this.item=[];
    }

    enqueue(e){
        this.item.push(e)
    }

    dequeue(){
        this.item.shift()
    }

    front(){
        return this.item[0]
    }

    size(){
        return this.item.length
    }

    isEmpty(){
        return this.item.length === 0
    }
}
function QueueElement(e,p){
    this.element=e;
    this.priority=p;
}
//优先级队列
class priorityQueue{
    constructor(){
        this.item=[]
    }
    enqueue(e,p){
        const ep= new QueueElement(e,p)
        if(isEmpty(this.item)){
            return this.item.push(ep)
        }else{
            let isAdd = false;
            for(let i=0;i<this.item.length;i++){
                //数字越小优先级越高
                if(this.item[i].priority > ep.priority){
                    this.item.splice(i,0,ep);
                    isAdd=true
                }
                break
            }
            if(!isAdd){
               return this.item.push(ep)
            }
            
        }

    }

    dequeue(){
        return this.item.shift()
    }

    front(){
        return this.item[0]
    }

    size(){
        return this.item.length
    }

    isEmpty(){
        return this.item.length === 0
    }
}

//击鼓传花游戏
//规则：几个朋友一起玩一个游戏, 围成一圈, 开始数数, 数到某个数字的人自动淘汰.
function game(names,num){
    const gameQueue=new queue();
    names.map(v => gameQueue.enqueue(v))

    while(gameQueue.size() > 1){
        for(let i=0;i<num;i++){
            gameQueue.enqueue(gameQueue.dequeue())
        }
        gameQueue.dequeue()
    }
    const end = gameQueue.dequeue()
    return names.indexOf(end)
}