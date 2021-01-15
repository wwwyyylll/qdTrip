require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var getByIdData = {};
    //页面操作配置
    var operates = {
        //查看
        look:function(id){
            utils.ajaxSubmit(apis.meituanOrder.getById, {id: id}, function (data) {
                getByIdData = {
                    dataArr:data
                };
                getByIdData.dataArr.typeText = consts.status.meituanOrderType[getByIdData.dataArr.type];
                getByIdData.dataArr.statusText = consts.status.meituanOrderStatus[getByIdData.dataArr.status];
                getByIdData.dataArr.meituanStatusText = consts.status.meituanOrderMeituanStatus[getByIdData.dataArr.meituanStatus];
                $("#basicMessage").html(template('orderMessage', getByIdData));
                $("#basicMessage").find("input").prop('disabled', true);
            });
        }
    };
    // 页面首次加载列表数据
    //打开的对应的页面nav + active属性
    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var id = decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
    var param = id.split("=");

    utils.bindList($(document), operates);
    operates.look(param[0]);
});