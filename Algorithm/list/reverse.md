反转一个单链表。

示例:

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

反转链表有迭代和递归两种方式，在这我先放上迭代的方式，思路是先创建一个空的头结点指向原来的链表头，然后遍历链表，把当前链表插入到空的头结点后，代码如下：
```
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if(!head||!head.next){
        return head;
    }
    var f=head.next;
    var s=head;
    var dummy=new ListNode();
    dummy.next=head;
    while(f){
        s.next=f.next;
        f.next=dummy.next;
        dummy.next=f;
        f=s.next;
    }
    return dummy.next;
};
```