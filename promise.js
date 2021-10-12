/*
 * @Author: your name
 * @Date: 2021-08-03 10:19:01
 * @LastEditTime: 2021-08-03 14:36:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\promise.js
 */
const PENDING='PENDING';
const FULFILLED='FULFILLED';
const REJECTED='REJECTED';

const resolvePromise=function (promise2,x,onResolved,onRejected){
    if(promise2 === x ){
        return onRejected(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    let called;
    if((typeof x === 'object' && x !== null) || typeof x === 'function'){
        try{
            let then = x.then
            if(typeof then === 'function'){
                then.call(x,y => {
                    if(called)return;
                    called=true;
                    resolvePromise(promise2,y,onResolved,onRejected)
                })
            }
        } catch(err){
            if(called)return;
            called=true; 
            onRejected(err)
        }
    }
}
class Promise{
    constructor(excutor){
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];

        let resolve = (value) => {
            if(this.status === PENDING){
                this.status = FULFILLED;
                this.value = value;
                this.resolveCallbacks.forEach(fn => fn())
            }
        }

        let reject = (reason) => {
            if(this.status === PENDING){
                this.status = REJECTED;
                this.reason = reason;
                this.rejectCallbacks.forEach(fn => fn())
            }
        }

        try{
            excutor(resolve,reject);
        } catch(error) {
            reject(error);
        }

        this.prototype.then = function then(onResolved,onRejected){
            onResolved = typeof onResolved === 'function' ? onResolved : v => v
            onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err};
            const promise2 = new Promise((onResolved,onRejected) => {
                if(this.status === FULFILLED){
                    try{
                       let res = onResolved(this.value)
                       resolvePromise(promise2,res,resolve,reject)
                    } catch(error){
                        reject(error)
                    }
                    
                }
                if(this.status === REJECTED){
                    try{
                        let res = onRejected(this.reason)
                        resolvePromise(promise2,res,resolve,reject)
                     } catch(error){
                         reject(error)
                     }
                }
                if(this.status === PENDING){
                    this.resolveCallbacks.push(() => {
                        try{
                            let res = onResolved(this.value)
                            resolvePromise(promise2,res,resolve,reject)
                         } catch(error){
                             reject(error)
                         }
                    })
                    this.rejectCallbacks.push(() => {
                        try{
                            let res = onRejected(this.reason)
                            resolvePromise(promise2,res,resolve,reject)
                         } catch(error){
                             reject(error)
                         }
                    })
                }
            })
            return promise2
        }
    }

    resolve(value){
        if(value instanceof Promise){
            // 递归解析 
            return value.then(resolve,reject)
        }
        if(this.status === PENDING){
            this.status = FULFILLED;
            this.value = value;
            this.resolveCallbacks.forEach(fn => fn())
        }
    }

    reject(reason){
        if(this.status === PENDING){
            this.status = REJECTED;
            this.reason = reason;
            this.rejectCallbacks.forEach(fn => fn())
        }
    }

    all(promises){
        const resArr = []
        promises.forEach((p,i) => {
            try{
                resArr[i] = this.resolve(p())
                resolvePromise(p,resArr[i],resolve,reject)
             } catch(error){
                 reject(error)
             }
        })
        return resArr
    }

    race(promises){

    }
}
