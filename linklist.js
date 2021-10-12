function Node(e, p) {
    this.element = e;
    this.next = null;
}
class LinkList {
    //append(element)：向列表尾部添加一个新的项
    //insert(position, element)：向列表的特定位置插入一个新的项。
    //remove(element)：从列表中移除一项。
    //indexOf(element)：返回元素在列表中的索引。如果列表中没有该元素则返回-1。
    //removeAt(position)：从列表的特定位置移除一项。
    //isEmpty()：如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false。
    //size()：返回链表包含的元素个数。与数组的length属性类似。
    //toString()：由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值。

    constructor() {
        this.length=0;
        this.head=null;
    }

    toString(){
      current = this.head  
      const str = '';
      while(current.next){
        str+= ','+current.element
        current=current.next
      }
      return str.slice(1)
    }
    append(element) {
        const node = new Node(element);
        if (this.head === null) {
            return (this.head = node);
        } else {
            const current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }

    insert(position, element) {
        const node = new Node(element);
        if (position < 0 || position > this.length - 1) return false;
        const current = this.head;
        const pre = null;
        const index = 0;
        if (position === 0) {
            node.next = current;
            this.head = node;
        }else{
            while( index++ < position ){
                pre = current
                current = current.next
            }
            pre.next = node
            node.next = current
        }
        this.length++
    }
    removeAt(position) {
        if (position < 0 || position > this.length - 1) return false;
        const current = this.head;
        const pre = null;
        const index = 0;
        if (position === 0) {
            this.head.next = current;
        }else{
            while( index++ < position ){
                pre = current
                current = current.next
            }
            pre.next = current.next
        }
        this.length--
    }
    indexof(element){
        current = this.head
        index=0
        while(current){
            if(current === element){
                return index
            }
            current=current.next
            index++;
        }
        return -1;
    }
    remove(element){
        const index = this.indexof(element);
        return this.removeAt(index);
    }
    isEmpty(){
        return this.length === 0
    }
    size(){
        return this.length
    }
}
