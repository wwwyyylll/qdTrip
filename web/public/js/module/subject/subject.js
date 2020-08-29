require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var searchlabel = $(".searchlabel");
    var $sampleTable = $('#sampleTable');
    var $visaPagination = $("#visaPagination");
    var $searchCont = $("#searchCont");
    //按钮组集合
    var comButtons =
            '<button class="btn btn-primary" type="button" data-operate="edit">编辑</button>'+
            '<button class="btn btn-info" type="button" data-operate="look">查看</button>',
        startBouutn =  '<button class="btn btn-primary" type="button" data-operate="setOn">上架</button>',
        stopButton = '<button class="btn btn-danger" type="button" data-operate="setOff">下架</button>';

    searchlabel.on("click",function(){
        $("#selectsearchlabel").text($(this).text());
        $("#searchCont").val("");
        $("#searchCont").attr("data-id",'');
    });

    //页面操作配置
    var operates = {
        add:function(){
            window.location.href = "@@HOSTview/subject/add.html";
        },
        //编辑
        edit:function($this){
            var id = $this.closest("tr").attr("data-id");
            window.location.href = "@@HOSTview/subject/edit.html?id=" + id;
        },
        //查看
        look:function($this){
            var id = $this.closest("tr").attr("data-id");
            window.location.href = "@@HOSTview/subject/look.html?id=" + id;
        },
        //无效
        setOff:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认下架吗?', '', function () {
                utils.ajaxSubmit(apis.subject.offById, {id: id}, function (data) {
                    loadData();
                });
            });
        },
        //有效
        setOn:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认上架吗?', '', function () {
                utils.ajaxSubmit(apis.subject.onById, {id: id}, function (data) {
                    loadData();
                });
            });
        }
    };

    var param = {
        pageNo: 1,
        pageSize:10,
        title:'',
        status:''
    };

    function loadData() {
        utils.ajaxSubmit(apis.subject.getLists, param, function (data) {
            $.each(data.dataArr,function(i,n){
                n.statusText = consts.status.ordinary[n.status];
                (n.status=="1")? n.materialButtonGroup = comButtons + stopButton : n.materialButtonGroup = comButtons + startBouutn;
            })
            data.statusText = listDropDown.statusText;
            $sampleTable.html(template('visaListItem', data));
            utils.bindPagination($visaPagination, param, loadData);
            $visaPagination.html(utils.pagination(parseInt(data.cnt), param.pageNo));
        });
    }
    // 页面首次加载列表数据
    loadData();
    utils.bindList($(document), operates);
    var listDropDown = {
        statusText:'状态'
    };
    $sampleTable.on('click', '#dropStatusOptions a[data-id]', function () {
        param.status = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.statusText = "状态" : listDropDown.statusText = $(this).text();
        loadData();
    });
    $("#search").on("click",function(){
        param.pageNo = 1;
        param.title = $("#searchCont").val();
        loadData();
    });
    $('#searchCont').on('keypress',function(event){
        if (event.keyCode == 13) {
            $('#search').click();
        }
    });
});