require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var searchlabel = $(".searchlabel");
    var $sampleTable = $('#sampleTable');
    var $visaPagination = $("#visaPagination");
    //按钮组集合
    var lookButton = '<button class="btn btn-info" type="button" data-operate="look">查看详情</button>',
        saveChangeCodeButton =  '<button class="btn btn-success" type="button" data-operate="saveChangeCode">填写兑换码</button>',
        refundButton = '<button class="btn btn-danger" type="button" data-operate="refund">退款</button>';

    searchlabel.on("click",function(){
        $("#selectsearchlabel").text($(this).text());
        $("#searchCont").val("");
        $("#searchCont").attr("data-id",'');
    });

    //页面操作配置
    var operates = {
        //查看
        look:function($this){
            var id = $this.closest("tr").attr("data-id");
            utils.ajaxSubmit(apis.meituanCashCouponOrder.getById, {id: id}, function (data) {
                var data = {
                    dataArr:data
                };
                utils.renderModal('查看——'+ data.dataArr.title, template('modalDiv', data),'', 'lg');
                $("#visaPassportForm").append($("fieldset").prop('disabled', true));
            });
        },
        //填写兑换码
        saveChangeCode:function($this){
            var id = $this.closest("tr").attr("data-id");
            var getData = {dataArr:{id:id}};
            utils.renderModal('填写兑换码', template('exchangeModal', getData), function(){
                if($("#exchangeForm").valid()) {
                    hound.confirm('确认兑换吗?', '', function () {
                        utils.loading(true);
                        utils.ajaxSubmit(apis.meituanCashCouponOrder.saveExchangeCodeById, $("#exchangeForm").serialize(), function (data) {
                            utils.loading(false);
                            hound.success("兑换成功", "", 1000);
                            utils.modal.modal('hide');
                            loadData();
                        });
                    });
                }
            }, 'md');
        },
        //退款
        refund:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.reason('确认退款吗?','请输入退款原因',function(data){
                utils.loading(true);
                utils.ajaxSubmit(apis.meituanCashCouponOrder.refundById, {id: id,reason:data}, function (data) {
                    utils.loading(false);
                    hound.success("操作成功", "", 1000);
                    loadData();
                });
            })
        }
    };

    var listDropDown = {
        statusText:'状态'
    };

    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var id = decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
    var urlParam = id.split("=");
    var warnValue = '';
    if(urlParam[0]==1){
        warnValue = 1;
        listDropDown.statusText = "已支付";
    }else{
        warnValue = '';
        listDropDown.statusText = "状态";
    }

    var param = {
        pageNo: 1,
        pageSize:10,
        status:warnValue,
        userId:'',
        orderNo:''
    };

    function loadData() {
        utils.ajaxSubmit(apis.meituanCashCouponOrder.getLists, param, function (data) {
            //根据状态值显示对应的状态文字
            $.each(data.dataArr,function(i,n){
                n.statusText = consts.status.meituanCashCouponOrderStatus[n.status];
                (n.status=="1")? n.materialButtonGroup = lookButton + saveChangeCodeButton + refundButton : n.materialButtonGroup = lookButton;
            });
            data.statusText = listDropDown.statusText;
            $sampleTable.html(template('visaListItem', data));
            utils.bindPagination($visaPagination, param, loadData);
            $visaPagination.html(utils.pagination(parseInt(data.cnt), param.pageNo));
        });
    }
    // 页面首次加载列表数据
    loadData();
    utils.bindList($(document), operates);
    $sampleTable.on('click', '#dropStatusOptions a[data-id]', function () {
        param.status = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.statusText = "状态" : listDropDown.statusText = $(this).text();
        loadData();
    });
    $("#search").on("click",function(){
        param.pageNo = 1;
        //判断是什么条件搜索
        var selectSearchLabel = $("#selectsearchlabel").text();
        if(selectSearchLabel=="订单号"){
            param.orderNo = $("#searchCont").val();
            param.userId = '';
            loadData();
        }else if(selectSearchLabel=="会员ID"){
            param.userId = $("#searchCont").val();
            param.orderNo = '';
            loadData();
        }
    });
    $('#searchCont').on('keypress',function(event){
        if (event.keyCode == 13) {
            $('#search').click();
        }
    });
});