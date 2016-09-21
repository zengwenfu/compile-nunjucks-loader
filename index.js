'use strict';

var nunjucks = require('nunjucks');
var path = require('path');

function getQueryString(self, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = self.query.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


module.exports = function(source) {
    this.cacheable && this.cacheable();
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

        var key = self['resourcePath'];
        var data = getQueryString(self, 'data');
        var renderData = {};

        if(data) {
            data = JSON.parse(data);
            if(data[key]) {
                renderData = data[key];
            }
        }

        return nunjucks.renderString(source, renderData);
    } catch(e) {
         console.error("nunjucks-loader:" + e);
         throw e;
    }
}