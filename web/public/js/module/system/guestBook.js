require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var searchlabel = $(".searchlabel");
    var $sampleTable = $('#sampleTable');
    var $visaPagination = $("#visaPagination");
    //按钮组集合
    var comButtons = '<button class="btn btn-primary" type="button" data-operate="reply">回复</button>';

    searchlabel.on("click",function(){
        $("#selectsearchlabel").text($(this).text());
        $("#searchCont").val("");
        $("#searchCont").attr("data-id",'');
    });

    //页面操作配置
    var operates = {
        reply:function($this){
            var id = $this.closest("tr").attr("data-id");
            var getByIdData = {
                dataArr:{
                    id:id
                }
            };
            utils.renderModal('回复', template('modalDiv', getByIdData), function(){
                if($("#visaPassportForm").valid()) {
                    utils.ajaxSubmit(apis.guestbook.replyById, $("#visaPassportForm").serialize(), function (data) {
                        hound.success("回复成功", "", 1000);
                        utils.modal.modal('hide');
                        loadData();
                    })
                }
            }, 'md');
        }
    };

    var param = {
        pageNo: 1,
        pageSize:10,
        status:''
    };

    function loadData() {
        utils.ajaxSubmit(apis.guestbook.getLists, param, function (data) {
            //根据状态值显示对应的状态文字 + 显示 有效/无效按钮  置顶/取消置顶按钮
            $.each(data.dataArr,function(i,n){
                n.statusText = consts.status.guestBook[n.status];
                (n.status=="1")? n.materialButtonGroup = comButtons: n.materialButtonGroup = '';
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