# compile-nunjucks-loader
>npm上其实已经有一个nunjucks-loader，下载下来之后发现并不能用，打开其源代码发现第一句话其实就过不了
```
    if (this.target !== 'web') {
        throw new Error('[nunjucks-loader] non-web targets are not supported');
    }
```
> 敢情这是不打算支持node环境下的解析了，没办法，只好自己写一个了

## 安装使用
1. npm install compile-nunjucks-loader
2. webpack怎么配置loader就不用我说了哈
3. 特别需要说明的是：
>  对于extends的引用路径，如果传入的路径前面没有”./“，'../'(如：test/abc)，是按照项目的根路径进行查找的，如果传入的是"./"，”../“(如：./test/abc)，那么就是根据相对路径查找的，当然了如果你传了”/“(如：/test/abc)，那么不好意思这是从系统更路径开始查找的


## 说明
> 在webpack中解析模板，主要用的还是模板继承的特性，很遗憾，目前没有注入data