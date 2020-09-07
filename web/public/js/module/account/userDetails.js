require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var getByIdData = {};
    //页面操作配置
    var operates = {
        //查看
        look:function(id){
            utils.ajaxSubmit(apis.user.getById, {id: id}, function (data) {
                data.sourceText = consts.status.userDetailSource[data.source];
                getByIdData = {
                    dataArr:data
                };
                $("#basicMessage").html(template('basicList', getByIdData));
                $("#basicMessage").find("input").prop('disabled', true);
                operates.commissionLog();
            });
        },
        commissionLog:function(){
            utils.ajaxSubmit(apis.user.getCommissionLogByUserId, commissionParam, function (data) {
                $.each(data.dataArr,function(i,n){
                    n.contentArr.fansTypeText = consts.status.fansType[n.contentArr.fansType];
                    n.contentArr.typeText = consts.status.buyType[n.type];
                });
                $("#tabContent").html(template('commissionLogList', data));
                utils.bindPagination($("#visaPagination"), commissionParam, operates.commissionLog);
                $("#visaPagination").html(utils.pagination(parseInt(data.cnt), commissionParam.pageNo));
            });
        },
        walletMessage:function(){
            $("#tabContent").html(template('walletMessage', getByIdData.dataArr));
            $("#tabContent").find("input").prop('disabled', true);
        },
        getCashOutRequestLists:function(){
            utils.ajaxSubmit(apis.user.getCashOutRequestLists, cashOutRequestParam, function (data) {
                $.each(data.dataArr,function(i,n){
                    n.statusText = consts.status.userStatus[n.status];
                    n.accountTypeText = consts.status.accountTypeShow[n.accountType];
                });
                $("#tabContent").html(template('cashOutRequestList', data));
                utils.bindPagination($("#visaPagination1"), cashOutRequestParam, operates.getCashOutRequestLists);
                $("#visaPagination1").html(utils.pagination(parseInt(data.cnt), cashOutRequestParam.pageNo));
            });
        },
        accountLists:function(){
            $.each(getByIdData.dataArr.accountArr,function(i,n){
                n.accountTypeText = consts.status.accountType[n.accountType];
            });
            $("#tabContent").html(template('accountList', getByIdData.dataArr));
        },
        certificationMessage:function(){
            $("#tabContent").html(template('certificationMessage', getByIdData.dataArr));
            $("#tabContent").find("input").prop('disabled', true);
        },
        //允许登录
        allow:function($this){
            var id = $("input[name=id]").val();
            hound.reason('确认设为允许登录吗?','请输入允许登录原因',function(data){
                utils.ajaxSubmit(apis.user.allowLoginById, {id: id,reason:data}, function (data) {
                    operates.look(param[0]);
                });
            })
        },
        //禁止登录
        notAllow:function($this){
            var id = $("input[name=id]").val();
            hound.reason('确认设为禁止登录吗?','请输入禁止登录原因',function(data){
                utils.ajaxSubmit(apis.user.disableLoginById, {id: id,reason:data}, function (data) {
                    operates.look(param[0]);
                });
            })
        }
    };

    // 页面首次加载列表数据
    //打开的对应的页面nav + active属性
    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var id = decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
    var param = id.split("=");

    var commissionParam = {
        pageNo: 1,
        pageSize:10,
        userId:param[0]
    };
    var cashOutRequestParam = {
        pageNo: 1,
        pageSize:10,
        userId:param[0]
    };
    operates.look(param[0]);
    $("#headerTab1").on("click",function(){
        operates.commissionLog();
        $(this).css({color:"orange"});
        $(this).closest("li").siblings().find("a").css({color:"#555555"});
    });
    $("#headerTab2").on("click",function(){
        operates.walletMessage();
        $(this).css({color:"orange"});
        $(this).closest("li").siblings().find("a").css({color:"#555555"});
    });
    $("#headerTab3").on("click",function(){
        operates.getCashOutRequestLists();
        $(this).css({color:"orange"});
        $(this).closest("li").siblings().find("a").css({color:"#555555"});
    });
    $("#headerTab4").on("click",function(){
        operates.certificationMessage();
        $(this).css({color:"orange"});
        $(this).closest("li").siblings().find("a").css({color:"#555555"});
    });
    $("#headerTab5").on("click",function(){
        operates.accountLists();
        $(this).css({color:"orange"});
        $(this).closest("li").siblings().find("a").css({color:"#555555"});
    });
    utils.bindList($(document), operates);
});