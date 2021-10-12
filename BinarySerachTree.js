/*
 * @Author: your name
 * @Date: 2021-07-20 16:15:36
 * @LastEditTime: 2021-07-20 18:07:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\BinarySerachTree.js
 */
function BinarySerachTree(){
    //节点构造函数
    function Node(key){
        this.key=key;
        this.left = null;
        this.right=null;
    }
    //保存根节点
    this.root = null;
    //插入节点
    BinarySerachTree.prototype.inset=function(key){
        let newNode = new Node(key)
        if(this.root === null){
            this.root = newNode
        }else{
            this.insetNode(this.root,newNode);
        }
    }
    BinarySerachTree.prototype.insetNode=function(node,newNode){
       if(newNode.key < node.key){
           if(node.left === null){
               node.left = newNode
           }else{
            this.insetNode(node.left,newNode)
           }
       }
       if(newNode.key > node.key){
        if(node.right === null){
            node.right = newNode
        }else{
            this.insetNode(node.right,newNode)
        }
       }
    }

    //最大节点
    BinarySerachTree.prototype.max=function(){
        let current = this.root
        while(current.right === null){
            current=current.right
        }
        return current.key
    }
    //最小节点
    BinarySerachTree.prototype.min=function(){
        let current = this.root
        while(current.left === null){
            current=current.left
        }
        return current.key
    }

    
    //找特定值
    BinarySerachTree.prototype.search=function(key){
        // 循环版
        let current = this.root
        while(current !== null){
            if(key > current.key){
                current= current.right
            }else if(key < current.key){
                current = current.left
            }else{
                return true
            }
        }
        // 递归版
        // return this.searchNode(this.root,key)
    }
    BinarySerachTree.prototype.searchNode=function(node,key){
        let node = new Node(key)
        let current = node
        if(node === null){
            return false
        }
        if(key < current.key){
            this.searchNode(current.left,key)
        }else if(key > current.key){
            this.searchNode(current.right,key)
        }
        return false
    }
    //移除节点
    BinarySerachTree.prototype.remove=function(key){
        let current = this.root
        let currentPrarent = this.root
        let isLeftChild = true;
        if(this.root === null){
            return false
        }
        // 没有节点
        // 一个节点
        // 两个节点
    }

    // 先序遍历
    BinarySerachTree.prototype.preOrderTraversal=function(handler){
        return this.preOrderTranversalNode(this.root,handler)
    }
    BinarySerachTree.prototype.preOrderTranversalNode=function(node,handler){
        if(node !== null){
            handler(node)
            this.preOrderTranversalNode(node.left,handler)
            this.preOrderTranversalNode(node.right,handler)
        }
    }
    // 中序遍历
    BinarySerachTree.prototype.inOrderTraversal=function(handler){
        return this.inOrderTranversalNode(this.root,handler)
    }
    BinarySerachTree.prototype.inOrderTranversalNode=function(node,handler){
        if(node !== null){
            this.inOrderTranversalNode(node.left,handler)
            handler(node)
            this.inOrderTranversalNode(node.right,handler)
        }
    }
    // 后序遍历
    BinarySerachTree.prototype.postOrderTraversal=function(handler){
        return this.postOrderTranversalNode(this.root,handler)
    }
    BinarySerachTree.prototype.postOrderTranversalNode=function(node,handler){
        if(node !== null){
            this.postOrderTranversalNode(node.left,handler)
            this.postOrderTranversalNode(node.right,handler)
            handler(node)
        }
    }
}