给定一个未排序的整数数组，找出最长连续序列的长度。

要求算法的时间复杂度为 O(n)。

**示例:**
```
输入: [100, 4, 200, 1, 3, 2]
输出: 4
解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4。
```
**思路：** 一看到连续序列，并且是数字上的连续，我首先想到的是通过类似字典的方式来记录各个数字的访问状态，这道题最关键的一点是怎么处理连续序列变化的状态，我们首先用数字值作为字典的索引，对于连续序列，我们只需在序列的两端记录序列长，每访问一个数字，就更新字典中数字序列两端的长度值。
**上代码：**
```
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    var max=0;
    var dic=[];//字典
    for(i in nums){
        let left=0;
        let right=0;
        if(!isNaN(dic[nums[i]])){
            continue;
        }
        if(!isNaN(dic[nums[i]-1])){
            left=dic[nums[i]-1];
        }
        if(!isNaN(dic[nums[i]+1])){
            right=dic[nums[i]+1];
        }
        dic[nums[i]]=1+left+right;
        max=max<dic[nums[i]]?dic[nums[i]]:max;
        dic[nums[i]-left]=left+right+1;
        dic[nums[i]+right]=right+left+1;
    }
    return max;
};
```