require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var searchlabel = $(".searchlabel");
    var $sampleTable = $('#sampleTable');
    var $visaPagination = $("#visaPagination");
    var $searchCont = $("#searchCont");
    //按钮组集合
    var lookButton = '<button class="btn btn-info" type="button" data-operate="look">查看详情</button>';
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
            utils.ajaxSubmit(apis.pkBuyGroup.getById,{id:id},function(data){
                var initialData = {
                    dataArr:data
                };
                utils.renderModal('查看详情', template('lookModal', initialData), '', 'md');
            })
        },
        createGroup:function($this){
            utils.renderModal('开团', template('createGroup',''), function(){
                if($("#createGroupForm").valid()){
                    utils.ajaxSubmit(apis.pkBuyGroup.createGroup,$("#createGroupForm").serialize(),function(data){
                        hound.success("开团成功","",1000);
                        utils.modal.modal('hide');
                        loadData();
                    })
                }
            }, 'lg');
        }
    };

    var param = {
        pageNo: 1,
        pageSize:10,
        title:'',
        userId:''
    };

    function loadData() {
        utils.ajaxSubmit(apis.pkBuyOrder.getLists, param, function (data) {
            $.each(data.dataArr,function(i,n){
                n.typeText = consts.status.groupType[n.type];
                n.materialButtonGroup = lookButton ;
            });
            data.typeText = listDropDown.typeText;
            data.rankText = listDropDown.rankText;
            $sampleTable.html(template('visaListItem', data));
            utils.bindPagination($visaPagination, param, loadData);
            $visaPagination.html(utils.pagination(parseInt(data.cnt), param.pageNo));
        });
    }
    //首次加载数据
    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var id = decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
    var urlParam = id.split("=");
    if(urlParam[0].indexOf("html")=='-1'){
        param.id = urlParam[0];
    }else{
        param.id = '';
    }
    loadData();

    utils.bindList($(document), operates);
    var listDropDown = {
        typeText:'团主类型',
        rankText:'当前排名'
    };
    $sampleTable.on('click', '#dropTypeOptions a[data-id]', function () {
        param.type = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.typeText = "团主类型" : listDropDown.typeText = $(this).text();
        param.pageNo = 1;
        loadData();
    }).on('click', '#dropRankOptions a[data-id]', function () {
        param.orderByRank = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.rankText = "当前排名" : listDropDown.rankText = $(this).text();
        param.pageNo = 1;
        loadData();
    });
    $("#search").on("click",function(){
        param.pageNo = 1;
        var selectSearchLabel = $("#selectsearchlabel").text();
        if(selectSearchLabel=="商品标题"){
            param.title = $("#searchCont").val();
            param.userId = '';
            loadData();
        }else if(selectSearchLabel=="购买人ID") {
            param.userId = $("#searchCont").val();
            param.title = '';
            loadData();
        }
    });
    $('#searchCont').on('keypress',function(event){
        if (event.keyCode == 13) {
            $('#search').click();
        }
    });
});