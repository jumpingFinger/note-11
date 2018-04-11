var utils = (function () {
    //toArray 类数组转换成数组
    var toArray = function (obj) {
        var ary = [];
        try {
            ary = [].slice.call(obj, 0)
        } catch (e) {
            for (var i = 0; i < obj.length; i++) {
                ary[ary.length] = obj[i];
            }
        }
        return ary
    };
    //toJSON JSON格式的字符串转换成JSON格式对象
    var toJSON = function (str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')');
    };
    //offset(ele)求ele到body偏移量
    var offsetAll = function (ele) {
        var parent = ele.offsetParent,
            left = ele.offsetLeft,
            top = ele.offsetTop;
        while (!parent === document.body && p) { //1.ele.offsetParent是body  2.ele是body p是null 用 p是true排除
            if (!/MSIE 8\.0/.test(navigator.userAgent)) {
                left += parent.clientLeft;
                top += parent.clientTop;
            }
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {
            left: left,
            top: top
        }

    };
    //getCss(ele,attr) 内嵌式或外链式里的css样式
    var getCss = function (ele, attr) {
        var result = '';
        if (window.getComputedStyle) {
            result = window.getComputedStyle(ele, null)[attr];
        } else {
            if (attr === 'opacity') {
                var item = ele.currentStyle.filter;
                var reg = /alpha\(opacity\s*=\s*(\d+(\.\d+)?)\)/;
                result = reg.test(item) ? RegExp.$1 / 100 : 1;
            } else {
                result = ele.currentStyle.attr;
            }
        }
        reg = /^-?(?:\d|[1-9]\d+)(?:\.\d+)?(?:rem|em|px|pt)?$/;
        return reg.test(result) ? parseFloat(result) : result;
    };
    //setCss(ele,attr,value)
    var setCss = function (ele, attr, value) {
        //1.opacity各个浏览器得区别设置
        //2.width\height\margin ...若没加单位,得加单位
        if (attr === 'opacity') {
            ele.style.opacity = value;
            ele.style.filter = 'alpha(opacity=' + value * 100 + ')';
        }
        var reg = /(?:widith|hegith)(?:(?:margin|padding)?(?:left|bottom|right|top)?)/i;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += 'px'
            }
        }
        ele.style[attr] = value;
    };
    //
    var setGroup = function (ele, options) {
        if (Object.prototype.toString.call(options) !== '[object Object]') return ;
        for (var key in options) {
            if (options.hasOwnProperty(key)) {//自己设置的是可枚举的
                setCss(ele, key, options[key])
            }
        }
    };
    var css = function () {
        //用arguments来接收实参 通过参数的类型判断调用什么方法 =>>另一个思路
        var len = arguments.length,
            type = Object.prototype.toString.call(arguments[1]),
            fn = getCss;
        len >= 3 ? fn = setCss : (len === 2 && type === '[object Object]' ? fn = setGroup : null);
        console.log(arguments);
         return fn.apply(null, arguments);
    };
    var win = function (attr, value) {
        if (typeof value === 'undefined') {
            return document.documentElement[attr] || document.body[attr];
        } else {
            if (attr === 'scrollTop' || attr === 'scrollLeft') {
                document.documentElement[attr] = value;
                document.body[attr] = value;
            }
        }
    };

    var getOneClass=function (strClass,context){
        context=context||document;
        var eleAll=context.getElementsByTagName('*'),
            ary=[],
            reg=new RegExp('(^| +)'+strClass+'( +|$)');
        for (var i = 0; i < eleAll.length; i++) {
            if(reg.test(eleAll[i].className)){
                ary.push(eleAll[i]);
            }

        }
        return ary;
    }
    var getByClass=function (strClass,context){
        if(typeof 'getElementsByClassName' ==='function'){
            return utils.toArray(context.getElementsByClassName(strClass))
        }
        context=context||document;
        var eleAll=document.getElementsByTagName('*'),
            aClassAll=strClass.replace(/^\s+|\s+$/g,'').split(/\s+/g);
        for (var i = 0; i < aClassAll.length; i++) {
            var curClass=aClassAll[i],
                ary=[],
                reg=new RegExp('(^| +)'+curClass+'( +|$)');
            for (var j = 0; j < eleAll.length; j++) {
                if(reg.test(eleAll[j].className)){
                    ary.push(eleAll[j]);
                }
            }
            eleAll=ary;
        }
        return ary;
    };
    var hasClass=function (ele,strClass){
        var aryClass=strClass.replace(/^\s+|\s+$/g,'').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var reg=new RegExp('(^| +)'+aryClass[i]+'( +|$)');
            if(!reg.test(ele.className)){
                return false
            }
        }
        return true;
    };
    var addClass=function (ele,strClass){
        var aryClass=strClass.replace(/^\s+|\s+$/g,'').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            if(!hasClass(ele,aryClass[i])){
                ele.className+=' '+aryClass[i];
            }
        }
    };
    var removeClass=function (ele,strClass){
        var aryClass=strClass.replace(/^\s+|\s+$/g,'').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var reg = new RegExp('(^| +)' + aryClass[i] + '( +|$)');
            if(hasClass(ele,aryClass[i])){
                ele.className=ele.className.replace(reg,' '); //这里替换的时候中间要加一个空格
            }
        }
    };
    function getChildren(ele,tagName){
        var ary = [];
        if(typeof tagName === "string"){
            //从所有子元素中筛选出标记名是tagName的元素
            var childs = ele.childNodes;
            for(var i = 0;i<childs.length;i++){
                if(childs[i].nodeType===1){
                    if(childs[i].nodeName.toLowerCase()===tagName.toLowerCase()){
                        ary[ary.length] = childs[i];
                    }
                }
            }

        }else if(typeof tagName ==="undefined"){
            var childs = ele.childNodes;//所有的子节点
            for(var i = 0;i<childs.length;i++){
                if(childs[i].nodeType === 1){
                    ary.push(childs[i]);
                }
            }
        }else{
            throw new TypeError("第二个参数类型错误");
        }
        return ary;
    }

    return {
        toArray: toArray,
        toJSON: toJSON,
        offsetAll: offsetAll,
        css: css,
        win: win,
        getOneClass:getOneClass,
        getByClass:getByClass,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass,
        getChildren:getChildren
    }
})();

// var utils1=(function (){
//
//
//     //里面来回调这个思路是真的好
//
//
//     return {
//         getOneClass:getOneClass,
//         getByClass:getByClass
//     }
// })();
