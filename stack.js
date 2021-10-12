class stack{
    constructor(){
        this.item = [];
    }
    //受限线性数组，先进后出
    push(e){
        this.item.push(e)
    }

    pop(){
        this.item.pop()
    }

    isEmpty(){
        return this.item.length === 0 
    }

    size(){
        return this.item.length
    }

    peek(){
        return this.item[this.item.length - 1]
    }
}
 
const o = new stack();
o.push(9)
o.push(5)
o.pop() //5
o.push(4)
o.pop() //4
o.pop() //9

//封装十进制转二进制的函数
function dec2bin(num){
    const stack = new stack();
    //num%2,10 0101
    const d;
    while(num > 0){
        d = num%2;
        num = Math.floor(num/2);
        stack.push(d);
    }
    const str='';
    while(!stack.isEmpty()){
        str+=stack.pop()
    }
    return str
}