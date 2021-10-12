/*
 * @Author: your name
 * @Date: 2021-07-14 11:06:08
 * @LastEditTime: 2021-08-11 10:44:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\jscode.js
 */
// 1.函数 call,apply,bind,debounce,throttle
/**
 * @description: 
 * @param {*} context
 * @param {array} args
 * @return {*}
 */
function myCall (context=globalThis,...args) {
    const fn = Symbol('fn')
    context[fn] = this;
    const res = context[fn](...args);
    delete context[fn]
    return res  
}

 /**
  * @description: 
  * @param {*} context
  * @param {array} args
  * @return {*}
  */
 function myApply (context=globalThis,...args) {
    const fn = Symbol('fn')
    context[fn] = this;
    const res = context[fn](args);
    delete context[fn]
    return res   
}

 /**
  * @description: 
  * @param {*} context
  * @param {array} args1
  * @return {*}
  */
 function myBind (context=globalThis,...args1) {
    if(typeof this !== 'function'){
        throw console.error('is not function');
    }
    let self = this
    const fn = function(...args2){
        return self.myCall(this instanceof fn ? this : context,...args1,...args2)
    }
    fn.prototype = Object.create(this.prototype)
    return fn
}

/**
 * @description: 
 * @param {*} callback
 * @param {*} wait
 * @return {*}
 */
function debounce(callback,wait){
    let timer = null;
    return function(...args){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            callback.call(this,...args)
            timer = null
        },wait)
    }
}

/**
 * @description: 
 * @param {*} callback
 * @param {*} wait
 * @return {*}
 */
 function throttle(callback,wait){
    let timer = null;
    return function(...args){
        if(!timer){
            timer = setTimeout(() => {
                callback.call(this,...args)
                timer = null
            },wait)
        }
    }
}

/**
 * @description: 
 * @param {*} arr
 * @param {*} callback
 * @param {*} initstate
 * @return {*}
 */
function myReduce(arr,callback,initstate){
    let result = initstate || arr[0];
    let startIndex = initstate ? 0 : 1
    for(let i = startIndex;i<arr.length;i++){
        result = callback(result,arr[i],i,arr)
    }
    return result;
}

/**
 * @description: 
 * @param {*} arr
 * @return {*}
 */
function flatten(arr){
    let result = []
    for(let i = 0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            result = result.concat(flatten(arr[i]))
        }else{
            result.push(arr[i])
        }
        
    }
    return result;
}

function flatten2(arr){
    return arr.reduce((acc,cur)=> {
        return acc.concat(Array.isArray(cur)? flatten2(cur) : cur)
    },[])
}

function flatten3(arr){
    while(arr.some( v => Array.isArray(v))){
        arr=[].concat(...arr)
    }
}
/**
 * @description: 
 * @param {*} arr
 * @return {*}
 */
function unique(arr){
    // return [...new Set(arr)]
    let result=[]
    for(let i= 0;i<arr.length;i++){
        if(result.includes(arr[i])){
            continue
        }else{
            result.push(arr[i])
        }
    }
    return result;
}
/**
 * @description: 
 * @param {*} arr
 * @param {*} callback
 * @return {*}
 */
function myFind(arr,callback){
    for(let i= 0;i<arr.length;i++){
        if(callback(arr[i],i)){
            return arr[i]
        }
    }
    return undefined;
}
/**
 * @description: 
 * @param {*} arr
 * @param {*} size
 * @return {*}
 */
function chunk(arr,size=1){
    let result = [];
    let temp = [];
    for(let i=0;i<arr.length;i++){
        if(!temp.length){
            result.push(temp)
        }
        if(temp.length < size){
            temp.push(arr[i])
        }
        if(temp.length === size){
            temp=[]
        }
    }
    return result;
}
/**
 * @description: 
 * @param {*} arr
 * @param {*} start
 * @param {*} end
 * @return {*}
 */
function mySlice(arr,start,end){
    let result =[];
   for(let i=0;i<arr.length;i++){
       if(i>=start && i<end){
           result.push(arr[i])
       }
   }
   return result;
}
/**
 * @description: 
 * @param {*} proto
 * @return {*}
 */
function create(proto){
    function Fn(){}
    Fn.prototype = proto
    Fn.prototype.constructor = Fn
    return new Fn()
}
/**
 * @description: 
 * @param {*} fn
 * @param {array} args
 * @return {*}
 */
function myNew(fn,...args){
    // const obj = Object.create(fn.prototype);
    const obj = {};
    obj.__proto__=fn.prototype
    
    const res = fn.apply(obj,args)
    return typeof res === 'object' ? res : obj;
}

/**
 * @description: 
 * @param {*} left
 * @param {*} right
 * @return {*}
 */
function myInstanceOf(obj,fn){
    let proto = Object.getPrototypeOf(obj)
    while(true){
        if(proto === null)return false;
        if(fn.prototype === proto)return true;
        proto = Object.getPrototypeOf(proto)
    }
}

function deepClone(obj){
    const isObject = (o) => {
        return (typeof o === 'object' || typeof o === 'function') && o !== null
    }
    if(!isObject(onj)){
        throw new TypeError('obj 为非对象')
    }
    let newObj= Array.isArray(obj) ? [...obj] : { ...obj };
    Reflect.ownKeys(obj).forEach(key => {
        newObj[key] = isObject(obj(key)) ? deepClone(obj(key)) : obj(key)
    })
    return newObj;
}

// 使用proxy实现一个响应式数据
const onWatch = (obj,setBind,getLogger) => {
    const handle = () => {
        return {
            get: (target,propty,receiver) => {
                getLogger(target,propty)
                return Reflect.get(target,propty,receiver)
            },
            set:(target,propty,value,receiver) => {
                getLogger(target,propty)
                return Reflect.set(target,propty,value,receiver)
            }
        }
    }
    return new Proxy(obj,handle)
}

function myDeepClone(obj,map=new Map()){
    let isObject = (o) =>  typeof o === 'object' && o !== null;
    if(!isObject(obj)){
        return obj
    }
    const cache = map.get(obj)
    if(cache){
        return cache
    }
    let isArray = Array.isArray(obj)
    let newObj = isArray ? [] : {}
    Reflect.ownKeys(obj).forEach(key =>{
    if(isObject(obj[key])){
        map.set(obj,obj)
        newObj[key] = myDeepClone(obj[key],map)
    }else{
        newObj[key] =obj[key]
    }
    })
    return newObj
}

