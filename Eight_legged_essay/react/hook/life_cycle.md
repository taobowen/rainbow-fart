先看看下面这个常见hook的生命流程

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);
  
  useEffect(() => {
      console.log(1);
      return () => {
          console.log(2);
      }
  }, [count]);

  useEffect(() => {
    console.log(3);
    return () => {
      console.log(4);
    }
  }, []);
  
  console.log(5);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
初次渲染，会输出5，1，3，5，5

点击按钮，会输出5，2，1，5

由此可见useEffect第二个参数为空或者[]时相当于class中的componentDidMount，第二个参数不为空时，可类比于componentDidUpdate或者是vue中的watch

**下面是用hook的写法实现class的各个生命周期函数：**

- constructor

```jsx
class Example extends Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }
    render() {
        return null;
    }
}

function Example() {
    const [count, setCount] = useState(0);
    return null;
}
```

- componentDidMount:

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
    useEffect(() => {
        console.log('componentDidMount');
    }, []);
    return null;
}
```

- shouldComponentUpdate:

```jsx
const MyComponent = React.memo(
    _MyComponent,
    (prevProps, nextProps) => nextProps.count !== prevProps.count
)
```


- componentDidUpdate:

通常情况下componentDidUpdate与componentDidMount共用一段逻辑
```jsx
import React, { useState, useEffect } from 'react';

function Example() {
    useEffect(() => {
        console.log('componentDidMount and componentDidUpdate');
    }, []);
    return null;
}
```

但也可以通过下面这种方式单独写:

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            console.log('componentDidUpdate')
        }
    });
    
    return <input ref={mounted} type="text" />;
}
```

- componentWillUnmount:

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
    useEffect(() => {
        return () => {
            console.log('componentWillUnmount');
        }
    }, []);
    return null;
}
```

