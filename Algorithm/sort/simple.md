## 选择排序
### 思想 
&emsp;&emsp;首先从原始数组中找到最小的元素，并把该元素放在数组的最前面，然后再从剩下的元素中寻找最小的元素，放在之前最小元素的后面，知道排序完毕
### 上代码：
```
function chooseSort(arr) {
    for(let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for(let j = i; j < arr.length; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}
```
## 插入排序
### 思想
&emsp;&emsp;插入排序的工作原理就是将未排序数据，对已排序数据序列从后向前扫描，找到对应的位置并插入。插入排序通常采用占位的形式，空间复杂度为O(1),因此，在从后向前扫描的过程中，需要反复的把已排序的元素逐步向后挪位，为新插入元素提供插入的位置。
### 上代码：
```
function insertSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < i; j++) {
            if(arr[j] > arr[i]) {
                let insertNum = arr[i];
                for(let k = i; k > j; k--) {
                    arr[k] = arr[k - 1];
                }
                arr[j] = insertNum;
                break;
            }
        }
    }
}
```
## 冒泡排序
### 思想
&emsp;&emsp;数组中有 n 个数，比较每相邻两个数，如果前者大于后者，就把两个数交换位置；这样一来，第一轮就可以选出一个最大的数放在最后面；那么经过 n-1（数组的 length - 1） 轮，就完成了所有数的排序。
### 上代码：
```
function bubleSort(arr) {
    for(let j = 0; j < arr.length - 1; j++) {
        for(let i = 0; i < arr.length - 1 - j; i++) {
            if(arr[i] > arr[i + 1]) {
                [arr[i], arr[i+1]] = [arr[i + 1], arr[i]];
            }
        }
    }
}
```