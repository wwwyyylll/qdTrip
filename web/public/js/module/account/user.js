require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var searchlabel = $(".searchlabel");
    var $addModal = $("#addModal");
    var $sampleTable = $('#sampleTable');
    var $visaPagination = $("#visaPagination");
    //按钮组集合
    var comButtons = '<button class="btn btn-info" type="button" data-operate="look">查看详情</button>',
        allowButton = '<button class="btn btn-primary" type="button" data-operate="allow">允许登录</button>',
        disableButton = '<button class="btn btn-danger" type="button" data-operate="notAllow">禁止登录</button>',
        addDistButton = '<button class="btn btn-primary" type="button" data-operate="addDist">设为分销商</button>';

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
            window.location.href = "@@HOSTview/account/userDetailsLook.html?id=" + id;
        },
        //允许登录
        allow:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.reason('确认设为允许登录吗?','请输入允许登录原因',function(data){
                utils.ajaxSubmit(apis.user.allowLoginById, {id: id,reason:data}, function (data) {
                    hound.success("操作成功", "", 1000);
                    loadData();
                });
            })
        },
        //禁止登录
        notAllow:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.reason('确认设为禁止登录吗?','请输入禁止登录原因',function(data){
                utils.ajaxSubmit(apis.user.disableLoginById, {id: id,reason:data}, function (data) {
                    hound.success("操作成功", "", 1000);
                    loadData();
                });
            })
        },
        addDist:function($this){
            var userId = $this.closest("tr").attr("data-id");
            var tr = $this.closest("tr");
            var nickName = tr.find("td").eq(1).find("a").text();

            var initialData = {
                dataArr:{
                    userId:userId,
                    nickName:nickName,
                    name:'',
                    adZoneId:'',
                    content:''
                }
            };
            utils.renderModal('设为分销商', template('addDistDiv',initialData), function(){
                if($("#addDistForm").valid()){
                    utils.loading(true);
                    utils.ajaxSubmit(apis.distributors.create,$("#addDistForm").serialize(),function(data){
                        utils.loading(false);
                        hound.success("设置成功","",1000);
                        utils.modal.modal('hide');
                        loadData();
                    })
                }
            }, 'md');
        }
    };

    // 页面首次加载列表数据
    //打开的对应的页面nav + active属性
    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var id = decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
    var urlParam = id.split("=");
    var warnValue = '';
    if(urlParam[0]==1){
        warnValue = urlParam[0];
    }else{
        warnValue = '';
    }

    var param = {
        pageNo: 1,
        pageSize:10,
        status:'',
        isSignUp:'',
        nickName:'',
        memberOperationId:'',
        warn:warnValue
    };

    function loadData() {
        utils.ajaxSubmit(apis.user.getLists, param, function (data) {
            //根据状态值显示对应的状态文字 + 显示对应的 允许登录/禁止登录 按钮
            $.each(data.dataArr,function(i,n){
                n.statusText = consts.status.user[n.status];
                n.isSignUpText = consts.status.isBind[n.isSignUp];
                n.isDistributorsText = consts.status.isBind[n.isDistributors];
                n.sourceText = consts.status.userSource[n.source];
                (n.status=="1")? n.materialButtonGroup = disableButton : n.materialButtonGroup = allowButton  ;
                (n.isDistributors=='1')? n.materialButtonGroup = n.materialButtonGroup : n.materialButtonGroup = n.materialButtonGroup + addDistButton ;
            });
            data.statusText = listDropDown.statusText;
            data.sourceText = listDropDown.sourceText;
            data.signUpText = listDropDown.signUpText;
            $sampleTable.html(template('visaListItem', data));
            utils.bindPagination($visaPagination, param, loadData);
            $visaPagination.html(utils.pagination(parseInt(data.cnt), param.pageNo));
        });
    }
    // 页面首次加载列表数据
    loadData();
    utils.bindList($(document), operates);
    //列表筛选事件绑定
    var listDropDown = {
        statusText:'状态',
        sourceText:'来源',
        signUpText:'已签约'
    };
    $sampleTable.on('click', '#dropStatusOptions a[data-id]', function () {
        param.status = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.statusText = "状态" : listDropDown.statusText = $(this).text();
        param.pageNo = 1;
        loadData();
    }).on('click', '#dropTopOptions a[data-id]', function () {
        param.source = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.sourceText = "来源" : listDropDown.sourceText = $(this).text();
        param.pageNo = 1;
        loadData();
    }).on('click', '#dropSignUpOptions a[data-id]', function () {
        param.isSignUp = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.signUpText = "已签约" : listDropDown.signUpText = $(this).text();
        param.pageNo = 1;
        loadData();
    });
    $("#search").on("click",function(){
        param.pageNo = 1;
        //判断是手机号搜索还是用户昵称搜索
        var selectsearchLabel = $("#selectsearchlabel").text();
        if(selectsearchLabel=="昵称"){
            param.nickName = $("#searchCont").val();
            param.memberOperationId = '';
            loadData();
        }else if(selectsearchLabel=="会员运营Id"){
            param.nickName = '';
            param.memberOperationId = $("#searchCont").val();
            loadData();
        }
    });
    $('#searchCont').on('keypress',function(event){
        if (event.keyCode == 13) {
            $('#search').click();
        }
    });
});