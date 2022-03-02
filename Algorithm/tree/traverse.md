&emsp;&emsp;树的遍历是一个比较经典的问题，通过递归的方式可以很容易的写出来，但是递归会出现堆栈溢出的问题，面试过程中通常要我们写的也是非递归的算法。非递归的实现无非就是通过栈、队列的形式。
**前序遍历**
给定一个N叉树，返回它的 前序 遍历。

 示例:

```
输入:  
    1
  / | \
 2  3  4
  / | \
 5  6  7   

输出: [1,2,3,5,6,7,4]
```

思路：栈

上代码（js）：
```
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function(root) {
    if (!root) {
        return [];
    }

    let stack = [root],
        output = [];
    while (stack.length) {
        let outNode = stack.pop();
        output.push(outNode.val);
        if (outNode.children) {
            stack.push(...outNode.children.reverse());
        }
    }
    return output;
};
```

上代码（python）:
```
"""
# Definition for a Node.
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children
"""

class Solution:
    def preorder(self, root: 'Node') -> List[int]:
        if not root:
            return [];
        stack = [root];
        output = [];
        while len(stack):
            outNode = stack.pop();
            output.append(outNode.val);
            if outNode.children:
                stack = stack + list(reversed(outNode.children));
        return output;
```

**后序遍历**
给定一个N叉树，返回它的 后序 遍历。

示例:

```
输入:  
    1
  / | \
 2  3  4
  / | \
 5  6  7   

输出: [2,5,6,7,3,4,1]
```
把前序遍历的根左右改为根右左，然后把遍历结果取反。

上代码：（js）
```
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function(root) {
    let stack = [root],
        output = [];
    if (!root) {
        return output;
    }
    while (stack.length) {
        let outNode = stack.pop();
        output.push(outNode.val);
        if (outNode.children) {
            stack.push(...outNode.children);
        }
    }

    return output.reverse();
};
```

上代码：（python）

```
"""
# Definition for a Node.
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children
"""

class Solution:
    def postorder(self, root: 'Node') -> List[int]:
        stack = [root];
        output = [];
        if not root:
            return output;

        while len(stack):
            outNode = stack.pop();
            output.append(outNode.val);
            if outNode.children:
                stack = stack + outNode.children;

        return list(reversed(output));
```

**中序遍历**
给定一个二叉树，返回它的中序 遍历。

示例:

```
输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [1,3,2]
```

思路：栈

上代码：
```
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    let stack = [],
        output = [];

    while (stack.length || root) {
        while (root && !root.isVisited) {
            stack.push(root);
            root.isVisited = true;
            root = root.left;
        }

        let outNode = stack.pop();
        output.push(outNode.val);
        root = outNode.right ? outNode.right : stack[stack.length - 1];
    }

    return output;
};
```

上代码：（python）
```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        stack = []
        output = []
        while len(stack) or root:
            while root:
                stack.append(root)
                root = root.left

            outNode = stack.pop()
            output.append(outNode.val)
            root = outNode.right

        return output
```
