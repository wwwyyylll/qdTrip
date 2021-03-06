require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var getByIdData = {};
    var initialData = {
        expressArr:{}
    };
    //页面操作配置
    var operates = {
        //维权退款
        activistRefund:function($this){
            var id = $("#orderId").val();
            hound.confirm('确认维权退款吗?', '', function () {
                utils.ajaxSubmit(apis.taobaoOrder.refundById, {id: id}, function (data) {
                    operates.look(param[0]);
                });
            });
        },
        //无效
        valid:function($this){
            var id = $("#orderId").val();
            hound.confirm('确认订单无效吗?', '', function () {
                utils.ajaxSubmit(apis.taobaoOrder.validById, {id: id}, function (data) {
                    operates.look(param[0]);
                });
            });
        },
        //完成
        complete:function(){
            var id = $("#orderId").val();
            hound.confirm('确认完成订单吗?', '', function () {
                utils.ajaxSubmit(apis.mallOrder.completedById, {id: id}, function (data) {
                    operates.look(param[0]);
                });
            });
        },
        //退款申请
        refund:function($this){
            var id = $("#orderId").val();
            var orderNo = $("input[name=orderNo]").val();
            var amount = $("input[name=actualTotalAmount]").val();
            var num = $("input[name=num]").val();
            var initialData = {
                dataArr:{
                    id:id,
                    orderNo:orderNo,
                    amount:amount,
                    reason:'',
                    num:num
                }
            };
            utils.renderModal('申请退款', template('refundModal', initialData), function(){
                if($("#refundForm").valid()) {
                    utils.ajaxSubmit(apis.mallOrderRefundRequest.create, $("#refundForm").serialize(), function (data) {
                        hound.success("申请退款成功", "", 1000);
                        utils.modal.modal('hide');
                        operates.look(param[0]);
                    })
                }
            }, 'md');
        },
        //发货
        deliver:function(){
            var id = $("#orderId").val();
            var orderNo = $("input[name=orderNo]").val();
            var initialData = {
                dataArr:{
                    id:id,
                    orderNo:orderNo,
                    expressCompany:'',
                    expressNo:''
                }
            };
            utils.renderModal('发货', template('deliverModal', initialData), function(){
                if($("#deliverForm").valid()) {
                    utils.ajaxSubmit(apis.mallOrder.deliveredById, $("#deliverForm").serialize(), function (data) {
                        hound.success("发货成功", "", 1000);
                        utils.modal.modal('hide');
                        operates.look(param[0]);
                    })
                }
            }, 'md');
        },
        //接单
        submitSupplier:function($this){
            var id = $("#orderId").val();
            var initialData = {
                dataArr:{
                    id:id,
                    amount:''
                }
            };
            utils.renderModal('接单', template('submitSupplierModal', initialData), function(){
                if($("#submitSupplierForm").valid()) {
                    utils.ajaxSubmit(apis.mallOrder.submitSupplierById, $("#submitSupplierForm").serialize(), function (data) {
                        hound.success("接单成功", "", 1000);
                        utils.modal.modal('hide');
                        operates.look(param[0]);
                    })
                }
            }, 'md');
        },
        supplier:function($this){
            var id = $("#orderId").val();
            var totalAmount = $("input[name=totalAmount]").val();
            var actualTotalAmount = $("input[name=actualTotalAmount]").val();
            var num = $("input[name=num]").val();
            var goodsAmount = $("input[name=goodsAmount]").val();
            var expressFee = $("input[name=expressFee]").val();
            var deductionPrice = $("input[name=deductionPrice]").val();
            var initialData = {
                dataArr:{
                    id:id,
                    totalAmount:totalAmount,
                    actualTotalAmount:actualTotalAmount,
                    num:num,
                    goodsAmount:goodsAmount,
                    expressFee:expressFee,
                    deductionPrice:deductionPrice
                }
            };
            utils.renderModal('供应商接单', template('supplierModal', initialData), function(){
                if($("#supplierForm").valid()) {
                    utils.ajaxSubmit(apis.mallOrder.submitSupplierById, $("#supplierForm").serialize(), function (data) {
                        hound.success("操作成功", "", 1000);
                        utils.modal.modal('hide');
                        operates.look(param[0]);
                    })
                }
            }, 'md');
            $("select[name=isAccept]").on("change",function(){
                if($(this).val()==1){
                    $(".amountDiv").show();
                    $(".reasonDiv").hide();
                    $(".amount").attr("required","required");
                    $(".amount").attr("name","amount");
                    $(".reason").removeAttr("required");
                    $(".reason").removeAttr("name");
                }else{
                    $(".amountDiv").hide();
                    $(".reasonDiv").show();
                    $(".reason").attr("required","required");
                    $(".reason").attr("name","reason");
                    $(".amount").removeAttr("required");
                    $(".amount").removeAttr("name");
                }
            })
        },
        //查看
        look:function(id){
            utils.ajaxSubmit(apis.pddOrder.getById, {id: id}, function (data) {
                getByIdData = {
                    dataArr:data,
                    expressArr:initialData.expressArr
                };
                getByIdData.dataArr.statusText = consts.status.pddStatus[getByIdData.dataArr.status];
                getByIdData.dataArr.isSettlementText = consts.status.orderSettlementStatus[getByIdData.dataArr.isSettlement];
                $("#basicMessage").html(template('orderMessage', getByIdData));
                $("#basicMessage").find("input").prop('disabled', true);
                //$("#tabContent").html(template('goodsMessage', getByIdData));
                //$("#tabContent").find("input").prop('disabled', true);
            });
        },
        user:function(){
            $("#tabContent").html(template('userMessage', getByIdData));
            $("#tabContent").find("input").prop('disabled', true);
        },
        log:function(){
            $.each(getByIdData.dataArr.logArr,function(i,n){
                n.sourceText = consts.status.orderLogStatus[n.source];
                n.userTypeText = consts.status.userType[n.userType];
            });
            $("#tabContent").html(template('logList', getByIdData));
        },
        logistics:function(){
            $("#tabContent").html(template('logisticsList', getByIdData));
        }
    }
    // 页面首次加载列表数据
    //打开的对应的页面nav + active属性
    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var id = decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
    var param = id.split("=");

    utils.bindList($(document), operates);
    function getConstsLists(){
        var expressParam = {
            pageNo: 1,
            pageSize:10000,
            title:'',
            status:''
        };
        utils.ajaxSubmit(apis.mallExpressFee.getLists, expressParam, function (data) {
            initialData.expressArr = data.dataArr;
        });
    }
    getConstsLists();
    //setTimeout(function(){
        operates.look(param[0]);
    //},500);
    $("#headerTab1").on("click",function(){
        operates.look(param[0]);
        $(this).css({color:"orange"});
        $("#headerTab2").css({color:"#555555"});
        $("#headerTab3").css({color:"#555555"});
        $("#headerTab4").css({color:"#555555"});
    });
    $("#headerTab2").on("click",function(){
        operates.user();
        $(this).css({color:"orange"});
        $("#headerTab1").css({color:"#555555"});
        $("#headerTab3").css({color:"#555555"});
        $("#headerTab4").css({color:"#555555"});
    });
    $("#headerTab3").on("click",function(){
        operates.log();
        $(this).css({color:"orange"});
        $("#headerTab1").css({color:"#555555"});
        $("#headerTab2").css({color:"#555555"});
        $("#headerTab4").css({color:"#555555"});
    });
    $("#headerTab4").on("click",function(){
        operates.logistics();
        $(this).css({color:"orange"});
        $("#headerTab1").css({color:"#555555"});
        $("#headerTab2").css({color:"#555555"});
        $("#headerTab3").css({color:"#555555"});
    })
});