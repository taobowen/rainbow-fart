1、PX(CSS pixels)
1.1 定义
虚拟像素，可以理解为“直觉”像素，CSS和JS使用的抽象单位，浏览器内的一切长度都是以CSS像素为单位的，CSS像素的单位是px。

1.2 注意
在CSS规范中，长度单位可以分为两类，绝对(absolute)单位以及相对(relative)单位。px是一个相对单位，相对的是设备像素(device pixel)。

在同样一个设备上，每1个CSS像素所代表的物理像素是可以变化的(即CSS像素的第一方面的相对性); 

在不同的设备之间，每1个CSS像素所代表的物理像素是可以变化的(即CSS像素的第二方面的相对性);

1.3 那么PX到底是什么？
px实际是pixel（像素）的缩写，根据 维基百科的解释，它是图像显示的基本单元，既不是一个确定的物理量，也不是一个点或者小方块，而是一个抽象概念。所以在谈论像素时一定要清楚它的上下文！一定要清楚它的上下文！一定要清楚它的上下文！

不同的设备，图像基本采样单元是不同的，显示器上的物理像素等于显示器的点距，而打印机的物理像素等于打印机的墨点。而衡量点距大小和打印机墨点大小的单位分别称为ppi和dpi：

ppi：每英寸多少像素数，放到显示器上说的是每英寸多少物理像素及显示器设备的点距。

dpi：每英寸多少点。

关于打印机的点距我们不去关心，只要知道 当用于描述显示器设备时ppi与dpi是同一个概念 。

1.4 CSS像素的真正含义
由于不同的物理设备的物理像素的大小是不一样的，所以css认为浏览器应该对css中的像素进行调节，使得浏览器中 1css像素的大小在不同物理设备上看上去大小总是差不多 ，目的是为了保证阅读体验一致。为了达到这一点浏览器可以直接按照设备的物理像素大小进行换算，而css规范中使用**"参考像素"**来进行换算。

1参考像素即为从一臂之遥看解析度为96DPI的设备输出（即1英寸96点）时，1点（即1/96英寸）的视角。它并不是1/96英寸长度，而是从一臂之遥的距离处看解析度为96DPI的设备输出一单位（即1/96英寸）时视线与水平线的夹角。通常认为常人臂长为28英寸，所以它的视角是:
(1/96)in / (28in * 2 * PI / 360deg) = 0.0213度。

由于css像素是一个视角单位，所以在真正实现时，为了方便基本都是根据设备像素换算的。浏览器根据硬件设备能够直接获取css像素

1.5 举个栗子来理解css像素的相对性
作为Web开发者，我们接触的更多的是用于控制元素样式的样式单位像素。这里的像素我们称之为CSS像素。

CSS像素有什么特别的地方？我们可以借用quirksmode中的这个例子：

假设我们用PC浏览器打开一个页面，浏览器此时的宽度为800px，页面上同时有一个400px宽的块级元素容器。很明显此时块状容器应该占页面的一半。

但如果我们把页面放大（通过“Ctrl键”加上“+号键”），放大为200%，也就是原来的两倍。此时块状容器则横向占满了整个浏览器。

吊诡的是此时我们既没有调整浏览器窗口大小，也没有改变块状元素的css宽度，但是它看上去却变大了一倍——这是因为我们把CSS像素放大为了原来的两倍。

CSS像素与屏幕像素1：1同样大小时：

