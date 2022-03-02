**深度优先**
非递归用栈来实现，有两种写法，一种是
上代码：
```
function deepSearch(root) {
    let stack = [],
        answer = [];

    while (stack.length || root) {
        while (root) {
            if (!root.isVisited) {
                stack.push(root);
                root.isVisited = true;
            }
            
            let childIndex = root.children.find(item => {
                return !item.isVisited;
            });

            if (!childIndex) {
                break;
            }

            root = root.children[childIndex];
        }

        let outNode = stack.pop();
        answer.push(outNode.val);
    }

    return answer;
}
```

```
function deepSearch (root) {
    let stack = [],
        answer = [];

    if(node) {
        stack.push(node);
        while(stack.length !== 0) {
            let outNode = stack.pop();
            answer.push(outNode);
            let childrenNode = outNode.children;
            for(i in childrenNode) {
                if(!childrenNode[i].search) {
                    childrenNode.search = true;
                    stack.push(childrenNode[i]);
                }
            }    
        }
    }
    return answer;
}
```

**广度优先**
BFS：先依次遍历兄弟节点，然后遍历兄弟节点下的子节点
广度优先类似层次遍历，非递归可以用队列来实现
上代码：
```
function broadSearch(node) {
    let queue = [];
    let answer = [];
    if(node) {
        queue.push(node);
        while(queue.length !== 0) {
            let outNode = queue.shift();
            answer.push(outNode);
            if(outNode.children) {
                 queue.concat(outNode.children);
            }
        }
    }
    return answer;
}
```
