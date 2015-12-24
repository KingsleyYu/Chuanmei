/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 插件名称：methodizetable
 2. 插件描述：tag形式的复选框
 3. 版本：1.0
 4.  对其他插件的依赖：无
 5. 作者：zhaohuagang@guanaihui.com
 6. 未尽事宜：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
(function($) {
    $.fn.methodizetable = function(options) {
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        methodizetable加上对应的配置属性
         -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        var opts = $.extend({}, $.fn.methodizetable.defaults, options);
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
         执行事件添加后返回
         -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        return this.each(function() {
            var table = this ;
            /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            首先在thead中的句柄后面增加一个隐藏域，用来保存选中的句柄的值的集合
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
            $(table).find("thead input[name='" + opts.handleName + "']").after($(document.createElement("INPUT")).attr("name", opts.dataSaveHiddenName).attr("type", "hidden")) ;
            /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            thead里面句柄的事件绑定
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
            $(this).find("thead input[name='" + opts.handleName + "']").click(function(){
                var handle = this ;                
                $(table).find("tbody tr").each(function(){
                    $.fn.methodizetable.switchRowCheckedStatus(this, $(handle).is(":checked"), opts) ;
                }) ;
                $.fn.methodizetable.union(table, opts) ;
            }) ;
            /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            tbody里面句柄的事件绑定
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
            $(this).find("tbody tr").each(function(){
                var row = this ;
                $(this).find("input[name='" + opts.handleName + "']").click(function(){
                    $.fn.methodizetable.switchRowCheckedStatus(row, $(this).is(":checked"), opts) ;
                    $(table).find("thead input[name='" + opts.handleName + "']")[0].checked = $(table).find("tbody input[name='" + opts.handleName + "']").size() === $(table).find("tbody input[name='" + opts.handleName + "']:checked").size() ;
                    $.fn.methodizetable.union(table, opts) ;
                }) ;
            }) ;
        });
    } ;
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     选择/取消选择某行，参数：
    @row : 行的dom节点或者jQuery对象
    @status : 选中状态，值为true | false
    @opts : 配置选项
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    $.fn.methodizetable.switchRowCheckedStatus = function(row, status, opts) {
        if($(row).find("input[name='" + opts.handleName + "']").size() === 0) return ;
        if(status) $(row).addClass(opts.activeRowClassName) ;
        else $(row).removeClass(opts.activeRowClassName) ;        
        $(row).find("input[name='" + opts.handleName + "']")[0].checked = status ;    
    } ;
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     将所有选中的行句柄checkbox的值合并到隐藏域，参数：
    @table : 表格的dom节点或者jQuery对象
    @opts : 配置选项
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    $.fn.methodizetable.union = function(table, opts) {
        var valueArray = new Array ;
        $(table).find("tbody input[name='" + opts.handleName + "']").each(function(){
            if($(this).is(":checked")) valueArray.push($(this).attr("value")) ;
        }) ;
        $(table).find("input[name='" + opts.dataSaveHiddenName + "']").val(valueArray.join(opts.separator)) ;
    } ;
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     methodizetable默认配置
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    $.fn.methodizetable.defaults = {       
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        选中的行的class名称
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        activeRowClassName : "on" ,
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        选中的行的checkbox的值的集合的分隔符
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        separator : "," ,
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        用来保存选中的句柄值的集合的隐藏域的name值
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        dataSaveHiddenName : "methodize-table-checked-set" ,
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        句柄checkbox的name值
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        handleName : "row-handle"
    } ;
})(jQuery) ;