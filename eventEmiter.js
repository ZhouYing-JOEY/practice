const arrs=[442,12,23,21,23,112,112,33,22]

// const arrs = arr.sort((a,b) => a>b)

function TreeNode(data){
    this.data=data;
    this.left=null;
    this.right=null;
}

// function CreateTree(nums){
//     const buildTree = (arr,left,right) => {
//         if(left>right){
//             return null;
//         }
//         let mid = Math.floor(arr.length/2)
//         const root = new Node(arr[mid])
//         root.left = buildTree(arr,left,mid-1)
//         root.right = buildTree(arr,right,mid+1)
//         return root
//     }
//     return buildTree(nums,0,nums.length-1)
// }
var sortedArrayToBST = function (nums) {
    const buildTree = (Arr, left, right) => {
        if (left > right)
            return null;

        let mid = Math.floor(left + (right - left) / 2);

        let root = new TreeNode(Arr[mid]);
        root.left = buildTree(Arr, left, mid - 1);
        root.right = buildTree(Arr, mid + 1, right);
        return root;
    }
    return buildTree(nums, 0, nums.length - 1);
};

const tree = sortedArrayToBST(arrs)
console.log('tree====',tree)

//深度优先遍历 LIFO

function DepthFirstSearch(biTree){
    const stack = []
    stack.push(biTree)
    while (stack.length){
        let node = stack.pop();
        console.log(node.data)
        if(node.right){
            stack.push(node.right)
        }
        if(node.left){
            stack.push(node.left)
        }
    }
}

// DepthFirstSearch(tree)

//广度优先遍历 FIFO

function BreadthFirstSearch(biTree){
    const enququ = [];
    enququ.push(biTree)
    while(enququ.length){
        let node= enququ.shift()
        console.log(node.data)
        if(node.left){
            enququ.push(node.left)
        }
        if(node.right){
            enququ.push(node.right)
        }
    }
}
// BreadthFirstSearch(tree)

//前序遍历

function ProOrderTraverse(biTree){
    if(biTree === null)return;
    console.log(biTree.data);
    ProOrderTraverse(biTree.left);
    ProOrderTraverse(biTree.right);
}
// ProOrderTraverse(tree)

function InOrderTraverse(biTree){
    if(biTree === null)return;
    InOrderTraverse(biTree.left);
    console.log(biTree.data);
    InOrderTraverse(biTree.right);
}
// InOrderTraverse(tree)

function PostOrderTraverse(biTree){
    if(biTree === null)return;
    PostOrderTraverse(biTree.left);
    PostOrderTraverse(biTree.right);
    console.log(biTree.data);
}
// PostOrderTraverse(tree)