![image](https://user-images.githubusercontent.com/46807600/57746373-84e94c80-7703-11e9-837e-bbbdf02fec9e.png)

CSS像素(黑色边框)开始被拉伸，此时1个CSS像素大于1个屏幕像素

![image](https://user-images.githubusercontent.com/46807600/57746392-929ed200-7703-11e9-8849-866aa29b0c7b.png)

也就是说默认情况下一个CSS像素应该是等于一个物理像素的宽度的，但是浏览器的放大操作让一个CSS像素等于了两个设备像素宽度。在后面你会看到更复杂的情况，在高PPI的设备上，CSS像素甚至在默认状态下就相当于多个物理像素的尺寸。

从上面的例子可以看出，CSS像素从来都只是一个相对值。

2、DP(device pixels)
2.1 定义
设备像素（物理像素），顾名思义，显示屏是由一个个物理像素点组成的，通过控制每个像素点的颜色，使屏幕显示出不同的图像，屏幕从工厂出来那天起，它上面的物理像素点就固定不变了，单位pt。

2.2 注意
pt在css单位中属于真正的绝对单位，1pt = 1/72(inch),inch及英寸，而1英寸等于2.54厘米。

不同的设备，其图像基本单位是不同的，比如显示器的点距，可以认为是显示器的物理像素。现在的液晶显示器的点距一般在0.25mm到0.29mm之间。而打印机的墨点，也可以认为是打印机的物理像素，300DPI就是0.085mm，600DPI就是0.042mm。

注意，我们通常所说的显示器分辨率，其实是指桌面设定的分辨率，而不是显示器的物理分辨率。只不过现在液晶显示器成为主流，由于液晶的显示原理与CRT不同，只有在桌面分辨率与物理分辨率一致的情况下，显示效果最佳，所以现在我们的桌面分辨率几乎总是与显示器的物理分辨率一致了。

2.3 小知识
小知识:屏幕普遍采用RGB色域(红、绿、蓝三个子像素构成),而印刷行业普遍使用CMYK色域(青、品红、黄和黑)

2.4 设备像素(DP)与CSS像素之间的关系
获得设备像素比（dpr）后，便可得知设备像素与CSS像素之间的比例。当这个比率为1:1时，使用1个设备像素显示1个CSS像素。当这个比率为2:1时，使用4个设备像素显示1个CSS像素，当这个比率为3:1时，使用9（3*3）个设备像素显示1个CSS像素。
所以，有如下公式：

DPR = 设备像素/CSS像素

3、DIP(Device independent Pixel)
设备独立像素，也称为逻辑像素，简称dip。
根据上述设备像素与CSS像素之间的关系、及DPR的官方定义，我们可以推断出：

CSS像素 =设备独立像素 = 逻辑像素

下面，还是引用 http://www.cnblogs.com/2050/p/3877280.html 文中的内容说明：

在移动端浏览器中以及某些桌面浏览器中，window对象有一个devicePixelRatio属性，它的官方的定义为：设备物理像素和设备独立像素的比例，也就是 devicePixelRatio = 物理像素 / 独立像素。
CSS像素就可以看做是设备的独立像素，所以通过devicePixelRatio，我们可以知道该设备上一个css像素代表多少个物理像素。例如，在Retina屏的iphone上，devicePixelRatio的值为2，也就是说1个css像素相当于2个物理像素。但是要注意的是，devicePixelRato在不同的浏览器中还存在些许的兼容性问题，所以我们现在还并不能完全信赖这个东西，具体的情况可以看下这篇文章。

为什么是“每四个一组”？而且要让这四个一组来显示“原来屏幕的一个像素”？这大概就是 Retina 显示技术的一种表现吧。而这“每四个一组”的“大像素”，可以被称作“设备独立像素”，device independent pixel ，或者 density-independentpixel ，它可以是系统中的一个点，这个点代表一个可以由程序使用的虚拟像素，然后由相关系统转换为物理像素。

“设备独立像素”也有人称为“CSS像素”，一种形象的说法，更倾向于表明与 CSS 中尺寸的对应。

设备独立像素与物理像素的对应关系，可以这样看：

![image](https://user-images.githubusercontent.com/46807600/57746436-c974e800-7703-11e9-8339-4cd82255d9e6.png)

类似的每四个一组的对应关系，也许正是 Retina 显示技术所做的。

4、DPR(device pixels ratio)
4.1 定义
设备像素比（dpr 描述的是未缩放状态下，物理像素和CSS像素的初始比例关系，计算方法如下图。



4.2 理解
设备像素比(dpr) 是指在移动开发中1个css像素占用多少设备像素，如2代表1个css像素用2x2个设备像素来绘制。

设备像素比(dpr)，公式为1px = (dpr)^2 * 1dp，可以理解为1px由多少个设备像素组成；



5、PPI(pixels per inch)
5.1 定义
每英寸像素取值，更确切的说法应该是像素密度，也就是衡量单位物理面积内拥有像素值的情况。

5.2 ppi是如何计算出来的呢？
顾名思义，每英寸的像素点（设备像素），已知屏幕分辨率和主对角线的尺寸，则ppi等于
以爱疯6为例：

![image](https://user-images.githubusercontent.com/46807600/57746487-f45f3c00-7703-11e9-93a8-747756d0b5ed.png)

var 斜边尺寸 = V(1920^2+1080^2) V代表开根号 
var ppi = 斜边尺寸/5.5 
ppi = 401ppi

![image](https://user-images.githubusercontent.com/46807600/57746522-135dce00-7704-11e9-9f0f-172d2d9e6667.png)


我们知道，ppi越高，每英寸像素点越多，图像越清晰；我们可以类比物体的密度，密度越大，单位体积的质量就越大，ppi越高，单位面积的像素越多。

5.3 ppi和dpr到底什么关系？
毕竟这些参数是外国人先发明的，他们会优先选择自己熟悉的计量单位作为显示设备的工厂标准参数，因此ppi就用作显示设备的工业标准；

告诉业界人士，ppi达到多少是高清屏，此时对应的dpr是多少，而不直接告诉你我现在的显示设备dpr是多少，毕竟人们直接听到像素分辨率会更加有反应。

设备像素比与ppi相关，一般是ppi/160的整数倍：

![image](https://user-images.githubusercontent.com/46807600/57746536-1c4e9f80-7704-11e9-9b4f-3fdf43cafff9.png)

6、倍率与逻辑像素
6.1 基本关系

![image](https://user-images.githubusercontent.com/46807600/57746553-34beba00-7704-11e9-999c-8e68c991c108.png)

用iPhone 3gs和4s来举例。假设有个邮件列表界面，我们不妨按照PC端网页设计的思维来想象。3gs上大概只能显示4-5行，4s就能显示9-10行，而且每行会变得特别宽。但两款手机其实是一样大的。如果照这种方式显示，3gs上刚刚好的效果，在4s上就会小到根本看不清字。

![image](https://user-images.githubusercontent.com/46807600/57746559-4011e580-7704-11e9-8d89-52afad9684b6.png)

在现实中，这两者效果却是一样的。这是因为Retina屏幕把2x2个像素当1个像素使用。比如原本44像素高的顶部导航栏，在Retina屏上用了88个像素的高度来显示。导致界面元素都变成2倍大小，反而和3gs效果一样了。画质却更清晰。

在以前，iOS应用的资源图片中，同一张图通常有两个尺寸。你会看到文件名有的带@2x字样，有的不带。其中不带@2x的用在普通屏上，带@2x的用在Retina屏上。只要图片准备好，iOS会自己判断用哪张，Android道理也一样。

由此可以看出，苹果以普通屏为基准，给Retina屏定义了一个2倍的倍率（iPhone 6plus除外，它达到了3倍）。实际像素除以倍率，就得到逻辑像素尺寸。只要两个屏幕逻辑像素相同，它们的显示效果就是相同的。

6.2 Retina显示屏
这是一种显示技术，可以将把更多的像素点压缩至一块屏幕里，从而达到更高的分辨率并提高屏幕显示的细腻程度，这种分辨率在正常观看距离下足以使人肉眼无法分辨其中的单独像素。

最先使用retina屏幕是iphone 4，屏幕分辨率为960 * 640（326ppi）。

对比如下两幅图，可以清晰地看出是否 Retina 屏的显示差异：

![image](https://user-images.githubusercontent.com/46807600/57746565-4c963e00-7704-11e9-919c-d30836725b92.png)

图2 iPhone 3GS

![image](https://user-images.githubusercontent.com/46807600/57746569-5455e280-7704-11e9-99d5-822a04868976.png)

图3 iPhone 4

两代iPhone 的物理尺寸（屏幕宽高有多少英寸）是一样的，从上图可以看出，iphone 4的显示效果要明显好于iphone 3GS，虽然 iPhone 4 分辨率提高了，但它不同于普通的电脑显示器那样为了显示更多的内容，而是提升显示相同内容时的画面精细程度。这种提升方式是靠提升单位面积屏幕的像素数量，即像素密度来提升分辨率，这样做的主要目的是为了提高屏幕显示画面的精细程度。以第三代 MacBook Pro with Retina Display为例， 工作时显卡渲染出的2880x1880个像素每四个一组，输出原来屏幕的一个像素显示的大小区域内的图像。这样一来，用户所看到的图标与文字的大小与原来的1440x900分辨率显示屏相同，但精细度是原来的4倍。

注意：在桌面显示器中，我们调整了显示分辨率，比如从 800 * 600 调整到 1024 * 768 时，屏幕的文字图标会变小，显示的内容更多了。但 Retina 显示方式不会产生这样的问题，或者说， Retina 显示技术解决的是显示画面精细程度的问题，而不是解决显示内容容量的问题。

7、分辨率、像素和屏幕尺寸
PPI 说的是像素密度，而分辨率说的是块屏幕的像素尺寸，譬如说 1334*750 就是 iPhone（6~7）的分辨率，说 iPhone（6~7）的分辨率是 326 是错误的表述，326 是它的像素密度，单位是 PPI。

询问别人一粒像素有多大是一个非常鸡贼的问题（小心面试遇到这样的题），虽然我们说像素是构成屏幕的发光的点，是物理的，但是像素在脱离了屏幕尺寸之后是没有大小可言的，你可以将 1920 * 1080 颗像素放到一台 40 寸的小米电视机里面，也可以将同样多的像素全部塞到一台 5.5 寸的 iPhone7 Plus 手机里面去，那么对于 40 寸的电视而言，每个像素颗粒当然会大于 5.5 寸的手机的像素。

![image](https://user-images.githubusercontent.com/46807600/57746574-5cae1d80-7704-11e9-8308-28985437bea2.png)

所以光看屏幕的分辨率对于设计师来说是不具备多少实际意义的，通过分辨率计算得出的像素密度（PPI）才是设计师要关心的问题，我们通过屏幕分辨率和屏幕尺寸就能计算出屏幕的像素密度的。

再次使用 iPhone（6~7）作为例子。我们知道该屏幕的横向物理尺寸为 2.3 英寸 ，且横向具有 750 颗像素，根据下面的公式，我们能够算出 iPhone（6~7）的屏幕是 326 PPI，意为每寸存在 326 颗像素。

其实不论我们怎么除，计算得出来的像素密度（PPI）都会是这个数，宽存在像素除以宽物理长度，高存在像素除以高物理长度，得数都接近于 326。

8、Viewport
8.1 PPK的关于三个viewport的理论
ppk大神对于移动设备上的viewport有着非常多的研究（第一篇，第二篇，第三篇），有兴趣的同学可以去看一下，本文中有很多数据和观点也是出自那里。ppk认为，移动设备上有三个viewport。

首先，移动设备上的浏览器认为自己必须能让所有的网站都正常显示，即使是那些不是为移动设备设计的网站。但如果以浏览器的可视区域作为viewport的话，因为移动设备的屏幕都不是很宽，所以那些为桌面浏览器设计的网站放到移动设备上显示时，必然会因为移动设备的viewport太窄，而挤作一团，甚至布局什么的都会乱掉。也许有人会问，现在不是有很多手机分辨率都非常大吗，比如768x1024，或者1080x1920这样，那这样的手机用来显示为桌面浏览器设计的网站是没问题的吧？前面我们已经说了，css中的1px并不是代表屏幕上的1px，你分辨率越大，css中1px代表的物理像素就越多，devicePixelRatio的值也越大，这很好理解，因为你分辨率增大了，但屏幕尺寸并没有变大多少，必须让css中的1px代表更多的物理像素，才能让1px的东西在屏幕上的大小与那些低分辨率的设备差不多，不然就会因为太小而看不清。所以在1080x1920这样的设备上，在默认情况下，也许你只要把一个div的宽度设为300多px（视devicePixelRatio的值而定），就是满屏的宽度了。回到正题上来，如果把移动设备上浏览器的可视区域设为viewport的话，某些网站就会因为viewport太窄而显示错乱，所以这些浏览器就决定默认情况下把viewport设为一个较宽的值，比如980px，这样的话即使是那些为桌面设计的网站也能在移动浏览器上正常显示了。ppk把这个浏览器默认的viewport叫做 layout viewport。
   
这个layout viewport的宽度可以通过document.documentElement.clientWidth 来获取。

然而，layout viewport 的宽度是大于浏览器可视区域的宽度的，所以我们还需要一个viewport来代表 浏览器可视区域的大小，ppk把这个viewport叫做 visual viewport 。visual viewport的宽度可以通过window.innerWidth 来获取，但在Android 2, Oprea mini 和 UC 8中无法正确获取。

![image](https://user-images.githubusercontent.com/46807600/57746587-6a63a300-7704-11e9-8eaf-3dea5ca45ad5.png)

现在我们已经有两个viewport了：layout viewport 和  visual viewport。但浏览器觉得还不够，因为现在越来越多的网站都会为移动设备进行单独的设计，所以必须还要有一个能完美适配移动设备的viewport。所谓的完美适配指的是，首先不需要用户缩放和横向滚动条就能正常的查看网站的所有内容；第二，显示的文字的大小是合适，比如一段14px大小的文字，不会因为在一个高密度像素的屏幕里显示得太小而无法看清，理想的情况是这段14px的文字无论是在何种密度屏幕，何种分辨率下，显示出来的大小都是差不多的。当然，不只是文字，其他元素像图片什么的也是这个道理。ppk把这个viewport叫做 ideal viewport，也就是第三个viewport——移动设备的理想viewport。

ideal viewport并没有一个固定的尺寸，不同的设备拥有有不同的ideal viewport。所有的iphone的ideal viewport宽度都是320px，无论它的屏幕宽度是320还是640，也就是说，在iphone中，css中的320px就代表iphone屏幕的宽度。

![image](https://user-images.githubusercontent.com/46807600/57746594-718ab100-7704-11e9-8cb7-8af62a8321e1.png)

但是安卓设备就比较复杂了，有320px的，有360px的，有384px的等等，关于不同的设备ideal viewport的宽度都为多少，可以到http://viewportsizes.com去查看一下，里面收集了众多设备的理想宽度。

再总结一下：ppk把移动设备上的viewport分为 layout viewport 、 visual viewport 和 ideal viewport 三类，其中的ideal viewport是最适合移动设备的viewport，ideal viewport的宽度等于移动设备的屏幕宽度，只要在css中把某一元素的宽度设为ideal viewport的宽度(单位用px)，那么这个元素的宽度就是设备屏幕的宽度了，也就是宽度为100%的效果。ideal viewport 的意义在于，无论在何种分辨率的屏幕下，那些针对ideal viewport而设计的网站，不需要用户手动缩放，也不需要出现横向滚动条，都可以完美的呈现给用户。

 

8.2 利用meta标签对viewport进行控制
移动设备默认的viewport是layout viewport，也就是那个比屏幕要宽的viewport，但在进行移动设备网站的开发时，我们需要的是ideal viewport。那么怎么才能得到ideal viewport呢？这就该轮到meta标签出场了。

我们在开发移动设备的网站时，最常见的的一个动作就是把下面这个东西复制到我们的head标签中：

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

该meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放。也许允不允许用户缩放不同的网站有不同的要求，但让viewport的宽度等于设备的宽度，这个应该是大家都想要的效果，如果你不这样的设定的话，那就会使用那个比屏幕宽的默认viewport，也就是说会出现横向滚动条。

这个name为viewport的meta标签到底有哪些东西呢，又都有什么作用呢？

meta viewport 标签首先是由苹果公司在其safari浏览器中引入的，目的就是解决移动设备的viewport问题。后来安卓以及各大浏览器厂商也都纷纷效仿，引入对meta viewport的支持，事实也证明这个东西还是非常有用的。

在苹果的规范中，meta viewport 有6个属性(暂且把content中的那些东西称为一个个属性和值)，如下：

![image](https://user-images.githubusercontent.com/46807600/57746603-7c454600-7704-11e9-9137-203096c95a3b.png)

这些属性可以同时使用，也可以单独使用或混合使用，多个属性同时使用时用逗号隔开就行了。

此外，在安卓中还支持  target-densitydpi  这个私有属性，它表示目标设备的密度等级，作用是决定css中的1px代表多少物理像素

![image](https://user-images.githubusercontent.com/46807600/57746610-82d3bd80-7704-11e9-9f26-1516aa17482e.png)

特别说明的是，当 target-densitydpi=device-dpi 时， css中的1px会等于物理像素中的1px。

因为这个属性只有安卓支持，并且安卓已经决定要废弃<strike>target-densitydpi</strike>  这个属性了，所以这个属性我们要避免进行使用  。

8.3 把当前的viewport宽度设置为 ideal viewport 的宽度
要得到ideal viewport就必须把默认的layout viewport的宽度设为移动设备的屏幕宽度。因为meta viewport中的width能控制layout viewport的宽度，所以我们只需要把width设为width-device这个特殊的值就行了。

<meta name="viewport" content="width=device-width">

下图是这句代码在各大移动端浏览器上的测试结果：

![image](https://user-images.githubusercontent.com/46807600/57746615-89facb80-7704-11e9-85cf-33ad3cdc6988.png)

可以看到通过width=device-width，所有浏览器都能把当前的viewport宽度变成ideal viewport的宽度，但要注意的是，在iphone和ipad上，无论是竖屏还是横屏，宽度都是竖屏时ideal viewport的宽度。

这样的写法看起来谁都会做，没吃过猪肉，谁还没见过猪跑啊~，确实，我们在开发移动设备上的网页时，不管你明不明白什么是viewport，可能你只需要这么一句代码就够了。

可是你肯定不知道

<meta name="viewport" content="initial-scale=1">

这句代码也能达到和前一句代码一样的效果，也可以把当前的的viewport变为 ideal viewport。

呵呵，傻眼了吧，因为从理论上来讲，这句代码的作用只是不对当前的页面进行缩放，也就是页面本该是多大就是多大。那为什么会有 width=device-width 的效果呢？

要想清楚这件事情，首先你得弄明白这个缩放是相对于什么来缩放的，因为这里的缩放值是1，也就是没缩放，但却达到了 ideal viewport 的效果，所以，那答案就只有一个了，缩放是相对于 ideal viewport来进行缩放的，当对ideal viewport进行100%的缩放，也就是缩放值为1的时候，不就得到了 ideal viewport 吗？事实证明，的确是这样的。下图是各大移动端的浏览器当设置了<meta name="viewport" content="initial-scale=1">后是否能把当前的viewport 宽度变成 ideal viewport 的宽度的测试结果。

![image](https://user-images.githubusercontent.com/46807600/57746622-92530680-7704-11e9-8d10-564a304951c3.png)

测试结果表明 initial-scale=1 也能把当前的 viewport 宽度变成 ideal viewport 的宽度，但这次轮到了windows phone 上的IE 无论是竖屏还是横屏都把宽度设为竖屏时 ideal viewport 的宽度。但这点小瑕疵已经无关紧要了。

但如果 width 和 initial-scale=1 同时出现，并且还出现了冲突呢？比如：

<meta name="viewport" content="width=400, initial-scale=1">

width=400 表示把当前 viewport 的宽度设为400px，initial-scale=1 则表示把当前 viewport 的宽度设为ideal viewport的宽度，那么浏览器到底该服从哪个命令呢？是书写顺序在后面的那个吗？不是。当遇到这种情况时，浏览器会取它们两个中较大的那个值。例如，当width=400，ideal viewport 的宽度为320时，取的是400；当width=400， ideal viewport的宽度为480时，取的是ideal viewport的宽度。（ps:在uc9浏览器中，当initial-scale=1时，无论width属性的值为多少，此时viewport的宽度永远都是ideal viewport的宽度）

最后，总结一下，要把当前的viewport宽度设为ideal viewport的宽度，既可以设置 width=device-width，也可以设置 initial-scale=1，但这两者各有一个小缺陷，就是iphone、ipad以及IE 会横竖屏不分，通通以竖屏的ideal viewport宽度为准。所以，最完美的写法应该是，两者都写上去，这样就 initial-scale=1 解决了 iphone、ipad的毛病，width=device-width则解决了IE的毛病：

<meta name="viewport" content="width=device-width, initial-scale=1">

8.4 关于meta viewport的更多知识
8.4.1 关于缩放以及initial-scale的默认值
首先我们先来讨论一下缩放的问题，前面已经提到过，缩放是相对于 ideal viewport 缩放的，缩放值越大，当前viewport的宽度就会越小，反之亦然。例如在iphone中，ideal viewport 的宽度是320px，如果我们设置 initial-scale=2 ，此时 viewport 的宽度会变为只有160px了，这也好理解，放大了一倍嘛，就是原来1px的东西变成2px了，但是1px变为2px并不是把原来的320px变为640px了，而是在实际宽度不变的情况下，1px变得跟原来的2px的长度一样了，所以放大2倍后原来需要320px才能填满的宽度现在只需要160px就做到了。因此，我们可以得出一个公式：

visual viewport宽度 = ideal viewport宽度 / 当前缩放值

当前缩放值 = ideal viewport宽度 / visual viewport宽度

ps: visual viewport 的宽度指的是浏览器可视区域的宽度。

大多数浏览器都符合这个理论，但是安卓上的原生浏览器以及IE有些问题。安卓自带的webkit浏览器只有在 initial-scale = 1 以及没有设置width属性时才是表现正常的，也就相当于这理论在它身上基本没用；而IE则根本不甩initial-scale这个属性，无论你给他设置什么，initial-scale表现出来的效果永远是1。

好了，现在再来说下 initial-scale 的默认值问题，就是不写这个属性的时候，它的默认值会是多少呢？很显然不会是1，因为当 initial-scale = 1 时，当前的 layout viewport 宽度会被设为 ideal viewport 的宽度，但前面说了，各浏览器默认的 layout viewport 宽度一般都是980啊，1024啊，800啊等等这些个值，没有一开始就是 ideal viewport 的宽度的，所以 initial-scale 的默认值肯定不是1。安卓设备上的 initial-scale 默认值好像没有方法能够得到，或者就是干脆它就没有默认值，一定要你显示的写出来这个东西才会起作用，我们不管它了，这里我们重点说一下iphone和ipad上的 initial-scale 默认值。

根据测试，我们可以在iphone和ipad上得到一个结论，就是无论你给 layout viewpor 设置的宽度是多少，而又没有指定初始的缩放值的话，那么iphone和ipad会自动计算 initial-scale 这个值，以保证当前 layout viewport 的宽度在缩放后就是浏览器可视区域的宽度，也就是说不会出现横向滚动条。比如说，在iphone上，我们不设置任何的 viewport meta 标签，此时 layout viewport 的宽度为980px，但我们可以看到浏览器并没有出现横向滚动条，浏览器默认的把页面缩小了。根据上面的公式，当前缩放值 = ideal viewport宽度 / visual viewport宽度，我们可以得出：

当前缩放值 = 320 / 980

也就是当前的 initial-scale 默认值应该是 0.33这样子。当你指定了 initial-scale 的值后，这个默认值就不起作用了。

总之记住这个结论就行了：在iphone和ipad上，无论你给viewport设的宽的是多少，如果没有指定默认的缩放值，则iphone和ipad会自动计算这个缩放值，以达到当前页面不会出现横向滚动条(或者说viewport的宽度就是屏幕的宽度)的目的。

![image](https://user-images.githubusercontent.com/46807600/57746632-9e3ec880-7704-11e9-99b4-b52a839fbf5f.png)

8.4.2 动态改变meta viewport标签
第一种方法

可以使用 document.write 来动态输出 meta viewport 标签，例如：

document.write('<meta name="viewport" content="width=device-width,initial-scale=1">')
第二种方法

通过 setAttribute 来改变

<meta id="testViewport" name="viewport" content="width = 380">
<script>
var mvp = document.getElementById('testViewport');
mvp.setAttribute('content','width=480');
</script>
安卓2.3自带浏览器上的一个 bug

<meta name="viewport" content="width=device-width">

<script type="text/javascript">
alert(document.documentElement.clientWidth); //弹出600，正常情况应该弹出320
</script>

<meta name="viewport" content="width=600">

<script type="text/javascript">
alert(document.documentElement.clientWidth); //弹出320，正常情况应该弹出600
</script>
测试的手机 ideal viewport 宽度为320px，第一次弹出的值是600,但这个值应该是第行meta标签的结果啊，然后第二次弹出的值是320，这才是第一行meta标签所达到的效果啊，所以在安卓2.3(或许是所有2.x版本中)的自带浏览器中，对 meta viewport 标签进行覆盖或更改，会出现让人非常迷糊的结果。

最后我们来看一个栗子来加深上面概念的印象：
一只笔的像素如下：

![image](https://user-images.githubusercontent.com/46807600/57746639-a5fe6d00-7704-11e9-9445-adc3bff604ea.png)

这只笔在屏幕c,d,e下的显示效果如下：

![image](https://user-images.githubusercontent.com/46807600/57746641-aa2a8a80-7704-11e9-8043-5894dc48ddcd.png)

看到同一张图片在各屏幕显示大小不一。
我们希望不同屏幕显示图片的大小要一致。
我们要计算图片缩放比例。
计算公式：
(图片逻辑像素大小px1) / (图片缩放后实际像素大小px2) = (设备像素dp) / (设备独立像素dips)
px2 = px1 * (dp / dips)
px2 = px1 * dpr
此时，这只笔在屏幕c,d,e下的显示效果如下：

![image](https://user-images.githubusercontent.com/46807600/57746645-af87d500-7704-11e9-9745-85d5edacb773.png)

通过上面的我们可以看到，不同的 DPR (设备像素比)要想显示大小一样，必须准备三张不同分辨率的图片，那么，我想一张图片就在三种不同的屏幕下显示一样的大小，能做到吗？当然能做到，这就需要缩放了，要自己计算缩放多麻烦，那有没有一种简单的方式呢？当然有，那就是你在熟悉不过的px,你会发现设置图片宽度为50px以后，在各个移动终端的大小看起来都一样，这是什么原因呢。

按照 CSS 规范的定义，CSS 中的 px 是一个相对长度，它相对的，是 viewing device 的分辨率。这个viewing device，通常就是电脑显示器。典型的电脑显示器的分辨率是96DPI，也就是1像素为1/96英寸（实际上，假设我们的显示器分辨率都与物理分辨率一致，而液晶点距其实是0.25mm到0.29mm之间，所以不太可能是正好1/96英寸，而只是接近）。

一般来说，px 就是对应设备的物理像素，然而如果输出设备的解析度与电脑显示器大不相同，输出效果就会有问题。例如打印机输出到纸张上，其解析度比电脑屏幕要高许多，如果不缩放，直接使用设备的物理像素，那电脑上的照片由 600DPI 的打印机打出来就比用显示器看小了约6倍。

所以 CSS 规定，在这种情况下，浏览器应该对像素值进行缩放调节，以保持阅读体验的大体一致。也就是要保持一定像素的长度在不同设备输出上看上去的大小总是差不多。

怎样确保这一点呢？直接按照设备物理像素的大小进行换算当然是一个方式，但是CSS考虑得更多，它建议，转换应按照“参考像素”（reference pixel）来进行。

眼睛看到的大小，取决于可视角度。而可视角度取决于物体的实际大小以及物体与眼睛的距离。10米远处一个1米见方的东西，与1米远处的10厘米见方的东西，看上去的大小差不多是一样的，所谓一叶障目不见泰山，讲的就是这个常识。

因此CSS规范使用视角来定义“参考像素”，1参考像素即为从一臂之遥看解析度为96DPI的设备输出（即1英寸96点）时，1点（即1/96英寸）的视角。

请注意这个差别——CSS规范定义的参考像素并不是1/96英寸，而是1/96英寸在一臂之遥的看起来的视角。通常认为常人臂长为28英寸，所以其视角可以计算出来是0.0213度。（即(1/96)in / (28in * 2 * PI / 360deg) ）

我们在使用不同设备输出时，眼睛与设备输出的典型距离是不同的。比如电脑显示器，通常是一臂之距，而看书和纸张时（对应于打印机的设备输出），则通常会更近一些。看电视时则会更远，比如一般建议是电视机屏幕对角线的2.5到3倍长——如果你是个42'彩电，那就差不多是3米远。看电影的话……我就不知道多远了，您自己量吧。

因此，1参考像素：
对于电脑显示器是0.26mm（即1/96英寸）；
对于激光打印机是0.20mm（假设阅读距离通常为55cm，即21英寸）；

而换算时，对于300DPI的打印机（即每个点是1/300英寸），1px通常会四舍五入到3dots，也就是0.25mm左右；而对于600DPI的打印机，则可能四舍五入到5dots，也就是0.21mm。

![image](https://user-images.githubusercontent.com/46807600/57746657-ba426a00-7704-11e9-940c-811d3feb93b2.png)

上图中，左边的屏幕（可以认为是电脑屏幕）的典型视觉距离是71厘米即28英寸，其1px对应了0.28mm；
而右边的屏幕（可以认为是你的42寸高清电视）的典型视觉距离是3.5米即120英寸，其1px对应1.3mm。42寸的1080p电视，分辨率是1920*1080，则其物理像素只有0.5mm左右，可见确实是高清哦。

综上，px 是一个相对单位，而且在特定设备上总是一个近似值（原则是尽量接近参考像素）。

然而，如果你把绝对单位理解为对输出效果的绝对掌控，事情却大相径庭。就网页输出的最主要对象——电脑屏幕来说，px 可被视为一个基准单位——与桌面分辨率一致，如果是液晶屏，则几乎总是与液晶屏物理分辨率一致——也就是说网页设计者设定的1px，就是“最终看到这个网页的用户的显示器上的1个点距”！反倒是那些绝对单位，其实一点也不绝对。