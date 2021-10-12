/*
 * @Author: your name
 * @Date: 2021-08-11 18:26:15
 * @LastEditTime: 2021-08-11 18:27:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\queue (2).js
 */
/**
 * @param {number} k
 */
 var MyCircularQueue = function(k) {
    this.queue = [];
    this.head = null;
    this.tail = null;
    this.size = k;
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
    if(this.queue.length < this.size){
        if(this.queue.length === 0){
            this.head = value
        }
        this.queue.push(value)
        this.tail = value
        return true
    }else{
        return false
   }
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    if(this.queue.length !== 0){
        this.queue.shift()
        this.head=this.queue[0]
        if(this.queue.length === 0){
            this.head = null;
            this.tail = null;
        }
        return true
    }else{
        this.head = null;
        this.tail = null;
        return false
    }
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
    return this.head === 0 ? 0 : ( this.head || -1)
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
    return this.tail === 0 ? 0 : ( this.tail || -1)
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
    return this.queue.length === 0
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
    return this.queue.length === this.size
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */