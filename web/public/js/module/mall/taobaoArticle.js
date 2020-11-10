require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var processedParam = {
        pageNo: 1,
        pageSize:10,
        type:'',
        date:''
    };
    var waitParam = {
        pageNo: 1,
        pageSize:10,
        type:'',
        date:''
    };
    //页面操作配置
    var operates = {
        processed:function(id){
            var content = $("#searchCont").val();
            var contentType = $("#selectsearchlabel").text();
            utils.ajaxSubmit(apis.taobaoArticle.getLists, processedParam, function (data) {
                var getByIdData = {
                    dataArr:data.dataArr,
                    content:content,
                    contentType:contentType?contentType:"类型"
                };
                $.each(data.dataArr,function(i,n){
                    n.statusText = consts.status.taobaoBindStatus[n.status];
                    n.cssHtml = n.cssHtml.replace(/&lt;/g,"<");
                    n.cssHtml = n.cssHtml.replace(/&gt;/g,">");
                    //n.cssHtml = n.cssHtml.replace(/&quot;/g,"'");
                    n.cssHtml = n.cssHtml.replace(/&quot;/g,'"');
                    n.cssHtml = n.cssHtml.replace(/&amp;nbsp;/g," ");
                });
                $("#tabContent").html(template('processedList', getByIdData));
                utils.bindPagination($("#visaPagination"), processedParam, operates.processed);
                $("#visaPagination").html(utils.pagination(parseInt(data.cnt), processedParam.pageNo));

                $(".searchlabel").on("click",function(){
                    $("#selectsearchlabel").text($(this).text());
                    $("#searchCont").val("");
                    $("#searchCont").attr("data-id",'');
                    if($("#selectsearchlabel").text()=="日期"){
                        $('#searchCont').addClass("dateRange");
                        $(document).ready(function() {
                            $('.dateRange').daterangepicker(null, function(start, end, label) {
                            });
                        });
                    }else{
                        //销毁日期选择器
                        if($('#searchCont').hasClass("dateRange")){
                            $('#searchCont').removeClass("dateRange");
                            $('#searchCont').data("daterangepicker").remove();
                        }
                    }
                });

                $("#search").on("click",function(){
                    processedParam.pageNo = 1;
                    var selectSearchLabel = $("#selectsearchlabel").text();
                    if(selectSearchLabel=="类型"){
                        processedParam.type = $("#searchCont").val();
                        processedParam.date = '';
                        operates.processed();
                    }else if(selectSearchLabel=="日期"){
                        processedParam.date = $("#searchCont").val();
                        processedParam.type = '';
                        operates.processed();
                    }
                });
                $('#searchCont').on('keypress',function(event){
                    if (event.keyCode == 13) {
                        $('#search').click();
                    }
                });
            })
        },
        waitList:function(){
            var content = $("#searchCont1").val();
            var contentType = $("#selectsearchlabel1").text();
            utils.ajaxSubmit(apis.taobaoArticle.getLists, waitParam, function (data) {
                var getByIdData = {
                    dataArr:data.dataArr,
                    content:content,
                    contentType:contentType?contentType:"类型"
                };
                $.each(data.dataArr,function(i,n){
                    n.statusText = consts.status.taobaoBindStatus[n.status];
                    n.cssHtml = n.cssHtml.replace(/&lt;/g,"<");
                    n.cssHtml = n.cssHtml.replace(/&gt;/g,">");
                    //n.cssHtml = n.cssHtml.replace(/&quot;/g,"'");
                    n.cssHtml = n.cssHtml.replace(/&quot;/g,'"');
                    n.cssHtml = n.cssHtml.replace(/&amp;nbsp;/g," ");
                });
                $("#tabContent").html(template('waitList', getByIdData));
                utils.bindPagination($("#waitPagination"), waitParam, operates.waitList);
                $("#waitPagination").html(utils.pagination(parseInt(data.cnt), waitParam.pageNo));

                $(".searchlabel1").on("click",function(){
                    $("#selectsearchlabel1").text($(this).text());
                    $("#searchCont1").val("");
                    $("#searchCont1").attr("data-id",'');
                    if($("#selectsearchlabel").text()=="日期"){
                        $('#searchCont1').addClass("dateRange");
                        $(document).ready(function() {
                            $('.dateRange').daterangepicker(null, function(start, end, label) {
                            });
                        });
                    }else{
                        //销毁日期选择器
                        if($('#searchCont1').hasClass("dateRange")){
                            $('#searchCont1').removeClass("dateRange");
                            $('#searchCont1').data("daterangepicker").remove();
                        }
                    }
                });

                $("#search1").on("click",function(){
                    waitParam.pageNo = 1;
                    var selectSearchLabel1 = $("#selectsearchlabel1").text();
                    if(selectSearchLabel1=="类型"){
                        waitParam.type = $("#searchCont1").val();
                        waitParam.date = '';
                        operates.waitList();
                    }else if(selectSearchLabel1=="日期"){
                        waitParam.date = $("#searchCont1").val();
                        waitParam.nickName = '';
                        operates.waitList();
                    }
                });
                $('#searchCont1').on('keypress',function(event){
                    if (event.keyCode == 13) {
                        $('#search1').click();
                    }
                });
            });
        },
        preview:function($this){
            var runTextArea = $this.closest(".specItem").find("textarea").val();
            var oNewWin = window.open('about:blank');
            oNewWin.document.write(runTextArea);
        },
        saveArticle:function($this){
            var id = $this.closest(".specItem").attr("data-id");
            var tag = $this.attr("data-id");
            if(tag==1){
                //cssHtml
                var cssHtml = $this.closest(".specItem").find("textarea").val();
                hound.confirm('确认保存吗?', '', function () {
                    utils.ajaxSubmit(apis.taobaoArticle.editArticle, {id: id,cssHtml:cssHtml,noCssHtml:''}, function (data) {
                        hound.success("操作成功", "", 1000);
                        operates.processed();
                    });
                });
            }else if(tag==2){
                //noCssHtml
                var noCssHtml = $this.closest(".specItem").find("textarea").val();
                hound.confirm('确认保存吗?', '', function () {
                    utils.ajaxSubmit(apis.taobaoArticle.editArticle, {id: id,noCssHtml:noCssHtml,cssHtml:''}, function (data) {
                        hound.success("操作成功", "", 1000);
                        operates.waitList();
                    });
                });
            }
        }
    };

    // 页面首次加载列表数据
    operates.processed();
    $("#headerTab1").on("click",function(){
        operates.processed();
        $(this).css({color:"orange"});
        $("#headerTab2").css({color:"#555555"});
        $("#headerTab3").css({color:"#555555"});
    });
    $("#headerTab2").on("click",function(){
        operates.waitList();
        $(this).css({color:"orange"});
        $("#headerTab1").css({color:"#555555"});
        $("#headerTab3").css({color:"#555555"});
    });
    utils.bindList($(document), operates);
});