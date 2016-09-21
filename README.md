# compile-nunjucks-loader
>npm上其实已经有一个nunjucks-loader，下载下来之后发现并不能用，打开其源代码发现第一句话其实就过不了
```
    if (this.target !== 'web') {
        throw new Error('[nunjucks-loader] non-web targets are not supported');
    }
```
> 敢情这是不打算支持node环境下的解析了，没办法，只好自己写一个了

## 安装使用
- npm install compile-nunjucks-loader
- webpack怎么配置loader就不用我说了哈
- 特别需要说明的是：

>  对于extends的引用路径，如果传入的路径前面没有”./“，'../'(如：test/abc)，是按照项目的根路径进行查找的，如果传入的是"./"，”../“(如：./test/abc)，那么就是根据相对路径查找的，当然了如果你传了”/“(如：/test/abc)，那么不好意思这是从系统更路径开始查找的

- 模板如果需要传入渲染数据，要在loader中以data参数传入，每个模板对应的数据以模板的绝对路径为key值
```
    var MutiHtmlWebpackPlugin = require('./index.js');

    //以绝对路径作为key传值
    var key = path.resolve(__dirname, 'test/views/index.html');
    var data = {};
    data[key] = {
        world: 'hello world'
    };
    data = JSON.stringify(data);

    //这是一个处理多html模板的插件，传入loader的方式与配置项的loader类似
    new MutiHtmlWebpackPlugin({
        templatePath: 'test/views/',
        loader: 'html?attrs=img:src img:data-src!compile-nunjucks?data=' + data,
        templateSuffix: '.html',
        path: '/views',
        ignore: ['demo.html', 'abc/abc.html']
    })
```
![](https://nodei.co/npm/compile-nunjucks-loader.png)