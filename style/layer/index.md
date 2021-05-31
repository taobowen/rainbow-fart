## 概念
&emsp;&emsp;一个元素的层叠水平决定了在同一个层叠上下文中元素在z轴上的显示顺序，懂PS的人会很容易理解，我们可以把层叠水平不同的元素想象成不同的“图层”，另外层叠水平相同的元素出现的先后顺序也决定了“图层”的前后顺序。
![image](https://user-images.githubusercontent.com/46807600/63520413-4693d280-c527-11e9-93e2-8b055443fd29.png)


## 层叠顺序
![image](https://user-images.githubusercontent.com/46807600/63520327-1fd59c00-c527-11e9-8b24-37a750a5d7e7.png)

## 层叠准则
### 前提：在同一个层叠上下文领域中
- z-index大的覆盖z-index小的
- 层叠水平、顺序相同时，dom流后的覆盖dom流前面的

## 层叠上下文的创建
- 页面根元素
- position值为relative/absolute，且z-index值不是auto
- position值为fixed
- 其他css3属性：
   - 布局为flex、inline-flex，同时z-index不为auto
   - opacity不为1
   - transform值不是normal
   - filter值不是none
   - isolation值为isolate
   - will-change值为上述除1外的任一个
   - -webkit-overflow- scrolling为touch

