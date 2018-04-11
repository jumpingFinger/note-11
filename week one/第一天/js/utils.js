var utils =(function() {
    var toArray = function (obj) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(obj, 0);
        } catch (e) {
            for (var i = 0; i < obj.length; i++) {
                ary[ary.length] = obj[i];

            }
        }
        return ary;
    };
    var toJSON = function (str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')');
    };
    var offsetAll = function (ele) {
        var parent = ele.offsetParent,
            left = ele.offsetLeft,
            top = ele.offsetTop;
        if (parent) {
            if (/MSIE [6-8]\.0/.test(navigator.userAgent)) {
                left += parent.offsetLeft;
                top += parent.offsetTop;
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
    var getCss = function (ele, attr) {
        var item = null;
        if (window.getComputedStyle) {
            item = window.getComputedStyle(ele, null)[attr];
        } else {
            if (attr === 'opacity') {
                var item = ele.currentStyle.filter;
                var reg = /alpha \(opacity\s*=\s*(?:\d+(?:\.\d+)?)\)/;
                item = reg.test(item) ? RegExp.$1 / 100:1;
            } else {
                item = ele.currentStyle[attr];
            }
        }
        reg = /^-?(?:\d|[1-9]\d+)(?:\.\d+)?(?:rem|em|px|pt)?$/;
        return reg.test(item) ? parseFloat(item) : item;
    };
    var setCss = function (ele, attr, value) {
        if (attr === 'opacity') {
            ele.style[attr] = 'opacity';
            ele.style.filter = 'alpha(opacity=' + value * 100 + ')';
        }
        var reg = /(?:width|height)(?:(?:margin|padding)?(?:left|right|bottom|top)?)/g;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += 'px';
            }
        }
        ele.style[attr] = value;
    };
    var setGroup = function (ele, options) {
        if (Object.prototype.toString.call(options) !== '[object Object]') return;
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                setCss(ele, key, options[key]);
            }
        }
    };
    var css=function(){
        var length =arguments.length,
            fn=getCss,
            type=Object.prototype.toString.call(arguments[1]);
        length>=3?fn=setCss: (length===2 && type==='[object Object]'?fn=setGroup:null);
        return fn.apply(null,arguments);
    };
    var winBox=function (attr,value){
        var result =null;
        if(typeof value ==='undefined'){
          result=document.documentElement[attr] ||document.body[attr];
        }else{
            if(attr ==='scrollTop' || attr==='scrollLeft'){
                document.documentElement[attr]=value;
                document.body[attr]=value;
            }
        }
        return result;
    };
    var getByClass=function (strClass,context){
        context=context||document;
        var eleAll=tontext.getElementsByTagName('*');
        strClass=strClass.replace(/^\s+|\s+$/g).split(/\s+/g);
        for (var j = 0; j < strClass.length; j++) {
            var item=strClass[j];
            for (var i = 0; i < eleAll.length; i++) {
                var reg =new RegExp('(^| +)'+item+'( +|$)');
                if(!reg.test(eleAll[i].className)) {
                    eleAll.splice(i,1);
                    i--;
                }
            }
        }
        return eleAll;
    };

    //判断ele这个元素是否有这个class的类名
    var hasClass=function (ele,strClass){
        strClass=strClass.replace(/^\s+|\s+$/g).split(/\s+/g);
        for (var i = 0; i < strClass.length; i++) {
            var reg=new RegExp ('(^| +)'+strClass[i]+'( +|$)');
            if(!reg.test(ele.className)){
                return false;
            }
        }
        return true;
    };

    //addClass  如果有不添加class类名  , 如果没有则添加class类名
    var addClass=function (ele,strClass){
        strClass=strClass.replace(/^\s+|\s+$/g).split(/\s+/g);
        for (var i = 0; i < strClass.length; i++) {
            if(!hasClass(ele,strClass[i])){
                ele.className+=' '+strClass[i];
            }
        }
    };

    //removeClass 删掉输入的这个类名
    var removeClass=function (ele,strClass){
        strClass=strClass.replace(/^\s+|\s+$/).split(/\s+/g);
        for (var i = 0; i < strClass.length; i++) {
            var reg =new RegExp('(^| +)'+strClass[i]+'( +|$)');
            if(reg.test(ele.className)){
                ele.className=ele.className.replace(reg,'');
            }
        }
    };

    var getChildren1=function (curEle,tagName){
        var ary=[];
        var nodeList=curEle.childNodes;
        for (var i = 0; i < nodeList.length; i++) {
           var cur=nodeList[i];
           if(cur.nodeType ===1){
               if(typeof tagName !=='undefined'){
                   if(cur.nodeName.toLowerCase===tagName.toLowerCase){
                       ary[ary.length]=cur;
                   }
                   continue;
               }
               ary[ary.length]=cur;
           }
        }
        return ary;
    };

    var getChidren=function (curEle,tagName){
        var nodeList=toArray(curEle.childNodes);
        for (var i = 0; i < nodeList.length; i++) {
                var cur=nodeList[i];
            if(cur.nodeType!==1){
                    // console.log(cur);
                    nodeList.splice(i,1);
                    i--;
                }else{
                    if(tagName && cur.nodeName.toLowerCase()!==tagName.toLowerCase()){
                        console.log(cur);
                        nodeList.splice(i,1);
                        i--;
                    }
                }
        }
        return nodeList;
    };

    return {
        toArray: toArray,
        toJSON: toJSON,
        offsetAll: offsetAll,
        css:css,
        winBox:winBox,
        getByClass:getByClass,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass,
        getChidren:getChidren
    }
})();
