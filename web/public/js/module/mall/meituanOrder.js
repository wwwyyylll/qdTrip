require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var searchlabel = $(".searchlabel");
    var $sampleTable = $('#sampleTable');
    var $visaPagination = $("#visaPagination");
    var $searchCont = $("#searchCont");
    //按钮组集合
    var lookButton = '<button class="btn btn-info" type="button" data-operate="look">查看</button>';

    searchlabel.on("click",function(){
        $("#selectsearchlabel").text($(this).text());
        $("#searchCont").val("");
        $("#searchCont").attr("data-id",'');
        if($("#selectsearchlabel").text()=="下单时间"){
            $('#searchCont').addClass("dateRange");
            $(document).ready(function() {
                $('.dateRange').daterangepicker(null, function(start, end, label) {
                });
            });
        }else{
            //销毁日期选择器
            if($('#searchCont').hasClass("dateRange")){
                $('#searchCont').removeClass("dateRange");
                $('#searchCont').data("daterangepicker").remove();
            }
        }
    });
    $(document).on("click",function(){
        $('.ability-list').remove();
    });

    //页面操作配置
    var operates = {
        //查看
        look:function($this){
            var id = $this.closest("tr").attr("data-id");
            window.open("@@HOSTview/mall/meituanOrderDetails.html?id=" + id);
        }
    };

    var param = {
        pageNo: 1,
        pageSize:10,
        status:'',
        type:'',
        sid:''
    };

    function loadData() {
        utils.ajaxSubmit(apis.meituanOrder.getLists, param, function (data) {
            $.each(data.dataArr,function(i,n){
                n.typeText = consts.status.meituanOrderType[n.type];
                n.meituanStatusText = consts.status.meituanOrderMeituanStatus[n.meituanStatus];
                n.statusText = consts.status.meituanOrderStatus[n.status];
                n.materialButtonGroup = lookButton ;
            });
            data.statusText = listDropDown.statusText;
            data.typeText = listDropDown.typeText;
            $sampleTable.html(template('visaListItem', data));
            utils.bindPagination($visaPagination, param, loadData);
            $visaPagination.html(utils.pagination(parseInt(data.cnt), param.pageNo));
        });
    }
    // 页面首次加载列表数据
    loadData();

    utils.bindList($(document), operates);
    var listDropDown = {
        statusText:'笔记订单状态',
        typeText:'订单类型'
    };
    $sampleTable.on('click', '#dropStatusOptions a[data-id]', function () {
        param.status = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.statusText = "笔记订单状态" : listDropDown.statusText = $(this).text();
        loadData();
    }).on('click', '#dropTypeOptions a[data-id]', function () {
        param.type = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.typeText = "订单类型" : listDropDown.typeText = $(this).text();
        loadData();
    });
    $("#search").on("click",function(){
        param.pageNo = 1;
        var selectSearchLabel = $("#selectsearchlabel").text();
        if(selectSearchLabel=="媒体推广位"){
            param.sid = $("#searchCont").val();
            loadData();
        }
    });
    $('#searchCont').on('keypress',function(event){
        if (event.keyCode == 13) {
            $('#search').click();
        }
    });
});