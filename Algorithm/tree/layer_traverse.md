层序遍历二叉树

例如，下图所示二叉树：

```
     1
   /   \
  2    2
 / \   / \
3  4  4   3
```
输出答案为[[1],[2,2],[3,4,4,3]] 

## 思路

如果输出的是一个一维数组则可以借助队列，相当于BFS的简化版;若是一个二维数组，则每次遍历都维护一个新的层级，遍历完之后将旧的层级添加到答案里，然后新的层级去更新旧的层级

## 上代码（js）

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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) {
        return [];
    }

    let lastLayer = [root],
        output = [];
    while (lastLayer.length) {
        let newLayer = [];

        lastLayer.forEach(item => {
            if (item.left) {
                newLayer.push(item.left);
            }
            if (item.right) {
                newLayer.push(item.right);
            }
        });
        output.push(lastLayer.map(item => item.val));
        lastLayer = [...newLayer];
    }
    return output;
};
```

## 上代码（python）

```
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root:
            return []
        output = []
        lastLayer = [root]
        while len(lastLayer) != 0:
            newLayer = []
            for node in lastLayer:
                if node.left:
                    newLayer.append(node.left)

                if node.right:
                    newLayer.append(node.right)

            if len(lastLayer) != 0:
                output.append([item.val for item in lastLayer])

            lastLayer = newLayer.copy() 
        return output;

```