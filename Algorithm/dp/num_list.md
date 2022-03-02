给你一个整数n。

请你计算并以字典序返回所有可以凑成整数n的数字组合。

示例 1：
```
输入：n = 5
输出：
1 1 1 1 1
2 1 1 1
2 2 1
5
```

## 思路

动态规划，这题最关键的是怎么样去重，属于背包问题的变种。不妨把问题聚焦到字典序上，假设我们返回的每种组合中的数字都按照从大到小排列，
那么对于数字n，从1到n进行遍历，遍历数设为i，算出每个以i为结尾的组合。因为组合都是从大到小排列的，所以不存在重复的问题。

## 上代码（js）
```
function getNumList (num) {
    const dp = new Array(num + 1).fill(null).map(item => []);

    for (let numItem = 1; numItem <= num; numItem ++) {
        for (let i = numItem; i <= num; i++) {
            if (i === numItem && dp[i].length === 0) {
                dp[i] = [[numItem]];
                continue;
            }
            let newCombination = dp[i - numItem].length > 0 ? dp[i - numItem].concat().map(item => [...item, numItem]):[];
            dp[i] = dp[i].concat(newCombination);
        }
    }

    return dp[num];
}
```