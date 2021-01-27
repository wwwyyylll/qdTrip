require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    var param = {
        date:"''",
        type:3
    };
    $("select[name=type]").on("change",function(){
       if($(this).val()==3){
           $(".dateDiv").hide();
           param.date = "''";
       }else if($(this).val()==1){
           $(".dateDiv").show();
           var dateInputParent = $(".dateInput").parent();
           $(".dateInput").remove();
           dateInputParent.append('<input autocomplete="off" type="text" name="date" onclick="laydate({istime: true, format: \'YYYY-MM\'})" class="form-control dateInput">');
       }else if($(this).val()==2){
           $(".dateDiv").show();
           var dateInputParent = $(".dateInput").parent();
           $(".dateInput").remove();
           dateInputParent.append('<input autocomplete="off" type="text" name="date" onclick="laydate({istime: true, format: \'YYYY\'})" class="form-control dateInput">');
       }
    });
    $("#search").on("click",function(){
        param.type = $("select[name=type]").val();
        if($("select[name=type]").val()==3){
            param.date = "''";
        }else{
            param.date = $("input[name=date]").val();
        }
        loadData();
    });
    $('#searchCont').on('keypress',function(event){
        if (event.keyCode == 13) {
            $('#search').click();
        }
    });

    function loadData() {
        var xArr = [];
        var yArr = [];
        utils.ajaxSubmit(apis.stat.getRegisterUv, param, function (data) {
            if(data.dataArr.length>0){
                $.each(data.dataArr,function(i,n){
                    if(xArr.indexOf(n.date)=='-1'){
                        xArr.push(n.date);
                    }
                    if(yArr.indexOf(n.channel)=='-1'){
                        yArr.push(n.cnt);
                    }
                });
                var barData = {
                    labels: xArr,
                    datasets: [
                        {
                            label: "用户注册数",
                            fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: yArr
                        }
                    ]
                };
                //画柱状图
                var parentDiv = $('#barChartDemo').parent();
                $('#barChartDemo').remove();
                parentDiv.append('<canvas class="embed-responsive-item" id="barChartDemo"></canvas>');

                var ctxb = $("#barChartDemo").get(0).getContext("2d");
                var barChart = new Chart(ctxb).Bar(barData);

                ////文字统计结果显示
                //var getData = {dataArr:totalDataArr};
                //$("#resultText").html(template('resultDiv', getData));
            }else{
                hound.error("没有相关图表");
            }
        });
    }
    loadData();
    function getOrderUv(){
        utils.ajaxSubmit(apis.stat.getOrderUv, '', function (data) {
            var getOrderData = data;
            $(".orderResult").html(template('orderDiv', getOrderData));
        })
    }
    getOrderUv();
});