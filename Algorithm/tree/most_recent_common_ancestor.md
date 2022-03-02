给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]
![image](https://user-images.githubusercontent.com/46807600/58612589-b35f4e00-82e5-11e9-80ba-0a8dc011d2cb.png)
**示例 1:**
```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
```
**示例 2:**
```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
```
 

**说明:**

所有节点的值都是唯一的。
p、q 为不同节点且均存在于给定的二叉树中。

## 思路
    通过一个栈实现的dfs分别得到从根节点到目标节点的路径，注意要用一个map记录已经访问过的节点
    得到两个路径后再利用双指针从末尾开始遍历，直到找到相同节点，返回即可

## 上代码（js）
```
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function findNodePath (root, node) {
    let stack = [],
        nodeMap = {};
    while (root || stack.length) {
        if (!nodeMap[root.val]) {
            stack.push(root);
            nodeMap[root.val] = true;
            if (root.val === node.val) {
                return stack;
            }
        }

        if (root.left && !nodeMap[root.left.val]) {
            root = root.left;
            continue;
        }

        if (root.right && !nodeMap[root.right.val]) {
            root = root.right;
            continue;
        }


        stack.pop();
        root = stack[stack.length - 1];
    }
}

var lowestCommonAncestor = function(root, p, q) {
    let pathP = findNodePath(root, p),
        pathQ = findNodePath(root, q),
        pathDiff = Math.abs(pathP.length - pathQ.length),
        pathPIndex,
        pathQIndex;

    if (pathQ.length > pathP.length) {
        pathQIndex = pathQ.length - 1 - pathDiff;
        pathPIndex = pathP.length - 1;
    } else {
        pathQIndex = pathQ.length - 1;
        pathPIndex = pathP.length - 1 - pathDiff;
    }

    while (true) {
        if (pathP[pathPIndex].val === pathQ[pathQIndex].val) {
            return pathP[pathPIndex];
        }
        pathPIndex --;
        pathQIndex --;
    }
};
```

## 上代码（python）
```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def findNodePath (self, root, node) -> []:
        stack = [];
        nodeMap = {};
        while len(stack) != 0 or root:
            if not (root.val in nodeMap):
                nodeMap[root.val] = True;
                stack.append(root);
                if root.val == node.val:
                    return stack;

            if root.left and not (root.left.val in nodeMap):
                root = root.left;
                continue;

            if root.right and not (root.right.val in nodeMap):
                root = root.right;
                continue;

            stack.pop();
            root = stack[-1];

    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        pathP = self.findNodePath(root, p);
        pathQ = self.findNodePath(root, q);
        pathPIndex = pathQIndex = 0;
        pathDiff = abs(len(pathP) - len(pathQ));

        if len(pathP) > len(pathQ):
            pathPIndex = len(pathP) - 1 - pathDiff;
            pathQIndex = len(pathQ) - 1;
        else:
            pathPIndex = len(pathP) - 1;
            pathQIndex = len(pathQ) - 1 - pathDiff;

        while True:
            if pathP[pathPIndex].val == pathQ[pathQIndex].val:
                return pathP[pathPIndex];
            pathPIndex -= 1;
            pathQIndex -= 1;

```