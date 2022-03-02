在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。

示例 1:

```
输入: 4->2->1->3
输出: 1->2->3->4
```
示例 2:

```
输入: -1->5->3->4->0
输出: -1->0->3->4->5
```
这道题我用的是归并排序，和数组的归并排序不同之处就是要通过快慢指针寻找到中间节点，另外merge操作是在不申请额外空间的情况下合并两个有序链表，这个和数组也有些不同，总之链表的排序算是对排序算法和链表操作的一个综合考察，代码如下：
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
var merge=function(l,r){
    let last={};
    let head=last;
    while(l||r){
        if(r&&(!l||l.val>r.val)){
            last.next=r;
            last=last.next;
            r=r.next;
        }else{
            last.next=l;
            last=last.next;
            l=l.next;
        }
    }
    return head.next;
}
var sortList = function(head) {
    if(!head||head.next==null){
        return head;
    }
    let f=head;
    let s=head;
    let last;
    while(f.next!=null){
        f=f.next.next;
        last=s;
        s=s.next;
        if(!f){
            break;
        }
    }
    last.next=null;
    let left=sortList(head);
    let right=sortList(s);
    return merge(left,right);
};
```