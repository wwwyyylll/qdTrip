require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var searchlabel = $(".searchlabel");
    var $addModal = $("#addModal");
    var $sampleTable = $('#sampleTable');
    var $visaPagination = $("#visaPagination");
    var $searchCont = $("#searchCont");
    //按钮组集合
    var comButtons =
            '<button class="btn btn-primary" type="button" data-operate="edit">编辑</button>'+
            '<button class="btn btn-info" type="button" data-operate="look">查看</button>',
        passBouutn =  '<button class="btn btn-primary" type="button" data-operate="pass">审核通过</button>',
        noPassButton = '<button class="btn btn-danger" type="button" data-operate="noPass">审核不通过</button>',
        usedButton = '<button class="btn btn-success" type="button" data-operate="used">收录</button>',
        editButton = '<button class="btn btn-primary" type="button" data-operate="editCnt">更改投票数</button>';

    searchlabel.on("click",function(){
        $("#selectsearchlabel").text($(this).text());
        $("#searchCont").val("");
        $("#searchCont").attr("data-id",'');
    })

    //新增分类
    $addModal.on("click",function(){
        var initialData = {
            dataArr:{}
        };
        utils.renderModal('新增分类', template('modalDiv',initialData), function(){
            if($("#visaPassportForm").valid()){
                utils.ajaxSubmit(apis.expectAnchorVote.create,$("#visaPassportForm").serialize(),function(data){
                    hound.success("添加成功","",1000);
                    utils.modal.modal('hide');
                    param.pageNo = 1;
                    loadData();
                })
            }
        }, 'lg');
    })

    //页面操作配置
    var operates = {
        //编辑
        editCnt:function($this){
            var id = $this.closest("tr").attr("data-id");
            utils.ajaxSubmit(apis.expectAnchorVote.getById, {id: id}, function (data) {
                var getByIdData = {
                    dataArr:data
                };
                utils.renderModal('编辑投票数', template('modalDiv', getByIdData), function(){
                    if($("#visaPassportForm").valid()) {
                        utils.ajaxSubmit(apis.expectAnchorVote.updCntById, $("#visaPassportForm").serialize(), function (data) {
                            hound.success("编辑成功", "", 1000);
                            utils.modal.modal('hide');
                            loadData();
                        })
                    }
                }, 'md');
            });
        },
        //查看
        look:function($this){
            var id = $this.closest("tr").attr("data-id");
            utils.ajaxSubmit(apis.expectAnchorVote.getById, {id: id}, function (data) {
                var getByIdData = {
                    dataArr:data
                };
                utils.renderModal('查看淘宝分类', template('modalDiv', getByIdData),'', 'md');
                $("#visaPassportForm").append($("fieldset").prop('disabled', true));
            });
        },
        //无效
        setOff:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认无效吗?', '', function () {
                utils.ajaxSubmit(apis.expectAnchorVote.offById, {id: id}, function (data) {
                    loadData();
                });
            });
        },
        //有效
        setOn:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认有效吗?', '', function () {
                utils.ajaxSubmit(apis.expectAnchorVote.onById, {id: id}, function (data) {
                    loadData();
                });
            });
        },
        pass:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认审核通过吗?', '', function () {
                utils.ajaxSubmit(apis.expectAnchorVote.passById, {id: id}, function (data) {
                    loadData();
                });
            });
        },
        noPass:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认审核不通过吗?', '', function () {
                utils.ajaxSubmit(apis.expectAnchorVote.noPassById, {id: id}, function (data) {
                    loadData();
                });
            });
        },
        used:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认收录吗?', '', function () {
                utils.ajaxSubmit(apis.expectAnchorVote.usedById, {id: id}, function (data) {
                    loadData();
                });
            });
        }
    }

    var param = {
        pageNo: 1,
        pageSize:10,
        status:'',
        name:'',
        orderByCnt:''
    };

    function loadData() {
        utils.ajaxSubmit(apis.expectAnchorVote.getLists, param, function (data) {
            $.each(data.dataArr,function(i,n){
                n.statusText = consts.status.expectAnchorVote[n.status];
                if(n.status==1){
                    n.materialButtonGroup = passBouutn + noPassButton ;
                }else if(n.status==2){
                    n.materialButtonGroup = usedButton + editButton ;
                }else if(n.status==3){
                    n.materialButtonGroup = "<span style='color:orangered'>------</span>" ;
                }else{
                    n.materialButtonGroup = editButton;
                }
            });
            data.statusText = listDropDown.statusText;
            data.orderByCntText = listDropDown.orderByCntText;
            $sampleTable.html(template('visaListItem', data));
            utils.bindPagination($visaPagination, param, loadData);
            $visaPagination.html(utils.pagination(parseInt(data.cnt), param.pageNo));
        });
    }
    // 页面首次加载列表数据
    loadData();
    utils.bindList($(document), operates);
    var listDropDown = {
        statusText:'状态',
        orderByCntText:'投票数'
    };
    $sampleTable.on('click', '#dropStatusOptions a[data-id]', function () {
        param.status = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.statusText = "状态" : listDropDown.statusText = $(this).text();
        param.pageNo = 1;
        loadData();
    }).on('click', '#dropSortOptions a[data-id]', function () {
        param.orderByCnt = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.orderByCntText = "排序" : listDropDown.orderByCntText = $(this).text();
        param.pageNo = 1;
        loadData();
    });
    $("#search").on("click",function(){
        param.pageNo = 1;
        param.name = $("#searchCont").val();
        loadData();
    });
    $('#searchCont').on('keypress',function(event){
        if (event.keyCode == 13) {
            $('#search').click();
        }
    });
});