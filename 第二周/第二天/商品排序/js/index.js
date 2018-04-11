var shopRender = (function () {
    var productData = null;
    var listBox = document.getElementById('list'),
        linkList = document.getElementById('header').getElementsByTagName('a');

    //=>getData：获取数据
    var getData = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var result = xhr.responseText;
                productData = utils.toJSON(result);
            }
        };
        xhr.send(null);
    };

    //=>bindHTML：把数据动态绑定在页面中
    var bindHTML = function () {
        if (!productData) return;
        var str = ``;
        for (var i = 0; i < productData.length; i++) {
            var item = productData[i];
            str += `<li data-time="${item.time}" data-price="${item.price}" data-hot="${item.hot}">
            <a href="javascript:;">
                <img src="${item.img}" alt="">
                <p>${item.title}</p>
                <span>￥${item.price}</span>
            </a></li>`;
        }
        listBox.innerHTML = str;
    };

    //=>change：实现商品排序
    var change = function () {
        var oList = listBox.getElementsByTagName('li');
        oList = utils.toArray(oList);

        var _this = this,
            index = _this.myIndex,
            method = _this.myMethod;

        for (var k = 0; k < linkList.length; k++) {
            if (k !== index) {
                linkList[k].myMethod = -1;
            }
        }

        var attrAry = ['data-time', 'data-price', 'data-hot'],
            attr = attrAry[index];
        oList.sort(function (cur, next) {
            var curInn = cur.getAttribute(attr),
                nextInn = next.getAttribute(attr);
            if (index === 0) {
                curInn = curInn.replace(/-/g, '');
                nextInn = nextInn.replace(/-/g, '');
            }
            return (curInn - nextInn) * method;
        });

        var frg = document.createDocumentFragment();
        for (var i = 0; i < oList.length; i++) {
            frg.appendChild(oList[i]);
        }
        listBox.appendChild(frg);
        frg = null;
    };

    //=>bindEvent：绑定点击事件,点击实现排序
    var bindEvent = function () {
        for (var i = 0; i < linkList.length; i++) {
            var curLink = linkList[i];
            curLink.myMethod = -1;
            curLink.myIndex = i;
            curLink.onclick = function () {
                //=>this:curLink
                this.myMethod *= -1;
                change.call(this);
            }
        }
    };

    return {
        init: function () {
            getData();
            bindHTML();
            bindEvent();
        }
    }
})();
shopRender.init();/**
 * Created by Lenovo on 2018/3/10.
 */
