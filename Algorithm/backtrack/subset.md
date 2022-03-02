给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

 

示例 1：

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
示例 2：

输入：nums = [0]
输出：[[],[0]]

## 思路
回溯，外部记录当前搜索的路径，状态回退时路径同时回退，每次更新状态都把新路径添加到结果中。
每次都根据原数组索引递增的逻辑进行搜索，不走回头路，所以路径从索引的层面来说不会出现重复的情况。

## 上代码
```
/**
 * @param {number[]} nums
 * @return {number[][]}
 */


var subsets = function(nums) {
    function dfsSearch (start) {
        if (start === nums.length) {
            return;
        }

        let initPathLen = path.length;
        for (let i = start; i < nums.length; i ++) {
            path.push(nums[i]);
            output.push([...path]);
            dfsSearch(i + 1);
            path = path.slice(0, initPathLen);
        }
    }

    let output = [[]],
        path = [];

    dfsSearch (0);
    return output;
};
```