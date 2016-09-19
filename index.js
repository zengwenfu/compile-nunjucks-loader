'use strict';

var nunjucks = require('nunjucks');
var path = require('path');



module.exports = function(source) {

    var self = this;

    //替换成绝对路径
    source = source.replace(/{%[ ]+extends[ ]+(.*?)[ ]+%}/g, function(match, value) {
        var value = value.substring(1, value.length-1);
        var flag = value.substring(0, 1);

        //不是相对路径，就不做替换了
        if(flag!== '.' && flag!== '/') {
            return match;
        }

        if(value.indexOf('/') === 0) {
            value = value.substring(1);
        }
        value = (path.resolve(self.context, value));
        return '{% extends "' + value + '" %}';
    });

    try {
        return nunjucks.renderString(source, {});
    } catch(e) {
         console.error("nunjucks插件:" + e);
         throw e;
    }
}