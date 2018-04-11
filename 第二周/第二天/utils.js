var utils=(function (){
    //类数组转换为数组
    function toArray(likeAry){
        var ary=[];
        try{
           ary=[].slice.call(likeAry,0)
        }catch(e){
            for (var i = 0; i < likeAry.length; i++) {
                ary[i]=likeAry[i];
            }
        }
        return ary;
    }

    function toJSON(jsonStr){
          return 'JSON' in window?JSON.parse(jsonStr):eval("("+jsonStr+")");
    }

    return{
        toArray:toArray,
        toJSON:toJSON
    }
})();