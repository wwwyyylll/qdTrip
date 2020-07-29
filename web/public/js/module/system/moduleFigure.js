require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var searchlabel = $(".searchlabel");
    var $sampleTable = $('#sampleTable');
    //按钮组集合
    var editButton = '<button class="btn btn-primary" type="button" data-operate="edit">编辑</button>',
        lookButton = '<button class="btn btn-info" type="button" data-operate="look">查看</button>',
        startBouutn =  '<button class="btn btn-primary" type="button" data-operate="setOn">有效</button>',
        stopButton = '<button class="btn btn-danger" type="button" data-operate="setOff">无效</button>',
        topButton = '<button class="btn btn-primary" type="button" data-operate="setTop">置顶</button>',
        cancelTopButton = '<button class="btn btn-danger" type="button" data-operate="cancelTop">取消置顶</button>';

    searchlabel.on("click",function(){
        $("#selectsearchlabel").text($(this).text());
        $("#searchCont").val("");
        $("#searchCont").attr("data-id",'');
    })

    function oneChange(){
        $("#oneElement").on("change",function(){
            var id = $(this).val();
            utils.ajaxSubmit(apis.module.getCaListsByControllerId,{id:id}, function (data) {
                $("#twoElement").html("");
                var getData = {
                    caListsArr:data
                };
                $("#twoElement").html(template('twoOptionItem',getData));
            });
        });
        $("select[name=type]").on("change",function(){
            if($(this).val()=='opt'){
                $(".positionDiv").show();
                $(".buttonCodeDiv").show();
                $(".iconDiv").hide();
            }else{
                $(".positionDiv").hide();
                $(".buttonCodeDiv").hide();
                $(".iconDiv").show();
            }
        })
    }

    //页面操作配置
    var operates = {
        add:function($this){
            var parentId;
            var span = $this.parent().find("span");
            if(span.length!=0){
                parentId = span.attr("data-value");
            }else{
                parentId = 0;
            }
            var initialData = {
                dataArr:{
                    parentId:parentId,
                    parentName:$this.attr("data-value"),
                    type:$this.attr("data-id"),
                    position:2
                },
                typeArr:typeArr,
                positionArr:positionArr,
                controllerLists:controllerLists,
                caListsArr:caListsArr
            };
            utils.renderModal('新增', template('moduleItem',initialData), function(){
                var caId = $("#twoElement").val();
                var options = $("#twoElement").find("option");
                var aId;
                for(var i=0;i<options.length;i++){
                    if(options.eq(i).val()==caId){
                        aId = options.eq(i).attr("data-id");
                    }
                }
                $("input[name=aId]").val(aId);
                if($("#moduleForm").valid()){
                    utils.ajaxSubmit(apis.module.create,$("#moduleForm").serialize(),function(data){
                        hound.success("添加成功","",1000);
                        utils.modal.modal('hide');
                        loadData(1);
                    })
                }
            }, 'lg');
            oneChange();
        },
        //编辑
        edit:function($this){
            var id = $this.parent().find("span").attr("data-id");
            utils.ajaxSubmit(apis.module.getById, {id: id}, function (data) {
                var getByIdData = {
                    dataArr:data,
                    typeArr:typeArr,
                    positionArr:positionArr,
                    controllerLists:controllerLists,
                    caListsArr:{}
                };
                getByIdData.dataArr.parentName = $this.attr("data-value");
                if(getByIdData.dataArr.controllerId!='' && getByIdData.dataArr.controllerId!=null){
                    utils.ajaxSubmit(apis.module.getCaListsByControllerId,{id:getByIdData.dataArr.controllerId}, function (data) {
                        getByIdData.caListsArr = data;
                        utils.renderModal('编辑', template('moduleItem', getByIdData), function(){
                            var caId = $("#twoElement").val();
                            var options = $("#twoElement").find("option");
                            var aId;
                            for(var i=0;i<options.length;i++){
                                if(options.eq(i).val()==caId){
                                    aId = options.eq(i).attr("data-id");
                                }
                            }
                            $("input[name=aId]").val(aId);
                            if($("#moduleForm").valid()) {
                                utils.ajaxSubmit(apis.module.updateById, $("#moduleForm").serialize(), function (data) {
                                    hound.success("编辑成功", "", 1000);
                                    utils.modal.modal('hide');
                                    loadData(1);
                                })
                            }
                        }, 'lg');
                        oneChange();
                    });
                }else{
                    getByIdData.caListsArr = caListsArr;
                    utils.renderModal('编辑', template('moduleItem', getByIdData), function(){
                        var caId = $("#twoElement").val();
                        var options = $("#twoElement").find("option");
                        var aId;
                        for(var i=0;i<options.length;i++){
                            if(options.eq(i).val()==caId){
                                aId = options.eq(i).attr("data-id");
                            }
                        }
                        $("input[name=aId]").val(aId);
                        if($("#moduleForm").valid()) {
                            utils.ajaxSubmit(apis.module.updateById, $("#moduleForm").serialize(), function (data) {
                                hound.success("编辑成功", "", 1000);
                                utils.modal.modal('hide');
                                loadData(1);
                            })
                        }
                    }, 'lg');
                    oneChange();
                }
            });
        },
        //查看
        look:function($this){
            var id = $this.parent().find("span").attr("data-id");
            utils.ajaxSubmit(apis.module.getById, {id: id}, function (data) {
                var getByIdData = {
                    dataArr:data,
                    typeArr:typeArr,
                    positionArr:positionArr,
                    controllerLists:controllerLists,
                    caListsArr:{}
                };
                getByIdData.dataArr.parentName = $this.attr("data-value");
                if(getByIdData.dataArr.controllerId!='' && getByIdData.dataArr.controllerId!=null){
                    utils.ajaxSubmit(apis.module.getCaListsByControllerId,{id:getByIdData.dataArr.controllerId}, function (data) {
                        getByIdData.caListsArr = data;
                        utils.renderModal('查看', template('moduleItem', getByIdData),'', 'lg');
                        $("#moduleForm").append($("fieldset").prop('disabled', true));
                    });
                }else{
                    getByIdData.caListsArr = caListsArr;
                    utils.renderModal('查看', template('moduleItem', getByIdData),'', 'lg');
                    $("#moduleForm").append($("fieldset").prop('disabled', true));
                }
            });
        },
        //无效
        setOff:function($this){
            var id = $this.parent().find("span").attr("data-id");
            hound.confirm('确认无效吗?', '', function () {
                utils.ajaxSubmit(apis.module.offById, {id: id}, function (data) {
                    loadData(1);
                });
            });
        },
        //有效
        setOn:function($this){
            var id = $this.parent().find("span").attr("data-id");
            hound.confirm('确认有效吗?', '', function () {
                utils.ajaxSubmit(apis.module.onById, {id: id}, function (data) {
                    loadData(1);
                });
            });
        },
        showTwoLevel:function($this){
            var twoLevelDiv = $this.closest(".oneLevelDiv").find(".twoLevelDiv");
            var element = $this.parent().find("i").eq(0);
            if(twoLevelDiv.length!=0){
                $this.parent().find(".moduleMessage").hide();
                if(twoLevelDiv.css("display")=="block"){
                    element.removeClass("fa-folder-open");
                    element.addClass("fa-folder");
                    twoLevelDiv.slideUp(100);
                }else{
                    element.addClass("fa-folder-open");
                    element.removeClass("fa-folder");
                    twoLevelDiv.slideDown(100);
                }
            }else{
                $this.parent().find(".moduleMessage").show();
            }
        },
        showThreeLevel:function($this){
            var threeLevelDiv = $this.closest(".twoLevelDiv").find(".threeLevelDiv");
            var element = $this.parent().find("i").eq(0);
            if(threeLevelDiv.length!=0){
                $this.parent().find(".moduleMessage").hide();
                if(threeLevelDiv.css("display")=="block"){
                    element.removeClass("fa-folder-open");
                    element.addClass("fa-folder");
                    threeLevelDiv.slideUp(100);
                }else{
                    element.addClass("fa-folder-open");
                    element.removeClass("fa-folder");
                    threeLevelDiv.slideDown(100);
                }
            }else{
                $this.parent().find(".moduleMessage").show();
            }
        }
    };

    var param = {
        pageNo: 1,
        pageSize:10,
        status:'',
        isTop:''
    };

    var controllerLists;
    var typeArr;
    var caListsArr;
    var positionArr;
    function getControllerLists(){
        utils.ajaxSubmit(apis.module.getControllerLists, '', function (data) {
            controllerLists = data;
            utils.ajaxSubmit(apis.module.getCaListsByControllerId,{id:controllerLists[0].id}, function (data) {
                caListsArr = data;
            });
        });
        utils.ajaxSubmit(apis.module.getConstLists, '', function (data) {
            typeArr = data.typeArr;
            positionArr = data.positionArr;
        });
    }
    getControllerLists();

    function loadData(isShow) {
        utils.ajaxSubmit(apis.module.getLists, '', function (data) {
            var getData = {
                dataArr:data
            };
            if(isShow==1){
                getData.isShow = 1;
            }else{
                getData.isShow = 2;
            }
            $sampleTable.html(template('visaListItem', getData));
        });
    }
    // 页面首次加载列表数据
    loadData();
    utils.bindList($(document), operates);
    $sampleTable.on('click', '#dropStatusOptions a[data-id]', function () {
        param.status = $(this).data('id');
        loadData();
        var titleText = "";
        ($(this).text()=="所有") ? titleText = "状态" : titleText = $(this).text();
        setTimeout(function(){
            $("#dropStatus").text(titleText);
        },300)
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