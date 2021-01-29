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
        var totalDataArr = [];             //所有数据的数组（有百分比）       label + labelText + money + percent + color
        var noTotalNumberDataArr = [];     //除去total值的数组（有百分比）    value + label + labelText + percent + color + highlight
        var pieData = [];                  //用来显示扇形图的数组（无百分比）  value + color + highlight + label
        function loadData() {
            utils.ajaxSubmit(apis.stat.getIncomeCompany, "", function (data) {
                totalNumber = Number(data.totalMoney);
                totalDataArr.push({label: "totalMoney", labelText:"总金额", money: totalNumber, color:"#F7464A"});
                $.each(data.dataArr,function(i,n){
                    if(n.channel=="1"){ //淘宝
                        totalDataArr.push({label: n.channel, labelText:"淘宝", money: Number(n.money), color:"deepskyblue"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:"淘宝", money: Number(n.money), color:"deepskyblue", highlight:"lightblue"});
                    }else if(n.channel=="2"){ //拼多多
                        totalDataArr.push({label: n.channel, labelText:"拼多多", money: Number(n.money), color:"#46BFBD"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:"拼多多", money: Number(n.money), color:"#46BFBD", highlight:"#5AD3D1"});
                    }else if(n.channel=="3"){ //美团
                        totalDataArr.push({label: n.channel, labelText:"美团", money: Number(n.money), color:"#FDB45C"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:"美团", money: Number(n.money), color:"#FDB45C", highlight:"#FFC870"});
                    }
                });
                for(var i=0;i<noTotalNumberDataArr.length;i++){
                    noTotalNumberDataArr[i].percent = Percentage(noTotalNumberDataArr[i].money,totalNumber);
                    for(var j=0;j<totalDataArr.length;j++) {
                        if (noTotalNumberDataArr[i].label == totalDataArr[j].label) {
                            totalDataArr[j].percent = noTotalNumberDataArr[i].percent;
                        }
                    }
                    pieData.push({
                        value: noTotalNumberDataArr[i].money,
                        color: noTotalNumberDataArr[i].color,
                        highlight: noTotalNumberDataArr[i].highlight,
                        label: noTotalNumberDataArr[i].labelText + noTotalNumberDataArr[i].percent + "%"
                    })
                }
                //画扇形图
                var parentDiv = $('#pieChartDemo').parent();
                $('#pieChartDemo').remove();
                parentDiv.append('<canvas class="embed-responsive-item" id="pieChartDemo"></canvas>');

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
        //计算百分比函数 2021.1.26
        function Percentage(num, total) {
            if (num == 0 || total == 0){
                return 0;
            }
            return (Math.round(num / total * 10000) / 100.00);// 小数点后两位百分比
        }
        var totalNumber = "";              //总数
        var totalDataArr = [];             //所有数据的数组（有百分比）       label + labelText + money + percent + color
        var noTotalNumberDataArr = [];     //除去total值的数组（有百分比）    value + label + labelText + percent + color + highlight
        var pieData = [];                  //用来显示扇形图的数组（无百分比）  value + color + highlight + label
        function loadData() {
            utils.ajaxSubmit(apis.stat.getIncomeCompany, "", function (data) {
                totalNumber = Number(data.netIncomeTotalMoney);
                totalDataArr.push({label: "totalMoney", labelText:"总金额", money: totalNumber, color:"#F7464A"});
                $.each(data.dataArr,function(i,n){
                    if(n.channel=="1"){ //淘宝
                        totalDataArr.push({label: n.channel, labelText:"淘宝", money: Number(n.netIncomeMoney), color:"deepskyblue"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:"淘宝", money: Number(n.netIncomeMoney), color:"deepskyblue", highlight:"lightblue"});
                    }else if(n.channel=="2"){ //拼多多
                        totalDataArr.push({label: n.channel, labelText:"拼多多", money: Number(n.netIncomeMoney), color:"#46BFBD"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:"拼多多", money: Number(n.netIncomeMoney), color:"#46BFBD", highlight:"#5AD3D1"});
                    }else if(n.channel=="3"){ //美团
                        totalDataArr.push({label: n.channel, labelText:"美团", money: Number(n.netIncomeMoney), color:"#FDB45C"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:"美团", money: Number(n.netIncomeMoney), color:"#FDB45C", highlight:"#FFC870"});
                    }
                });
                for(var i=0;i<noTotalNumberDataArr.length;i++){
                    noTotalNumberDataArr[i].percent = Percentage(noTotalNumberDataArr[i].money,totalNumber);
                    for(var j=0;j<totalDataArr.length;j++) {
                        if (noTotalNumberDataArr[i].label == totalDataArr[j].label) {
                            totalDataArr[j].percent = noTotalNumberDataArr[i].percent;
                        }
                    }
                    pieData.push({
                        value: noTotalNumberDataArr[i].money,
                        color: noTotalNumberDataArr[i].color,
                        highlight: noTotalNumberDataArr[i].highlight,
                        label: noTotalNumberDataArr[i].labelText + noTotalNumberDataArr[i].percent + "%"
                    })
                }
                //画扇形图
                var parentDiv = $('#pieChartDemo').parent();
                $('#pieChartDemo').remove();
                parentDiv.append('<canvas class="embed-responsive-item" id="pieChartDemo"></canvas>');

                var ctxp = $("#pieChartDemo").get(0).getContext("2d");
                var pieChart = new Chart(ctxp).Pie(pieData);
                //文字统计结果显示
                var getData = {dataArr:totalDataArr};
                $("#resultText").html(template('resultDiv', getData));
            });
        }
        loadData();
    }
    function loadData3(){
        //计算百分比函数 2021.1.26
        function Percentage(num, total) {
            if (num == 0 || total == 0){
                return 0;
            }
            return (Math.round(num / total * 10000) / 100.00);// 小数点后两位百分比
        }
        var totalNumber = "";              //总数
        var totalDataArr = [];             //所有数据的数组（有百分比）       label + labelText + money + percent + color
        var noTotalNumberDataArr = [];     //除去total值的数组（有百分比）    value + label + labelText + percent + color + highlight
        var pieData = [];                  //用来显示扇形图的数组（无百分比）  value + color + highlight + label
        function loadData() {
            utils.ajaxSubmit(apis.stat.getIncomeCompany, "", function (data) {
                totalNumber = Number(data.serviceTotalMoney);
                totalDataArr.push({label: "totalMoney", labelText:"总金额", money: totalNumber, color:"#F7464A"});
                $.each(data.dataArr,function(i,n){
                    if(n.channel=="1"){ //淘宝
                        totalDataArr.push({label: n.channel, labelText:"淘宝", money: Number(n.serviceMoney), color:"deepskyblue"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:"淘宝", money: Number(n.serviceMoney), color:"deepskyblue", highlight:"lightblue"});
                    }else if(n.channel=="2"){ //拼多多
                        totalDataArr.push({label: n.channel, labelText:"拼多多", money: Number(n.serviceMoney), color:"#46BFBD"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:"拼多多", money: Number(n.serviceMoney), color:"#46BFBD", highlight:"#5AD3D1"});
                    }else if(n.channel=="3"){ //美团
                        totalDataArr.push({label: n.channel, labelText:"美团", money: Number(n.serviceMoney), color:"#FDB45C"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:"美团", money: Number(n.serviceMoney), color:"#FDB45C", highlight:"#FFC870"});
                    }
                });
                for(var i=0;i<noTotalNumberDataArr.length;i++){
                    noTotalNumberDataArr[i].percent = Percentage(noTotalNumberDataArr[i].money,totalNumber);
                    for(var j=0;j<totalDataArr.length;j++) {
                        if (noTotalNumberDataArr[i].label == totalDataArr[j].label) {
                            totalDataArr[j].percent = noTotalNumberDataArr[i].percent;
                        }
                    }
                    pieData.push({
                        value: noTotalNumberDataArr[i].money,
                        color: noTotalNumberDataArr[i].color,
                        highlight: noTotalNumberDataArr[i].highlight,
                        label: noTotalNumberDataArr[i].labelText + noTotalNumberDataArr[i].percent + "%"
                    })
                }
                //画扇形图
                var parentDiv = $('#pieChartDemo').parent();
                $('#pieChartDemo').remove();
                parentDiv.append('<canvas class="embed-responsive-item" id="pieChartDemo"></canvas>');

                var ctxp = $("#pieChartDemo").get(0).getContext("2d");
                var pieChart = new Chart(ctxp).Pie(pieData);
                //文字统计结果显示
                var getData = {dataArr:totalDataArr};
                $("#resultText").html(template('resultDiv', getData));
            });
        }
        loadData();
    }

    loadData1();
    $("#headerTab1").on("click",function(){
        //扇形图
        loadData1();
        $(this).css({color:"orange"});
        $("#headerTab2").css({color:"#555555"});
        $("#headerTab3").css({color:"#555555"});
    });
    $("#headerTab2").on("click",function(){
        //柱状图
        loadData2();
        $(this).css({color:"orange"});
        $("#headerTab1").css({color:"#555555"});
        $("#headerTab3").css({color:"#555555"});
    });
    $("#headerTab3").on("click",function(){
        //柱状图
        loadData3();
        $(this).css({color:"orange"});
        $("#headerTab1").css({color:"#555555"});
        $("#headerTab2").css({color:"#555555"});
    });
});