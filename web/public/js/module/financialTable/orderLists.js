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

    var xArr = [];
    var taoArr = [];
    var pddArr = [];
    var meiArr = [];
    var totalArr = [];
    function loadData() {
        utils.ajaxSubmit(apis.stat.getOrderLists, param, function (data) {
            if(data.dataArr.length>0){
                $.each(data.dataArr,function(i,n){
                    if(xArr.indexOf(n.date)=='-1'){
                        xArr.push(n.date);
                        totalArr.push({
                            date:n.date
                        })
                    }
                });

                //$.each(data.dataArr,function(i,n){
                //        for(var j=0;j<xArr.length;j++){
                //            if(n.date==xArr[j]){
                //                if(n.channel==1){
                //                    taoArr.push(n.cnt);
                //                }
                //                if(n.channel==2){
                //                    pddArr.push(n.cnt);
                //                }
                //                if(n.channel==3){
                //                    meiArr.push(n.cnt);
                //                }
                //                console.log(n.channel);
                //            }
                //        }
                //});
                for(var j=0;j<xArr.length;j++){
                    $.each(data.dataArr,function(i,n){
                        if(n.date==xArr[j]){
                            if(n.channel==1){
                                taoArr.push(n.cnt);
                            }else{
                                taoArr.push(0);
                            }
                            //if(n.channel==2){
                            //    pddArr.push(n.cnt);
                            //}
                            //if(n.channel==3){
                            //    meiArr.push(n.cnt);
                            //}
                            //console.log(n.channel);
                        }
                    })
                }
                console.log(taoArr);
                console.log(pddArr);
                console.log(meiArr);


                var barData = {
                    labels: xArr,
                    datasets: [
                        {
                            label: "淘宝",                    //线条标签名称
                            fillColor: "lightpink",           //线以下填充区域的颜色
                            strokeColor: "pink",           //线条的颜色
                            pointColor: "pink",            //线条坐标点的颜色(鼠标hover时弹框中小方块的颜色)
                            pointStrokeColor: "#fff",                     //线条坐标点边框的颜色
                            pointHighlightFill: "#fff",                   //鼠标hover时坐标点的颜色
                            pointHighlightStroke: "pink",  //鼠标hover时坐标点边框的颜色
                            data: taoArr
                        },
                        {
                            label: "拼多多",
                            fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: pddArr
                        },
                        {
                            label: "美团",
                            fillColor: "lightblue",
                            strokeColor: "deepskyblue",
                            pointColor: "deepskyblue",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "deepskyblue",
                            data: meiArr
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
});