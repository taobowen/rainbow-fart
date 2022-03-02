已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,2,4,5,6,7] 在变化后可能得到：
若旋转 4 次，则可以得到 [4,5,6,7,0,1,2]
若旋转 7 次，则可以得到 [0,1,2,4,5,6,7]
注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。

给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。

## 思路
在数组中任取两数，若左数大于右数，则最小数必位于二者之间，利用这点，很容易想到二分

## 上代码（js）
```
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let leftIndex = 0,
        rightIndex = nums.length - 1;

    while (true) {
        let midIndex = Math.floor((rightIndex + leftIndex) / 2);
        if (midIndex === leftIndex) {
            return Math.min(nums[leftIndex], nums[rightIndex]);
        }

        if (nums[midIndex] > nums[rightIndex]) {
            leftIndex = midIndex;
        } else {
            rightIndex = midIndex;
        }
    }
};
```

## 上代码（python）
```
import math;
class Solution:
    def findMin(self, nums: List[int]) -> int:
        leftIndex = 0;
        rightIndex = len(nums) - 1;
        while True:
            midIndex = math.floor((leftIndex + rightIndex) / 2);
            if midIndex == leftIndex:
                return min(nums[leftIndex], nums[rightIndex]);

            if nums[midIndex] > nums[rightIndex]:
                leftIndex = midIndex;
            else:
                rightIndex = midIndex;
```