require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var searchlabel = $(".searchlabel");
    var $sampleTable = $('#sampleTable');
    var $visaPagination = $("#visaPagination");
    var $searchCont = $("#searchCont");
    //按钮组集合
    var lookButton = '<button class="btn btn-info" type="button" data-operate="look">帮砍记录</button>';
    searchlabel.on("click",function(){
        $("#selectsearchlabel").text($(this).text());
        $("#searchCont").val("");
        $("#searchCont").attr("data-id",'');
    });

    var joinerParam = {
        pageNo: 1,
        pageSize:10,
        groupId:''
    };

    //页面操作配置
    var operates = {
        //查看
        look:function($this){
            var groupId = $this.closest("tr").attr("data-id");
            joinerParam.groupId = groupId ;
            utils.ajaxSubmit(apis.cutGroup.getJoinerLists, joinerParam, function (data) {
                utils.renderModal('帮砍记录列表', template('joinerList',data), function(){}, 'lg');
                utils.bindPagination($("#cutPagination"), joinerParam, operates.look);
                $("#cutPagination").html(utils.pagination(parseInt(data.cnt), joinerParam.pageNo));
            });
        }
    };

    var param = {
        pageNo: 1,
        pageSize:10,
        title:'',
        status:'',
        userId:'',
        goodsId:''
    };

    function loadData() {
        utils.ajaxSubmit(apis.cutGroup.getLists, param, function (data) {
            $.each(data.dataArr,function(i,n){
                n.statusText = consts.status.ordinary[n.status];
                n.materialButtonGroup = lookButton;
            });
            data.statusText = listDropDown.statusText;
            $sampleTable.html(template('visaListItem', data));
            utils.bindPagination($visaPagination, param, loadData);
            $visaPagination.html(utils.pagination(parseInt(data.cnt), param.pageNo));
        });
    }
    loadData();

    utils.bindList($(document), operates);
    var listDropDown = {
        statusText:'状态'
    };
    $sampleTable.on('click', '#dropStatusOptions a[data-id]', function () {
        param.status = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.statusText = "状态" : listDropDown.statusText = $(this).text();
        param.pageNo = 1;
        loadData();
    });
    $("#search").on("click",function(){
        param.pageNo = 1;
        var selectSearchLabel = $("#selectsearchlabel").text();
        if(selectSearchLabel=="标题"){
            param.title = $("#searchCont").val();
            param.userId = '';
            param.goodsId = '';
            loadData();
        }else if(selectSearchLabel=="会员ID"){
            param.userId = $("#searchCont").val();
            param.title = '';
            param.goodsId = '';
            loadData();
        }else if(selectSearchLabel=="商品ID"){
            param.goodsId = $("#searchCont").val();
            param.title = '';
            param.userId = '';
            loadData();
        }
    });
    $('#searchCont').on('keypress',function(event){
        if (event.keyCode == 13) {
            $('#search').click();
        }
    });
});