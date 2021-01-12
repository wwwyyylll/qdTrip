require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var searchlabel = $(".searchlabel");
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
    $(document).on("click",function(){
        $('.ability-list').remove();
    });

    function blobToDataURL(blob,cb) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            var base64 = evt.target.result
            cb(base64)
        };
        reader.readAsDataURL(blob);
    }

    var picFile = "";
    function uploadFile(){
        //选择图片文件
        $(".uploadImg").change(function(){
            //判断是否支持FileReader
            if (window.FileReader) {
                var reader = new FileReader();
            } else {
                hound.alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
            }
            var file = this.files[0];
            reader.onload = function(e) {
                //获取图片dom
                $(".imgUrl").html('<i class="fa fa-image mr-2"></i>' + file.name)
                if(file.name!=""){
                    $(".avatarUpload").removeAttr("disabled");
                    $(".avatarUpload").removeClass("btn-default");
                    $(".avatarUpload").addClass("btn-primary");
                }
            };
            reader.readAsDataURL(file);

            if(file){
                var url = URL.createObjectURL(file);
                var base64 = blobToDataURL(file,function(base64Url) {
                    picFile = base64Url;
                })
            }
        })
        // 上传图片文件
        $(".uploadFile").find('.avatarUpload').click(function () {
            $.ajax({
                type:'POST',
                url: "@@API",
                data: {
                    c:"img",
                    a:"uploadForBase64",
                    linkUserName:consts.param.linkUserName,
                    linkPassword:consts.param.linkPassword,
                    signature:consts.param.signature,
                    userToken: $.cookie('userToken'),
                    content:picFile
                },
                dataType: 'json',
                success: function (res) {
                    $(".imgUrl").html("");
                    $(".imgUrl").html("<a target='_blank' href='"+ res.result +"'><img style='display: inline-block;width: 100px;height: 33px' src='"+ res.result +"'></a>");
                    $(".imgUrl").css({marginTop:0});
                    $("input[name=qrCodeUrl]").val(res.result);
                }
            }).fail(function (jqXHR, textStatus) {
                hound.error('Request failed: ' + textStatus);
            });
        });
    }

    var channelBusinessParam = {
        pageNo: 1,
        pageSize:10,
        status:'',
        userId:''
    };

    //页面操作配置
    var operates = {
        getTaobaoPwd:function(){
            utils.ajaxSubmit(apis.tool.getTaobaoSignUpPwd, '', function (data) {
                $("#pwd").html(data.pwd);
                $("#updateTime").val(data.updateTime);
            });
        },
        saveTaobaoPwd:function($this){
            hound.confirm('确认更新签约淘宝淘口令吗?', '', function () {
                utils.ajaxSubmit(apis.tool.saveTaobaoSignUpPwd, $("#taobaoPwd").serialize(), function (data) {
                    hound.success("更新成功","",1000);
                    operates.getTaobaoPwd();
                });
            });
        },
        //渠道商列表
        getChannelBusiness:function(){
            utils.ajaxSubmit(apis.channelBusinessPopularize.getLists, channelBusinessParam, function (data) {
                $.each(data.dataArr,function(i,n){
                    n.statusText = consts.status.ordinary[n.status];
                    (n.status=="1")? n.materialButtonGroup = comButtons + stopButton : n.materialButtonGroup = comButtons + startBouutn;
                });
                data.statusText = listDropDown.statusText;

                $("#sampleTable1").html(template('visaListItem', data));
                utils.bindPagination($visaPagination, channelBusinessParam, operates.getChannelBusiness);
                $visaPagination.html(utils.pagination(parseInt(data.cnt), channelBusinessParam.pageNo));
            });
        },
        //渠道商新增
        add:function(){
            var initialData = {
                dataArr:{}
            };
            utils.renderModal('新增渠道商', template('modalDiv',initialData), function(){
                if($("#visaPassportForm").valid()){
                    utils.loading(true);
                    utils.ajaxSubmit(apis.channelBusinessPopularize.create,$("#visaPassportForm").serialize(),function(data){
                        utils.loading(false);
                        hound.success("添加成功","",1000);
                        utils.modal.modal('hide');
                        param.pageNo = 1;
                        operates.getChannelBusiness();
                    })
                }
            }, 'lg');
            uploadFile();
        },
        //渠道商编辑
        edit:function($this){
            var id = $this.closest("tr").attr("data-id");
            utils.ajaxSubmit(apis.channelBusinessPopularize.getById, {id: id}, function (data) {
                var getByIdData = {
                    dataArr:data
                };
                utils.renderModal('编辑渠道商', template('modalDiv', getByIdData), function(){
                    if($("#visaPassportForm").valid()) {
                        utils.loading(true);
                        utils.ajaxSubmit(apis.channelBusinessPopularize.updateById, $("#visaPassportForm").serialize(), function (data) {
                            utils.loading(false);
                            hound.success("编辑成功", "", 1000);
                            utils.modal.modal('hide');
                            operates.getChannelBusiness();
                        })
                    }
                }, 'lg');
                uploadFile();
            });
        },
        //渠道商查看
        look:function($this){
            var id = $this.closest("tr").attr("data-id");
            utils.ajaxSubmit(apis.channelBusinessPopularize.getById, {id: id}, function (data) {
                var getByIdData = {
                    dataArr:data
                };
                utils.renderModal('查看渠道商', template('modalDiv', getByIdData),'', 'lg');
                $("#visaPassportForm").append($("fieldset").prop('disabled', true));
            });
        },
        //渠道商无效
        setOff:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认无效吗?', '', function () {
                utils.ajaxSubmit(apis.channelBusinessPopularize.offById, {id: id}, function (data) {
                    operates.getChannelBusiness();
                });
            });
        },
        //渠道商有效
        setOn:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认有效吗?', '', function () {
                utils.ajaxSubmit(apis.channelBusinessPopularize.onById, {id: id}, function (data) {
                    operates.getChannelBusiness();
                });
            });
        }
    };

    $("#headerTab1").on("click",function(){
        $("#tabContent1").show();
        $("#tabContent2").hide();
        $("#tabContent3").hide();
        $(this).css({color:"orange"});
        $(this).closest("li").siblings().find("a").css({color:"#555555"});
    });
    $("#headerTab2").on("click",function(){
        $("#tabContent1").hide();
        $("#tabContent2").show();
        $("#tabContent3").hide();
        operates.getTaobaoPwd();
        $(this).css({color:"orange"});
        $(this).closest("li").siblings().find("a").css({color:"#555555"});
    });
    $("#headerTab3").on("click",function(){
        $("#tabContent1").hide();
        $("#tabContent2").hide();
        $("#tabContent3").show();
        operates.getChannelBusiness();
        $(this).css({color:"orange"});
        $(this).closest("li").siblings().find("a").css({color:"#555555"});
    });

    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var id = decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
    var urlParam = id.split("=");
    if(urlParam[0]==1){
        $("#headerTab2").click();
    }else{
        $("#headerTab1").click();
    }

    var param = {
       materialId:''
    };

    function loadData() {
        utils.ajaxSubmit(apis.tool.searchTbOptimusByMaterialId, param, function (data) {
            var json = JSON.stringify(data, undefined, 2);
            $sampleTable.html(json);
            $sampleTable.show();
        });
    }
    utils.bindList($(document), operates);
    var listDropDown = {
        statusText:'状态'
    };
    $("#sampleTable1").on('click', '#dropStatusOptions a[data-id]', function () {
        channelBusinessParam.status = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.statusText = "状态" : listDropDown.statusText = $(this).text();
        operates.getChannelBusiness();
    });
    $("#search").on("click",function(){
        //判断是什么条件搜索
        var selectSearchLabel = $("#selectsearchlabel").text();
        if(selectSearchLabel=="物料ID"){
            if($("#searchCont").val()!=''){
                param.materialId = $("#searchCont").val();
                loadData();
            }else{
                hound.error("请填写物料ID");
            }
        }
    });
    $('#searchCont').on('keypress',function(event){
        if (event.keyCode == 13) {
            $('#search').click();
        }
    });
    //渠道商推广
    $("#search1").on("click",function(){
        channelBusinessParam.userId = $("#searchCont1").val();
        operates.getChannelBusiness();
    });
    $('#searchCont1').on('keypress',function(event){
        if (event.keyCode == 13) {
            $('#search1').click();
        }
    });
});