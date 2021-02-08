require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
    function loadData1(){
        //计算百分比函数 2021.1.26
        function Percentage(num, total) {
            if (num == 0 || total == 0){
                return 0;
            }
            return (Math.round(num / total * 10000) / 100.00);// 小数点后两位百分比
        }
        var totalNumber = "";              //总数
        var totalDataArr = [];             //所有数据的数组（有百分比）       label + labelText + cnt + percent + color
        var noTotalNumberDataArr = [];     //除去total值的数组（有百分比）    value + label + labelText + percent + color + highlight
        var pieData = [];                  //用来显示扇形图的数组（无百分比）  value + color + highlight + label
        function loadData() {
            utils.ajaxSubmit(apis.stat.getTotalOrder, "", function (data) {
                totalNumber = Number(data.totalCnt);
                totalDataArr.push({label: "totalCnt", labelText:"总数量", cnt: totalNumber, color:"#ff00c8"});
                $.each(data.dataArr,function(i,n){
                    if(n.channel=="1"){ //淘宝
                        totalDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"rgba(255,165,0,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"rgba(255,165,0,1)", highlight:"rgba(255,165,0,0.5)"});
                    }else if(n.channel=="2"){ //拼多多
                        totalDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"rgba(70,191,189,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"rgba(70,191,189,1)", highlight:"rgba(70,191,189,0.5)"});
                    }else if(n.channel=="3"){ //美团
                        totalDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"rgba(0,128,0,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"rgba(0,128,0,1)", highlight:"rgba(0,128,0,0.5)"});
                    }else if(n.channel=="4"){ //美团流量包
                        totalDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"rgba(100,149,237,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"rgba(100,149,237,1)", highlight:"rgba(100,149,237,0.5)"});
                    }else if(n.channel=="5"){ //综合
                        totalDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"rgba(210,105,30,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"rgba(210,105,30,1)", highlight:"rgba(210,105,30,0.5)"});
                    }
                });
                for(var i=0;i<noTotalNumberDataArr.length;i++){
                    noTotalNumberDataArr[i].percent = Percentage(noTotalNumberDataArr[i].cnt,totalNumber);
                    for(var j=0;j<totalDataArr.length;j++) {
                        if (noTotalNumberDataArr[i].label == totalDataArr[j].label) {
                            totalDataArr[j].percent = noTotalNumberDataArr[i].percent;
                        }
                    }
                    pieData.push({
                        value: noTotalNumberDataArr[i].cnt,
                        color: noTotalNumberDataArr[i].color,
                        highlight: noTotalNumberDataArr[i].highlight,
                        label: noTotalNumberDataArr[i].labelText + noTotalNumberDataArr[i].percent + "%"
                    })
                }
                //画扇形图
                var ctxp = $("#pieChartDemo").get(0).getContext("2d");
                var pieChart = new Chart(ctxp).Pie(pieData);
                //文字统计结果显示
                var getData = {dataArr:totalDataArr};
                $("#resultText").html(template('resultDiv', getData));
            });
        }
        loadData();
    }
    function loadData2(){
        var param = {
            date:"",
            type:1
        };

        //获取当前时间
        function getDate(){
            var myDate = new Date();
            var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
            var month = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
            var date = myDate.getDate();        //获取当前日(1-31)
            var hour = myDate.getHours();       //获取当前小时数(0-23)
            var minutes = myDate.getMinutes();     //获取当前分钟数(0-59)
            var seconds = myDate.getSeconds();     //获取当前秒数(0-59)

            function addZero(a){
                var aa = "";
                if(a<10){
                    aa = "0" + a;
                }else{
                    aa = a;
                }
                return aa;
            }
            month = addZero(month);
            //date = addZero(date);
            //hour = addZero(hour);
            //minutes = addZero(minutes);
            //seconds = addZero(seconds);

            var dateData = year + "-" + month ;
            return dateData;
        }
        param.date = getDate();
        $(".dateInput").attr("placeholder",getDate());

        $("select[name=type]").on("change",function(){
            if($(this).val()==3){
                $(".dateDiv").hide();
                param.date = "''";
            }else if($(this).val()==1){
                $(".dateDiv").show();
                var dateInputParent = $(".dateInput").parent();
                $(".dateInput").remove();
                dateInputParent.append('<input autocomplete="off" placeholder="' + "请输入如" + getDate() + "的日期格式" + '" type="text" name="date"class="form-control dateInput">');
            }else if($(this).val()==2){
                $(".dateDiv").show();
                var dateInputParent = $(".dateInput").parent();
                $(".dateInput").remove();
                dateInputParent.append('<input autocomplete="off" placeholder="请输入如2021日期格式" type="text" name="date" class="form-control dateInput">');
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
            var taoArr = [];
            var pddArr = [];
            var meiArr = [];
            var meiArr1 = [];
            var syntheticalArr = [];
            utils.ajaxSubmit(apis.stat.getOrderLists, param, function (data) {
                if(data.dataArr.length>0){
                    $.each(data.dataArr,function(i,n){
                        if(xArr.indexOf(n.date)=='-1'){
                            xArr.push(n.date);
                        }
                    });

                    $.each(data.dataArr,function(i,n){
                        for(var j=0;j<xArr.length;j++){
                            if(n.date==xArr[j]){
                                if(n.channel==1){
                                    taoArr.push(n.cnt);
                                }
                                if(n.channel==2){
                                    pddArr.push(n.cnt);
                                }
                                if(n.channel==3){
                                    meiArr.push(n.cnt);
                                }
                                if(n.channel==4){
                                    meiArr1.push(n.cnt);
                                }
                                if(n.channel==5){
                                    syntheticalArr.push(n.cnt);
                                }
                            }
                        }
                    });
                    var barData = {
                        labels: xArr,
                        datasets: [
                            {
                                label: "淘宝",                    //线条标签名称
                                fillColor: "rgba(255,165,0,0.5)",           //线以下填充区域的颜色
                                strokeColor: "rgba(255,165,0,1)",           //线条的颜色
                                pointColor: "rgba(255,165,0,1)",            //线条坐标点的颜色(鼠标hover时弹框中小方块的颜色)
                                pointStrokeColor: "#fff",                     //线条坐标点边框的颜色
                                pointHighlightFill: "#fff",                   //鼠标hover时坐标点的颜色
                                pointHighlightStroke: "rgba(255,165,0,1)",  //鼠标hover时坐标点边框的颜色
                                data: taoArr
                            },
                            {
                                label: "拼多多",
                                fillColor: "rgba(70,191,189,0.5)",
                                strokeColor: "rgba(70,191,189,1)",
                                pointColor: "rgba(70,191,189,1)",
                                pointStrokeColor: "#fff",
                                pointHighlightFill: "#fff",
                                pointHighlightStroke: "rgba(70,191,189,1)",
                                data: pddArr
                            },
                            {
                                label: "美团",
                                fillColor: "rgba(0,128,0,0.5)",
                                strokeColor: "rgba(0,128,0,1)",
                                pointColor: "rgba(0,128,0,1)",
                                pointStrokeColor: "#fff",
                                pointHighlightFill: "#fff",
                                pointHighlightStroke: "rgba(0,128,0,1)",
                                data: meiArr
                            },
                            {
                                label: "美团流量包",
                                fillColor: "rgba(100,149,237,0.5)",
                                strokeColor: "rgba(100,149,237,1)",
                                pointColor: "rgba(100,149,237,1)",
                                pointStrokeColor: "#fff",
                                pointHighlightFill: "#fff",
                                pointHighlightStroke: "rgba(100,149,237,1)",
                                data: meiArr1
                            },
                            {
                                label: "综合",
                                fillColor: "rgba(210,105,30,0.5)",
                                strokeColor: "rgba(210,105,30,1)",
                                pointColor: "rgba(210,105,30,1)",
                                pointStrokeColor: "#fff",
                                pointHighlightFill: "#fff",
                                pointHighlightStroke: "rgba(210,105,30,1)",
                                data: syntheticalArr
                            }
                        ]
                    };

                    //画柱状图
                    var parentDiv = $('#barChartDemo').parent();
                    $('#barChartDemo').remove();
                    parentDiv.append('<canvas class="embed-responsive-item" id="barChartDemo"></canvas>');

                    var ctxb = $("#barChartDemo").get(0).getContext("2d");
                    var barChart = new Chart(ctxb).Bar(barData);
                }else{
                    hound.error("没有相关图表");
                }
            });
        }
        loadData();
    }

    loadData1();
    $("#headerTab1").on("click",function(){
        //扇形图
        loadData1();
        $("#tabContent1").show();
        $("#tabContent2").hide();
        $(this).css({color:"orange"});
        $("#headerTab2").css({color:"#555555"});
    });
    $("#headerTab2").on("click",function(){
        //柱状图
        loadData2();
        $("#tabContent1").hide();
        $("#tabContent2").show();
        $(this).css({color:"orange"});
        $("#headerTab1").css({color:"#555555"});
    });
});