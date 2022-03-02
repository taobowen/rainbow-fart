## 题干
给定一个整数 n，生成所有由 1 ... n 为节点所组成的 二叉搜索树 
## 思路
归并排序，但是要生成所有的二叉搜索树，在传统的归并上要修改一下，middle——hard之间的难度，掌握了归并应该不难，主要是力扣上要求返回的数据结构和对树的遍历方式有点迷

上代码
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
 * @param {number} n
 * @return {TreeNode[]}
 */
function buildBinaryTree (start, end, arr) {
    let output = [];
    if (start >= end) {
        return [[null]];
    }

    for (let i = start; i < end; i++) {
        output.push(...mergeTree(buildBinaryTree(start, i, arr), arr[i], buildBinaryTree(i + 1, end, arr))); 
    }

    return output;
}

function mergeTree (leftTree, rootVal, rightTree) {
    let output = [];

    for (let i = 0;i < leftTree.length; i++) {
        for (let j = 0; j < rightTree.length; j++) {
            output.push([new TreeNode(rootVal, leftTree[i][0], rightTree[j][0]), ...leftTree[i], ...rightTree[j]]);
        }
    }
    return output;
}

var generateTrees = function(n) {
    let baseArr = [];

    for (let i = 1; i <= n; i++) {
        baseArr.push(i);
    }

    return buildBinaryTree(0, n, baseArr).map(item => item[0]);
};
```