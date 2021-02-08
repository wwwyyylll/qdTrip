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
        stopButton = '<button class="btn btn-danger" type="button" data-operate="setOff">无效</button>',
        packageButton = '<button class="btn btn-success" type="button" data-operate="packageList">第三方平台套餐</button>';

    searchlabel.on("click",function(){
        $("#selectsearchlabel").text($(this).text());
        $("#searchCont").val("");
        $("#searchCont").attr("data-id",'');
    });

    //上传图片文件
    function blobToDataURL(blob,cb) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            var base64 = evt.target.result;
            cb(base64)
        };
        reader.readAsDataURL(blob);
    }
    function uploadFile(){
        //选择图片文件
        $(".uploadImg").change(function(){
            var uploadFile = $(this).closest(".uploadFile");
            //判断是否支持FileReader
            if (window.FileReader) {
                var reader = new FileReader();
            } else {
                hound.alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
            }
            var file = this.files[0];
            reader.onload = function(e) {
                //获取图片dom
                uploadFile.find(".imgUrl").html('<i class="fa fa-image mr-2"></i>' + file.name)
                if(file.name!=""){
                    uploadFile.find(".avatarUpload").removeAttr("disabled");
                    uploadFile.find(".avatarUpload").removeClass("btn-default");
                    uploadFile.find(".avatarUpload").addClass("btn-primary");
                }
            };
            reader.readAsDataURL(file);

            if(file){
                var url = URL.createObjectURL(file);
                var base64 = blobToDataURL(file,function(base64Url) {
                    uploadFile.find(".temporaryFile").text(base64Url);
                })
            }
        });
        // 上传图片文件
        $('.avatarUpload').click(function () {
            var uploadFile = $(this).closest(".uploadFile");
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
                    content:uploadFile.find(".temporaryFile").text()
                },
                dataType: 'json',
                success: function (res) {
                    uploadFile.find(".imgUrl").html("");
                    uploadFile.find(".imgUrl").html("<a target='_blank' href='"+ res.result +"'><img style='display: inline-block;width: 45px;height: 20px' src='"+ res.result +"'></a>");
                    uploadFile.find("input[type=hidden]").val(res.result);
                }
            }).fail(function (jqXHR, textStatus) {
                hound.error('Request failed: ' + textStatus);
            });
        });
    }
    //新增
    $addModal.on("click",function(){
        var initialData = {
            dataArr:{},
            categoryArr:categoryArr
        };
        utils.renderModal('新增综合第三方平台', template('modalDiv',initialData), function(){
            if($("#visaPassportForm").valid()){
                utils.ajaxSubmit(apis.syntheticalPlatForm.create,$("#visaPassportForm").serialize(),function(data){
                    hound.success("添加成功","",1000);
                    utils.modal.modal('hide');
                    param.pageNo = 1;
                    loadData();
                })
            }
        }, 'lg');
        uploadFile();
    });

    //页面操作配置
    var operates = {
        //编辑
        edit:function($this){
            var id = $this.closest("tr").attr("data-id");
            utils.ajaxSubmit(apis.syntheticalPlatForm.getById, {id: id}, function (data) {
                var data = {
                    dataArr:data,
                    categoryArr:categoryArr
                };
                utils.renderModal('编辑——'+ data.dataArr.title, template('modalDiv', data), function(){
                    if($("#visaPassportForm").valid()) {
                        utils.ajaxSubmit(apis.syntheticalPlatForm.updateById, $("#visaPassportForm").serialize(), function (data) {
                            hound.success("编辑成功", "", 1000);
                            utils.modal.modal('hide');
                            loadData();
                        })
                    }
                }, 'lg');
                uploadFile();
            });
        },
        //查看
        look:function($this){
            var id = $this.closest("tr").attr("data-id");
            utils.ajaxSubmit(apis.syntheticalPlatForm.getById, {id: id}, function (data) {
                var data = {
                    dataArr:data,
                    categoryArr:categoryArr
                };
                utils.renderModal('查看——'+ data.dataArr.title, template('modalDiv', data),'', 'lg');
                $("#visaPassportForm").append($("fieldset").prop('disabled', true));
            });
        },
        //无效
        setOff:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认无效吗?', '', function () {
                utils.ajaxSubmit(apis.syntheticalPlatForm.offById, {id: id}, function (data) {
                    loadData();
                });
            });
        },
        //有效
        setOn:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认有效吗?', '', function () {
                utils.ajaxSubmit(apis.syntheticalPlatForm.onById, {id: id}, function (data) {
                    loadData();
                });
            });
        },
        //第三方平台套餐
        packageList:function($this){
            var id = $this.closest("tr").attr("data-id");
            window.open("@@HOSTview/mall/syntheticalPlatFormPackage.html?id=" + id);
        }
    };

    var categoryArr;
    function getCategory(){
        var categoryParam = {
            pageNo: 1,
            pageSize:10000,
            status:1
        };
        utils.ajaxSubmit(apis.syntheticalCategory.getLists, categoryParam, function (data) {
            categoryArr = data.dataArr;
        });
    }
    getCategory();

    var param = {
        pageNo: 1,
        pageSize:10,
        status:'',
        categoryId:''
    };

    function loadData() {
        utils.ajaxSubmit(apis.syntheticalPlatForm.getLists, param, function (data) {
            //根据状态值显示对应的状态文字
            $.each(data.dataArr,function(i,n){
                n.statusText = consts.status.ordinary[n.status];
                (n.status=="1")? n.materialButtonGroup = comButtons + stopButton + packageButton : n.materialButtonGroup = comButtons + startBouutn + packageButton ;
            });
            data.categoryArr = categoryArr;
            data.statusText = listDropDown.statusText;
            data.categoryText = listDropDown.categoryText;
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
        categoryText:'分类'
    };
    $sampleTable.on('click', '#dropStatusOptions a[data-id]', function () {
        param.status = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.statusText = "状态" : listDropDown.statusText = $(this).text();
        loadData();
    }).on('click', '#dropCategoryOptions a[data-id]', function () {
        param.categoryId = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.categoryText = "分类" : listDropDown.categoryText = $(this).text();
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