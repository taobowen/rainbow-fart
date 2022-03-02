给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

**示例 1:**

```
输入: coins = [1, 2, 5], amount = 11
输出: 3 
解释: 11 = 5 + 5 + 1
```
**示例 2:**

```
输入: coins = [2], amount = 3
输出: -1
```
**说明:**
你可以认为每种硬币的数量是无限的。

**解答：** 类似于0/1背包问题，即取与不取，有dp、dfs、bfs三种解法，这里只列出dp的。用dp尽量用自底向上的方式去做。
**上代码：**
```
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

var coinChange = function(coins, amount) {
    var answer=[0];
    for(let i=1;i<=amount;i++){
        answer[i]=amount+1;
        for(j in coins){
            if(i-coins[j]>=0){
                answer[i]=answer[i]>(answer[i-coins[j]]+1)?answer[i-coins[j]]+1:answer[i];
            }
        }
    }
    return answer[amount]==amount+1?-1:answer[amount]
};
```