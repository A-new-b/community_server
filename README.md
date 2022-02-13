 # community_server
## 0X01 简述
该项目为nodejs后端，为<https://github.com/A-new-b/community_manager> 的后端，目的在于实现一个调用arcblock（区块链私链框架）中forge-js提供的api（类似数据库），目前该框架的学习性和可用性都存疑，本人也只是记录一下自己写过的代码。
## 0X02 文件分析
首先，从app.js这里进入，可以看见用的是express框架，
<blockquote>
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
</blockquote>

这一步是将模板引擎用于 Express，就可以使用模板渲染返回html页面，和flask的render_template类似。
在views文件夹内，也可以看见三个pug文件，用于渲染。

<blockquote>
let indexRouter = require('./routes/index');
</blockquote>
在这里可以看见路由的使用，大致的路由全部被放进了该文件，按其中的内容可以看见每个路由的对应功能。
<br></br>
在jwt中，路由中间件负责权限的审核，防止越权访问。
<br></br>
在index.js中，调用了Dao文件夹中的basic_method.js，他的作用是和forge沟通，对用户信息进行存储，可以将他看作数据库的类似东西，在这个文件里面，规定了三个主要api。写成三个文件更合理，但是我懒了。
<br></br>
尴尬的是用户名和密码仍然需要mysql，那这区块链到底分布了个啥，别问我，问就是我也不懂（笑）
<br></br>
整体逻辑上来说，在创建账户的时候，这个会向forge申请一个钱包，然后把密钥放mysql里面，用户在和web交互的时候，会在mysql和forge里面同时操作，forge完成后才会轮到mysql，来确保安全性。

## 0X03 尾声
当时在写这个项目的时候，还是大二，整个小组只有我一个人在这个上面用心，最后的结果反而不怎么成功，反而还是很伤心的，留个纪念，结束掉，也好。

