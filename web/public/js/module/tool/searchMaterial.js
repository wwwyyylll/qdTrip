require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var searchlabel = $(".searchlabel");
    var $sampleTable = $('#sampleTable');
    var $visaPagination = $("#visaPagination");
    var $searchCont = $("#searchCont");
    //按钮组集合
    var lookButton = '<button class="btn btn-info" type="button" data-operate="look">查看订单详情</button>',
        completeBouutn =  '<button class="btn btn-primary" type="button" data-operate="complete">完成</button>',
        refundButton = '<button class="btn btn-danger" type="button" data-operate="activistRefund">维权退款</button>',
        validButton = '<button class="btn btn-danger" type="button" data-operate="valid">无效</button>',
        deliverButton = '<button class="btn btn-primary" type="button" data-operate="deliver">发货</button>',
        submitSupplierButton = '<button class="btn btn-primary" type="button" data-operate="submitSupplier">接单</button>',
        noSupplierButton = '<button class="btn btn-danger" type="button" data-operate="noSupplier">不接单</button>',
        supplierButton = '<button class="btn btn-primary" type="button" data-operate="supplier">供应商接单</button>';

    searchlabel.on("click",function(){
        $("#selectsearchlabel").text($(this).text());
        $("#searchCont").val("");
        $("#searchCont").attr("data-id",'');
        if($("#selectsearchlabel").text()=="下单时间"){
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
    $(document).on("click",function(){
        $('.ability-list').remove();
    });

    //页面操作配置
    var operates = {
        //查看
        look:function($this){
            var id = $this.closest("tr").attr("data-id");
            var orderNo = $this.closest("tr").find("td").eq(1).find("div").eq(0).text();
            window.open("@@HOSTview/mall/orderDetails.html?id=" + id);
        },
        //完成
        complete:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认完成订单吗?', '', function () {
                utils.ajaxSubmit(apis.taobaoOrder.completedById, {id: id}, function (data) {
                    loadData();
                });
            });
        },
        //维权退款
        activistRefund:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认维权退款吗?', '', function () {
                utils.ajaxSubmit(apis.taobaoOrder.refundById, {id: id}, function (data) {
                    loadData();
                });
            });
        },
        //无效
        valid:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.confirm('确认订单无效吗?', '', function () {
                utils.ajaxSubmit(apis.taobaoOrder.validById, {id: id}, function (data) {
                    loadData();
                });
            });
        },
        //退款申请
        refund:function($this){
            var id = $this.closest("tr").attr("data-id");
            var orderNo = $this.closest("tr").find("td").eq(1).find("div").eq(0).text();
            var amountText = $this.closest("tr").find("td").eq(7).text();
            var amount = amountText.substring(0,amountText.length-1);
            var num = $this.closest("tr").find("td").eq(10).text();
            var initialData = {
                dataArr:{
                    id:id,
                    orderNo:orderNo,
                    amount:amount,
                    reason:'',
                    num:num
                }
            };
            utils.renderModal('申请退款', template('refundModal', initialData), function(){
                if($("#refundForm").valid()) {
                    utils.ajaxSubmit(apis.mallOrderRefundRequest.create, $("#refundForm").serialize(), function (data) {
                        hound.success("申请退款成功", "", 1000);
                        utils.modal.modal('hide');
                        loadData();
                    })
                }
            }, 'md');
        },
        //发货
        deliver:function($this){
            var id = $this.closest("tr").attr("data-id");
            var orderNo = $this.closest("tr").find("td").eq(1).find("div").eq(0).text();
            var initialData = {
                dataArr:{
                    id:id,
                    orderNo:orderNo,
                    expressCompany:'',
                    expressNo:''
                }
            };
            utils.renderModal('发货', template('deliverModal', initialData), function(){
                if($("#deliverForm").valid()) {
                    utils.ajaxSubmit(apis.taobaoOrder.deliveredById, $("#deliverForm").serialize(), function (data) {
                        hound.success("发货成功", "", 1000);
                        utils.modal.modal('hide');
                        loadData();
                    })
                }
            }, 'md');
        },
        //接单
        submitSupplier:function($this){
            var id = $this.closest("tr").attr("data-id");
            var initialData = {
                dataArr:{
                    id:id,
                    amount:''
                }
            };
            utils.renderModal('接单', template('submitSupplierModal', initialData), function(){
                if($("#submitSupplierForm").valid()) {
                    utils.ajaxSubmit(apis.taobaoOrder.submitSupplierById, $("#submitSupplierForm").serialize(), function (data) {
                        hound.success("接单成功", "", 1000);
                        utils.modal.modal('hide');
                        loadData();
                    })
                }
            }, 'md');
        },
        //不接单
        noSupplier:function($this){
            var id = $this.closest("tr").attr("data-id");
            hound.reason('确认不接单吗?','请输入不接单原因',function(data){
                utils.ajaxSubmit(apis.taobaoOrder.submitSupplierById, {id: id,isAccept:2,reason:data}, function (data) {
                    hound.success("操作成功", "", 1000);
                    loadData();
                });
            })
        },
        supplier:function($this){
            var id = $this.closest("tr").attr("data-id");
            var totalAmount = $this.closest("tr").find("td").eq(6).find("span").eq(0).text();
            var actualTotalAmount = $this.closest("tr").find("td").eq(7).text();
            var num = $this.closest("tr").find("td").eq(10).text();
            var goodsAmount = $this.closest("tr").find("td").eq(6).find("span").eq(1).text();
            var expressFee = $this.closest("tr").find("td").eq(6).find("span").eq(2).text();
            var deductionPrice = $this.closest("tr").find("td").eq(8).text();
            var initialData = {
                dataArr:{
                    id:id,
                    totalAmount:totalAmount,
                    actualTotalAmount:actualTotalAmount,
                    num:num,
                    goodsAmount:goodsAmount,
                    expressFee:expressFee,
                    deductionPrice:deductionPrice
                }
            };
            utils.renderModal('供应商接单', template('supplierModal', initialData), function(){
                if($("#supplierForm").valid()) {
                    utils.ajaxSubmit(apis.taobaoOrder.submitSupplierById, $("#supplierForm").serialize(), function (data) {
                        hound.success("操作成功", "", 1000);
                        utils.modal.modal('hide');
                        loadData();
                    })
                }
            }, 'md');
            $("select[name=isAccept]").on("change",function(){
                if($(this).val()==1){
                    $(".amountDiv").show();
                    $(".reasonDiv").hide();
                    $(".amount").attr("required","required");
                    $(".amount").attr("name","amount");
                    $(".reason").removeAttr("required");
                    $(".reason").removeAttr("name");
                }else{
                    $(".amountDiv").hide();
                    $(".reasonDiv").show();
                    $(".reason").attr("required","required");
                    $(".reason").attr("name","reason");
                    $(".amount").removeAttr("required");
                    $(".amount").removeAttr("name");
                }
            })
        }
    };
    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var id = decodeURI(loc.substr(n2+1,n1-n2));//从=号后面的内容
    var urlParam = id.split("=");
    var warnValue = '';
    if(urlParam[0]==2){
        warnValue = 1;
        $("input[name=warnParam][value='1']").attr("checked","checked");
    }else if(urlParam[0]==3){
        warnValue = 2;
        $("input[name=warnParam][value='2']").attr("checked","checked");
    }else{
        warnValue = '';
        $("input[name=warnParam][value='0']").attr("checked","checked");
    }

    var param = {
       materialId:''
    };

    $("input[name=warnParam]").on("click",function(){
        if($(this).val()!=0){
            param.pageNo = 1;
            param.searchType = $(this).val();
            loadData();
        }else{
            param.pageNo = 1;
            param.searchType = '';
            loadData();
        }
    });

    var showTypeArr;
    var parentArr;
    function getConstsLists(){
        utils.ajaxSubmit(apis.taobaoOrder.getConstLists, '', function (data) {
            showTypeArr = data.showTypeArr;
        });
    }
    function getParentLists(){
        utils.ajaxSubmit(apis.taobaoOrder.getParentLists, '', function (data) {
            parentArr = data;
        });
    }

    function syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        console.log(json);
        //if(){
        //
        //}else{
        //
        //}



        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    if(/map_data/.test(match)){
                        cls = 'key1';
                    }else{
                        cls = 'key';
                    }
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            if(cls == "key"){
                return '<br><span class="' + cls + '">' + match + '</span>';
            }else if(cls == "key1"){
                return '<br><span style="padding-left: 25px" class="' + cls + '">' + match + '</span>';
            }else{
                return '<span class="' + cls + '">' + match + '</span>';
            }
        });

    }

    function loadData() {
        utils.ajaxSubmit(apis.tool.searchTbOptimusByMaterialId, param, function (data) {
            //var getData = {
            //    dataArr:data
            //};
            //$sampleTable.html(template('visaListItem', getData));
            //var jsonData = eval(data);
            //$sampleTable.html(syntaxHighlight(data));
            var json = JSON.stringify(data, undefined, 2);
            $sampleTable.html(json);
            $sampleTable.show();
        });
    }
    // 页面首次加载列表数据
    //getConstsLists();
    //getParentLists();
    //setTimeout(function(){
    //    loadData();
    //},100);
    utils.bindList($(document), operates);
    var listDropDown = {
        statusText:'订单状态'
    };
    $sampleTable.on('click', '#dropStatusOptions a[data-id]', function () {
        param.status = $(this).data('id');
        ($(this).text()=="所有") ? listDropDown.statusText = "订单状态" : listDropDown.statusText = $(this).text();
        loadData();
    });
    setInterval(function () {
        var $time = $sampleTable.find('#time');
        if ($time.length === 1) {
            if ($time.val() !== param.time) {
                param.time = $time.val();
                param.pageNo = 1;
                loadData();
            }
        }
    },500);
    $("#searchCont").on("input",function(){
        var selectSearchLabel = $("#selectsearchlabel").text();
        if(selectSearchLabel=="用户昵称"){
            var param = {
                pageNo: 1,
                pageSize:50,
                status:'',
                mobile:'',
                nickName:$("#searchCont").val()
            };
            utils.ajaxSubmit(apis.user.getLists, param, function (data) {
                if(data.dataArr.length!=0){
                    var $economyAbilityItem = '';
                    $.each(data.dataArr, function (i, v) {
                        $economyAbilityItem += '<div data-id="'+ v.id +'" class="economy-ability-item">'+ v.nickName +'</div>'
                    })
                    $('.ability-list').remove();
                    var $abilityList = '<div class="ability-list">'+ $economyAbilityItem +'</div>';
                    $("#searchCont").closest('.economy-wards').append($abilityList);

                    $('.economy-ability-item').click(function(){
                        $('.ability-list').remove();
                        var $index = $(this).index();
                        $("#searchCont").val(data.dataArr[$index].nickName);
                        $("#searchCont").attr("data-id",data.dataArr[$index].id);
                    });
                }else{
                    $('.ability-list').remove();
                    var $abilityList = '<div class="ability-list">'+
                        '<div data-id="-1" class="economy-ability-item">无数据</div>'
                        +'</div>';
                    $("#searchCont").closest('.economy-wards').append($abilityList);

                    $('.economy-ability-item').click(function(){
                        $('.ability-list').remove();
                        var $index = $(this).index();
                        $("#searchCont").val("无数据");
                        $("#searchCont").attr("data-id","-1");
                    });
                }
            });
        }else if(selectSearchLabel=="供应商"){
            var supplierParam = {
                pageNo: 1,
                pageSize:50,
                name:$("#searchCont").val(),
                status:'',
                source:'',
                accountType:''
            };
            utils.ajaxSubmit(apis.mallSupplier.getLists, supplierParam, function (data) {
                if(data.dataArr.length!=0){
                    var $economyAbilityItem = '';
                    $.each(data.dataArr, function (i, v) {
                        $economyAbilityItem += '<div data-id="'+ v.id +'" class="economy-ability-item">'+ v.name +'</div>'
                    })
                    $('.ability-list').remove();
                    var $abilityList = '<div class="ability-list">'+ $economyAbilityItem +'</div>';
                    $("#searchCont").closest('.economy-wards').append($abilityList);

                    $('.economy-ability-item').click(function(){
                        $('.ability-list').remove();
                        var $index = $(this).index();
                        $("#searchCont").val(data.dataArr[$index].name);
                        $("#searchCont").attr("data-id",data.dataArr[$index].id);
                    });
                }else{
                    $('.ability-list').remove();
                    var $abilityList = '<div class="ability-list">'+
                        '<div data-id="-1" class="economy-ability-item">无数据</div>'
                        +'</div>';
                    $("#searchCont").closest('.economy-wards').append($abilityList);

                    $('.economy-ability-item').click(function(){
                        $('.ability-list').remove();
                        var $index = $(this).index();
                        $("#searchCont").val("无数据");
                        $("#searchCont").attr("data-id","-1");
                    });
                }
            });
        }
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
});