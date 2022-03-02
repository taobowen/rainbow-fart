

给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

示例 1：

输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
示例 2：

输入：nums = [2,0,1]
输出：[0,1,2]
示例 3：

输入：nums = [0]
输出：[0]
示例 4：

输入：nums = [1]
输出：[1]

## 思路
经典荷兰旗算法，用双指针标记左侧和右侧的序号，一遍遍历，到右侧指针处停止遍历，等于0的与左侧交换，等于2的与右侧交换，但是要注意一种特殊情况，比如和右侧交换时，被交换的数可能本身就是0或2，这样会导致被交换的这个0或2无法被后续遍历处理到，因此当0与2本身被交换时需要回退当前遍历的序号，再处理一遍当前序号的0或2.

## 上代码（js）
```
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let leftIndex = 0,
        rightIndex = nums.length - 1;

    for (let searchIndex = 0; searchIndex < rightIndex; searchIndex ++) {
        if (searchIndex === 0) {
            [nums[searchIndex], nums[leftIndex]] = [nums[leftIndex], nums[searchIndex]];
            leftIndex ++;
        }

        if (searchIndex === 2) {
            [nums[searchIndex], nums[rightIndex]] = [nums[rightIndex], nums[searchIndex]];
            rightIndex --;
            if (nums[searchIndex] === 0 || nums[searchIndex] === 2) {
                searchIndex --;
            }
        }
    }
};
```

## 上代码（python）
```
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        leftIndex = 0;
        rightIndex = len(nums) - 1;
        searchIndex = 0;
        while searchIndex <= rightIndex:
            if nums[searchIndex] == 0:
                nums[searchIndex], nums[leftIndex] = nums[leftIndex], nums[searchIndex];
                leftIndex += 1;

            if nums[searchIndex] == 2:
                nums[searchIndex], nums[rightIndex] = nums[rightIndex], nums[searchIndex];
                rightIndex -= 1;
                if nums[searchIndex] == 0 or nums[searchIndex] == 2:
                    searchIndex -= 1;

            searchIndex += 1;
```
 