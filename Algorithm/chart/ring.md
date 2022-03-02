## 例题
你这个学期必须选修 numCourses 门课程，记为?0?到?numCourses - 1 。

在选修某些课程之前需要一些先修课程。 先修课程按数组?prerequisites 给出，其中?prerequisites[i] = [ai, bi] ，表示如果要学习课程?ai 则 必须 先学习课程? bi 。

例如，先修课程对?[0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。
## 思路

这里采用BFS和DFS两种方法。

### BFS

借助队列，首先遍历图，找到所有入度为0的节点，入队；
然后循环搜索队列中所有节点

- 入度为0，出队，遍历子节点，所有子节点入度减一，之后再将入度为0的子节点入队。
- 入度不为0，将节点移到队列末尾

直到队列为空
因为环中的所有节点怎么操作入度都不可能0，如果在此期间出队节点总数和图中总结点数相等，则说明图中无环。

### 上代码
```
function Node (val) {
    this.val = val;
    this.pre = 0;
    this.neighbors = [];
}

var canFinish = function(numCourses, prerequisites) {
    let allNodeMap = [],
        queue = [],
        effectiveCourse = 0;

    prerequisites.forEach((item, index) => {
        if (!allNodeMap[item[0]]) {
            allNodeMap[item[0]] = new Node(item[0]);
        }

        if (!allNodeMap[item[1]]) {
            allNodeMap[item[1]] = new Node(item[1]);
        }

        allNodeMap[item[1]].pre ++;

        allNodeMap[item[0]].neighbors.push(allNodeMap[item[1]]);
    });

    for (let i = 0; i < numCourses; i ++) {
        if (!allNodeMap[i]) {
            effectiveCourse ++;
            continue;
        }

        if (allNodeMap[i].pre === 0) {
            queue.push(allNodeMap[i]);
        }
    }

    while (queue.length) {
        let outNode = queue.shift();
        if (outNode.pre === 0) {
            outNode.neighbors.forEach(item => {
                item.pre --;
                if (item.pre === 0) {
                    queue.push(item);
                }
            });
            effectiveCourse ++;
            continue;
        }

        queue.push(outNode);
    }

    return effectiveCourse === numCourses;
};
```