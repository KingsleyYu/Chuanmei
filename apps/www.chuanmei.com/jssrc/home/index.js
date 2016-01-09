/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：传美
 2. 页面名称：index(首页)
 3. 作者：KingsleyYu
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function IndexController() {
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     继承于Controller基类
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    Controller.call(this);


    this.initDropdown();

    this.initDatePicker();

    this.showCustomCondsPopup();

    this.showMoreConds();

    this.showProductDetail();

    this.initDataPanel();

    // 条件组点击事件
    this.optionsChange();

    this.switchCategory();

    this.showMenu();

};

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
IndexController.prototype.initDropdown = function() {
    $(".dropdown-menu li a").on('click', function(event) {
        var _this = $(this);

        //对于长度大于6的需要截断显示省略号

        if (_this.html().length > 9) {
            var str = _this.html().substring(0, 9);
            _this.parent().parent().siblings('.btn').find('span:first').html(str + "...");

        } else {
            _this.parent().parent().siblings('.btn').find('span:first').html(_this.html());
        }


        //对于宝贝名称点击事件的特殊处理
        if (_this.data('type') === 'gift') {
            if (_this.data('value') == '1') {
                $(".filter-panel").find(".conds-item-bbmc input").show().css("width", "119px");
            } else {
                $(".filter-panel").find(".conds-item-bbmc input:first").show().css("width", "255px");
                $(".filter-panel").find(".conds-item-bbmc input:last").hide();
            }
        }
    });

    //对于省市下拉框的特殊处理

    $("#drpArea").on('hide.bs.dropdown', function() {
        var _this = $(this);

        _this.find("ul li a").each(function(index, el) {
            if ($(el).html().length > 15) {
                _this.find("ul").css({
                    "margin-left": _this.find("button").width() - _this.find("ul").width() + 20
                });

                return;
            }
        });
    })
};

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
IndexController.prototype.initDatePicker = function() {
    $('#starttime').datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        language: "zh-CN"
    }).on('changeDate', function(ev) {
        var starttime = ev.date.valueOf();
    });

    $('#endtime').datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        language: "zh-CN"
    }).on('changeDate', function(ev) {
        var starttime = ev.date.valueOf();
        alert(starttime);
    });
};

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
IndexController.prototype.showCustomCondsPopup = function() {
    var classSelf = this;

    $("#btnCustomConds").on('click', function() {
        $('.customConds-modal').modal('show');
    });
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
点击切换显示除搜索条件之外的筛选条件
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
IndexController.prototype.showMoreConds = function() {
    $("#btnShowMoreConds").on('click', function() {
        var _this = $(this);

        if (_this.hasClass('xia')) {
            _this.find("i").removeClass('icon-xiangxia2').addClass('icon-xiangshang3');
            _this.removeClass('xia').addClass('shang');
            $('.filter-panel>div').show(100);
        } else {
            _this.find("i").removeClass('icon-xiangshang3').addClass('icon-xiangxia2');
            _this.removeClass('shang').addClass('xia');
            $('.filter-panel>div').each(function(index, el) {
                if (!$(el).hasClass('conds')) {
                    $(el).hide(100);
                }
            });
        }
    });
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
显示产品详情
 -------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------*/
IndexController.prototype.showProductDetail = function() {
    $(".data-panel .btnShowDetail").on('click', function() {
        var _this = $(this);
        var index = _this.data('index');
        var $row = $($(".data-panel .row").get(index - 1));
        if (_this.html() === "收起") {
            $row.find("div.detail").hide(100);
            $row.find('div.image-list').show(100);
            _this.html('详情');
        } else {
            $row.find("div.detail").show(100);
            $row.find('div.image-list').hide(100);
            _this.html('收起');
        }

        return false;
    })
}

IndexController.prototype.initDataPanel = function() {
    $('.data-panel .row').on('click', function() {
        var _this = $(this);
        var $chb = _this.find('table').find('input:checkbox');
        if ($chb.prop('checked')) {
            $chb.removeAttr('checked');
            _this.removeClass('selected');
        } else {
            $chb.prop('checked', true);
            _this.addClass('selected');
        }

        $("#lblSelectedCount").html($('.data-panel .row.selected').size());
        if ($('.data-panel .row').size() == $('.data-panel .row.selected').size()) {
            $("#chbAll").prop("checked", true);
            $("#fixbar-chbAll").prop("checked", true);
        } else {
            $("#chbAll").removeAttr('checked');
            $("#fixbar-chbAll").removeAttr('checked');
        }
    });

    $("#chbAll,#fixbar-chbAll").on('click', function() {
        var _this = $(this);
        if (!_this.prop('checked')) {
            $('.data-panel .row').find('table').find('input:checkbox').removeAttr('checked');
            $('.data-panel .row').removeClass('selected');
            $("#chbAll").removeAttr('checked');
            $("#fixbar-chbAll").removeAttr('checked');
        } else {
            $('.data-panel .row').find('table').find('input:checkbox').prop('checked', true);
            $('.data-panel .row').addClass('selected');
            $("#chbAll").prop("checked", true);
            $("#fixbar-chbAll").prop("checked", true);
        }
        $("#lblSelectedCount").html($('.data-panel .row.selected').size());
    });

    $(".data-panel table").find(".date>.btn-group.dropdown-toggle").on('show.bs.dropdown', function() {

    });

    $(".image-list dt img").on('click', function(e) {
        var _this = $(this);
        var _parent = _this.parent().parent().parent();

        if (_parent.hasClass('selected')) {
            _parent.removeClass('selected');
        } else {
            _parent.addClass('selected');
        }

        return false;
    })

    $(".image-list .overlay").on("click", function() {
        var _this = $(this);
        var _parent = _this.parent().parent();

        if (_parent.hasClass('selected')) {
            _parent.removeClass('selected');
        }
        return false;
    });
}


/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
切换订单类型
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
IndexController.prototype.switchCategory = function() {
    $(".category li").on("click", function() {
        var _this = $(this);
        $(".category li").removeClass('on');
        _this.addClass('on');
    });
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
条件组点击事件
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
IndexController.prototype.optionsChange = function() {
    $(".filter-item .btn-group").find("a").on('click', function() {
        var _this = $(this);

        if (_this.hasClass('filter-item-all')) {

            if (!_this.hasClass('on')) {
                _this.parent().parent().find('.btn-group a').removeClass('on');
                _this.addClass('on');
            }
        } else {
            if (_this.hasClass('on')) {
                _this.removeClass('on');
            } else {
                _this.addClass('on');
            }

            //判断是否全部按钮选中
            if (_this.parent().parent().find('.btn-group a').length === _this.parent().parent().find('.btn-group a.on').length + 1) {
                _this.parent().parent().find('.btn-group a').removeClass('on');
                _this.parent().parent().find('.btn-group').removeClass('active');
                _this.parent().parent().find('.btn-group a.filter-item-all').addClass('btn-primary').addClass('on');
            } else {
                _this.parent().parent().find('.btn-group a.filter-item-all').removeClass('btn-primary').removeClass('on');
            }
        }

    });

    $(".btn-group,.input-group-btn").on("click", function() {
        var _this = $(this);

        if (_this.hasClass('open')) {
            _this.removeClass('open');
        } else {
            _this.addClass('open');
        }
    });
}


/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
鼠标hover显示子菜单
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
IndexController.prototype.showMenu = function() {
    $(".header .nav-bar li").hover(function() {
        $(this).find(".btn-group").addClass('open');
    }, function() {
        $(this).find(".btn-group").removeClass('open');
    });
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 类的初始化
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function() {
    new IndexController;

});
