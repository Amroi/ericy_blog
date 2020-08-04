## 博客系统设计
![image.png](https://i.loli.net/2020/07/29/5hT1cYVmrk6qKyw.png)

    a. 构建思路
    1). 前台UI(静态界面) => 数据补充(接口调用) => 后台管理

    b. 关于中台搭建
    博客系统的服务端（或者叫做中台），采用Koa的上层框架egg.js，
    所谓上层框架就是在Koa的基础上，封装的框架。

    c. 中台的作用
    我们的所有数据的获得和业务逻辑的操作都是通过中台实现的，也就是说中台只提供接口，这里的设计我们采用RESTful的规则，让egg为前端提供Api接口，实现中台主要的功能。
    (之前都是调用别人的接口,这个其实是自己制作接口了)

### RESTful的规则
[https://www.jianshu.com/p/3246c73e2da7](https://www.jianshu.com/p/3246c73e2da7)
