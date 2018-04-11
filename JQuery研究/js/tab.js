~function ($) {
    function pluginTab(options) {
        //=>THIS:当前你想让哪个选项卡实现切换,THIS就是当前选项卡的容器
        var $tabBox = this,
            $tabList = $tabBox.find('.tab>li'),
            $conList = $tabBox.children('.con');

        //=>init parameters
        var _default = {
            initIndex: 0,
            eventType: 'click'
        };
        options && $.each(options, function (key, value) {
            if (options.hasOwnProperty(key)) {
                _default[key] = value;
            }
        });

        //=>show default
        change(_default.initIndex);

        //=>bind event
        $tabList.on(_default.eventType, function () {
            var $this = $(this),
                index = $this.index();
            change(index);
        });

        function change(index) {
            $tabList.eq(index).addClass('select')
                .siblings().removeClass('select');
            $conList.eq(index).addClass('select')
                .siblings().removeClass('select');
        }
    }

    $.fn.extend({
        pluginTab: pluginTab
    });
}(jQuery);

