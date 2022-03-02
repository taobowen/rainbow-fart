给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

示例 1：

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
示例 2：

输入：nums = [0,1]
输出：[[0,1],[1,0]]
示例 3：

输入：nums = [1]
输出：[[1]]

## 思路
回溯，在路径搜索过程中，将未被添加到路径中的元素集合记录下来，每层路径都会遍历这个集合

## 上代码（js）
```
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var permute = function(nums) {
    function dfsSearch (leftOverNum) {
        if (leftOverNum.length === 0) {
            output.push([...path]);
            path.pop();
            return;
        }

        for (let i = 0; i < leftOverNum.length; i ++) {
            let initPathLen = path.length;
            path.push(leftOverNum[i]);
            dfsSearch([...leftOverNum.slice(0, i), ...leftOverNum.slice(i + 1)]);
            path.splice(initPathLen);
        }
    }

    let output = [],
        path = [];
    dfsSearch(nums);
    return output;
};
```