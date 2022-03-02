## 思想
&emsp;&emsp;快速排序在样本量很小时特别高效，总体的思想就是双指针，根据tagIndex取值的不同，先滑右指针还是左指针很重要

## 上代码：（js）
### 取最左元素作为基数：
```
/**
 * @param {number[]} nums
 * @return {number[]}
 */

var sortArray = function(nums) {
    let stack = [{
        left: 0,
        right: nums.length - 1
    }];

    while (stack.length) {
        let {left, right} = stack.pop();
        if (left >= right) {
            continue;
        }

        let markIndex = left,
            leftIndex = left,
            rightIndex = right;
        while (leftIndex < rightIndex) {
            while (nums[rightIndex] >= nums[markIndex] && rightIndex > leftIndex) {
                rightIndex --;
            }

            while (nums[leftIndex] <= nums[markIndex] && leftIndex < rightIndex) {
                leftIndex ++;
            }

            [nums[leftIndex], nums[rightIndex]] = [nums[rightIndex], nums[leftIndex]];
        }

        [nums[markIndex], nums[leftIndex]] = [nums[leftIndex], nums[markIndex]];
        stack.push({
            left,
            right: leftIndex - 1
        }, {
            left: rightIndex + 1,
            right
        })
    }

    return nums;
};
```

## 上代码：（python）
```
class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        stack = [{
            'left': 0,
            'right': len(nums) - 1
        }];
        while len(stack):
            outList = stack.pop();
            leftIndex = outList['left'];
            rightIndex = outList['right'];
            tagIndex = leftIndex;
            if leftIndex >= rightIndex:
                continue;

            while leftIndex < rightIndex:
               
                while nums[rightIndex] >= nums[tagIndex] and rightIndex > leftIndex:
                    rightIndex -= 1;

                while nums[leftIndex] <= nums[tagIndex] and rightIndex > leftIndex:
                    leftIndex += 1;

                nums[leftIndex], nums[rightIndex] = nums[rightIndex], nums[leftIndex];
            
            nums[tagIndex], nums[rightIndex] = nums[rightIndex], nums[tagIndex];
            
            stack.extend([{
                'left': outList['left'],
                'right': leftIndex - 1
            }, {
                'left': leftIndex + 1,
                'right': outList['right']
            }]);
            
        return nums;
```
