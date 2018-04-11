//1.动态绑定数据
var xhr= new XMLHttpRequest();
var data=null;
    xhr.open('get','./json/product.json',false);
    xhr.onreadystatechange=function (){
        if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
             data=utils.toJSON(xhr.responseText)

        }
    };
    xhr.send(null);
console.log(data);


var str='';
for (var i = 0; i < data.length; i++) {
    var item=data[i];
// str+="<li data-price="+item.price+" date-hot="+item.hot+" date-time="+item.time+">";
    str+="<li  data-price ='"+item.price+"' data-hot ='"+item.hot+"' data-time ='"+item.time+"'>";
str+='<img src='+item.img+' alt="">';
str+='<h3>'+item.title+ '</h3>';
str+="<span>¥"+item.price+"</span>";
str+="<span>"+item.hot+"</span>" ;
str+="<span>"+item.time+"</span>";
str+= '</li>';
}
var oUl=document.getElementById('product');
oUl.innerHTML=str;

var oMenu=document.getElementById('menu'),
    oA=oMenu.getElementsByTagName('a');

for (var j = 0; j < oA.length; j++) {
    oA[j].flag=-1;//默认是-1
    oA[j].curIndex=j;
    oA[j].onclick=function (){
        this.flag*=-10; //每次点击时在原来状态的值*-1则会改变相反的状态
        change(this.curIndex,this.flag);
    }
}
var oLis=oUl.getElementsByTagName('li');
var ary=utils.toArray(oLis);

function change(n,flag){
    var attrArray=['data-price','data-hot','data-time'];
    ary.sort(function (a,b){
        var key=attrArray[n];
        var pre=a.getAttribute(key);
        var net=b.getAttribute(key);
        pre = pre.replace(/-/g,"");
        net = net.replace(/-/g,"");
        return (pre-net)*flag
    });
    var frg=document.createDocumentFragment();
    for (var k = 0; k < ary.length; k++) {
        // console.log(ary[k]);
        frg.appendChild(ary[k]);
    }
    oUl.appendChild(frg);
    frg=null;
}

// function change (index) {
//     var ary = ['price', 'hot', 'time'];
//     for (var i = 0; i < data.length; i++) {
//         [].sort.call(data,function (a, b) {
//             return a['hot'] - b['hot']
//         })
//     }
//     console.log(data);
// }
// var str='';
// for (var i = 0; i < data.length; i++) {
//     var item=data[i];
//     str+='<li>';
//     str+='<img src='+item.img+' alt="">';
//     str+='<span>'+item.title+ '</span>';
//     str+='<h3>'+item.price+'</h3>';
//     str+='<span>'+item.hot+'</span>' ;
//     str+='<span>'+item.time+'</span>';
//     str+= '</li>';
// }
// var oUl=document.getElementById('product');
// oUl.innerHTML=str;


//避免直接操作dom元素,用自定义的属性方式来代替
//如何通过a标签的索引知道获取那个自定义属性的值
//索引->自定义属性名->自定义属性的值





// function change(n){
//     ary.sort(function (a,b){
//         var aSpan=a.getElementsByTagName('span')[0].innerHTML.substr(1);
//         var BSpan=b.getElementsByTagName('span')[0].innerHTML.substr(1);
//         return aSpan-BSpan
//     })
// }
// var str=``;
// for (var i = 0; i < data.length; i++) {
//     var item=data[i];
//   str+=`<li >
//             <img src="${item['img']}" alt="">
//             <span>${item['title']}</span>
//             <h3>${item['price']}</h3>
//             <span>${item['hot']}</span>
//             <span>${item['time']}</span>
//         </li>`
// }
