## React Hook

### 相比于hook，原class组件的缺点：

1. 在组件之间复用状态逻辑很难
2. 复杂组件变得难以理解
3. 难以理解的 class

### hook和class的不同点：

hook更容易封装和复用组件逻辑
1. hook的生命周期的划分没有class那么严格，在某些生命周期同时触发的逻辑可以写在一起。
2. useEffect和useState的状态管理机制更容易复用组件之间的逻辑，比如自定义 hook。

### Hook API

- useState：

    定义state并设定初始值

- useEffect：

    定义state改变时的响应，类似于vue中的watch；以及组件注销时候的响应，相当于componentWillUnmount

- useContext：

  接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。调用了 useContext 的组件总会在 context 值变化时重新渲染。

- useReducer：

    可以理解为结合redux的useState

- useCallback：

  返回一个 memoized 回调函数。该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如shouldComponentUpdate）的子组件时，它将非常有用。
  useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

- useMemo

  返回一个 memoized 值。把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

- useRef

  useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。

- useImperativeHandle、useLayoutEffect、useDebugValue：用的少，待补充

### hook调用规则

1. 只在最顶层使用 Hook，不要在循环，条件或嵌套函数中调用 Hook
2. 只在 React 函数中调用 Hook

官方发布了一个名为 eslint-plugin-react-hooks 的 ESLint 插件来强制执行这两条规则。

### [hook生命周期](./life_cycle.md)

### [自定义hook](./self.md)
