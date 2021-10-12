function Node(e) {
    this.element = e;
    this.next = null;
    this.prev = null;
}
class DoublyLinkedList{
    //append(element)：向列表尾部添加一个新的项
    //insert(position, element)：向列表的特定位置插入一个新的项。
    //remove(element)：从列表中移除一项。
    //indexOf(element)：返回元素在列表中的索引。如果列表中没有该元素则返回-1。
    //removeAt(position)：从列表的特定位置移除一项。
    //isEmpty()：如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false。
    //size()：返回链表包含的元素个数。与数组的length属性类似。
    //toString()：由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值。
    constructor(){
        this.length=0;
        this.head = null;
        this.tail=null;
    }
    append(element) {
        const node = new Node(element);
        if(this.head === 0){
            this.head = node
            this.tail = node.next
        }else{
            node.prev = this.tail
            this.tail.next = node
            this.tail = node
        }
        this.length++;
    }
    insert(position, element){
        const node = new Node(element)
        if(position<0 || position > this.length-1)return false;
        const current = this.head
        const previons= null
        const index= 0
        if(position === 0){
           if(this.length === 0){
                this.head = node
                this.tail = node
           }else{
            node.next=this.head
            this.head.prev = node
            this.head = node
           }
        }else if(position === this.length){
            node.prev = this.tail
            this.tail.next = node
            this.tail = node
        }
        else{
            while(index++ < position){
                previons = current
                current = current.next
            }
            node.next = current
            node.prev = previons
            previons.next = node
            current.prev=node
        }
        this.length ++
        return true;
    }
    removeAt(position){
        if(position <0 || position > this.length - 1)return false;
        const current = this.head
        const previons = null
        const index=0
        if(position === 0){
            this.head = current.next
            this.head.prev=null
        }else if(position === this.length -1){
            if(this.length === 0){
                this.head = null
                this.tail = null
            }else{
                current = this.tail
                this.tail = this.tail.prev
                this.tail.next = null
            }
        }
        else {
            while(index++ < position){
                previons=current
                current=current.next
            }
            previons.next=current.next
            current.next.prev = previons
        }
        this.length--;
        return current.element
    }
    indexOf(element){
        const current = this.head
        const index=0;
        while(current){
            if(current.element === element){
                return index
            }
            current=current.next
            index++;
        }
        return -1;
    }
    remove(element){
        const index = this.indexOf(element);
        return this.removeAt(index)
    }
    size(){
        return this.length
    }
    getHead(){
        return this.head.element
    }
    getTail(){
        return this.tail.element
    }
}