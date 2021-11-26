function quickSort(arr){
    if(arr.length<=1)return arr;
    let left=[],right=[],ans=Math.floor(arr.length/2);
    for(let i=0;i<arr.length;i++){
        if(arr[i]<arr[ans]){
            left.push(arr[i])
        }
        if(arr[i]>arr[ans]){
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(arr[ans],quickSort(right));
} 

const array=[33,2,55,6,12,43,67,32,78,45,22,12]
// console.log(quickSort(array));

function curry(fn,...args){
    return args.length >= fn.length ? fn(...args) : (...args1) => curry(fn, ...args,...args1);
}

function add1(x,y){
    return x+y
}
const add = curry(add1)

console.log(add(1,2))
console.log(add(1,2,3))
console.log(add(1)(2))
console.log(add(1)(2,3))

function curryn(fn,...args){
    return args.length >= fn.length ? fn(...args) : (...args1) => curry(fn, ...args,...args1);
}
// function add1(x,y,...n){
//     return x+y+...n
// }
