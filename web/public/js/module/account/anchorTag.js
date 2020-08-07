require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var searchlabel = $(".searchlabel");
    var $addModal = $("#addModal");
    var $sampleTable = $('#sampleTable');
    var $visaPagination = $("#visaPagination");
    //按钮组集合
    var comButtons =
            '<button class="btn btn-primary" type="button" data-operate="edit">编辑</button>'+
            '<button class="btn btn-info" type="button" data-operate="look">查看</button>',
        startBouutn =  '<button class="btn btn-primary" type="button" data-operate="setOn">有效</button>',
        stopButton = '<button class="btn btn-danger" type="button" data-operate="setOff">无效</button>';

    searchlabel.on("click",function(){
        $("#selectsearchlabel").text($(this).text());
        $("#searchCont").val("");
        $("#searchCont").attr("data-id",'');
    });

    function typeChange(){
        $("select[name=type]").change(function(){
            if($(this).val()==1){
                $("input[name=color1]").attr("required","required");
                $("input[name=color2]").attr("required","required");
            }else{
                $("input[name=color1]").removeAttr("required");
                $("input[name=color2]").removeAttr("required");
            }
        })
    }

    //新增
    $addModal.on("click",function(){
        var initialData = {
            dataArr:{}
        };
        utils.renderModal('新增主播标签', template('modalDiv',initialData), function(){
            if($("#visaPassportForm").valid()){
                utils.ajaxSubmit(apis.tag.create,$("#visaPassportForm").serialize(),function(data){
                    hound.success("添加成功","",1000);
                    utils.modal.modal('hide');
                    param.pageNo = 1;
                    loadData();
                })
            }
        }, 'lg');
        typeChange();
    })

    //页面操作配置
    var operates = {
        //编辑
        edit:function($this){
            var id = $this.closest("tr").attr("data-id");
            utils.ajaxSubmit(apis.tag.getById, {id: id}, function (data) {
                var getByIdData = {
                    dataArr:data,
                };
                utils.renderModal('编辑主播标签', template('modalDiv', getByIdData), function(){
                    if($("#visaPassportForm").valid()) {
                        utils.ajaxSubmit(apis.tag.updateById, $("#visaPassportForm").serialize(), function (data) {
                            hound.success("编辑成功", "", 1000);
                            utils.modal.modal('hide');
                            loadData();
                        })
                    }
                }, 'lg');
                typeChange();
            });
        },
        //查看
        look:function($this){
            var id = $this.closest("tr").attr("data-id");
            utils.ajaxSubmit(apis.tag.getById, {id: id}, function (data) {
                var getByIdData = {
                    dataArr:data
                };
                utils.renderModal('查看主播标签', template('modalDiv', getByIdData),'', 'lg');
                $("#visaPassportForm").append($("fieldset").prop('disabled', true));
            });
        },
        //无效
        setOff:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认无效吗?', '', function () {
                utils.ajaxSubmit(apis.tag.offById, {id: id}, function (data) {
                    loadData();
                });
            });
        },
        //有效
        setOn:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认有效吗?', '', function () {
                utils.ajaxSubmit(apis.tag.onById, {id: id}, function (data) {
                    loadData();
                });
            });
        }
    }

    var param = {
        pageNo: 1,
        pageSize:10,
        name:'',
        status:'',
        type:''
    };

    function loadData() {
        utils.ajaxSubmit(apis.tag.getLists, param, function (data) {
            //根据状态值显示对应的状态文字 + 显示对应的 允许登录/禁止登录 按钮
            $.each(data.dataArr,function(i,n){
                n.statusText = consts.status.ordinary[n.status];
                n.typeText = consts.status.anchorType[n.type];
                (n.status=="1")? n.materialButtonGroup = comButtons + stopButton : n.materialButtonGroup = comButtons + startBouutn;
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
    //列表筛选事件绑定
    var listDropDown = {
        statusText:'状态',
        typeText:'类型'
    };
    $sampleTable.on('click', '#dropStatusOptions a[data-id]', function () {
        param.status = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.statusText = "状态" : listDropDown.statusText = $(this).text();
        param.pageNo = 1;
        loadData();
    }).on('click', '#dropTypeOptions a[data-id]', function () {
        param.type = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.typeText = "类型" : listDropDown.typeText = $(this).text();
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