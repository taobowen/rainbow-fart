给定一个大小为 n 的数组，找到其中的众数。众数是指在数组中出现次数大于 ? n/2 ? 的元素。

你可以假设数组是非空的，并且给定的数组总是存在众数。

示例 1:

```
输入: [3,2,3]
输出: 3
```
示例 2:

```
输入: [2,2,1,1,1,2,2]
输出: 2
```
我在这给出三种方法：
- 通过字典构建数字与数字出现次数的一个映射，这种方法时间复杂度比较小，但是有一定的空间复杂度，是我最开始想到的方法
- 先排序数组，然后取中间的元素，这种方法时间复杂度略大，空间复杂度比较小
- 最后一种方法比较巧妙，空间时间复杂度都很小，直接上代码：
```
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    var number=nums[0];
    var count=1;
    for(var i=1;i<nums.length;i++){
        if (number == nums[i])
		count++;
	else {
		count--;
		if (count == 0) {
			number = nums[i + 1];
		}
	}
    }
    return number;
};
```