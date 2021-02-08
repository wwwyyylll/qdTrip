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
                totalDataArr.push({label: "totalMoney", labelText:"总金额", money: totalNumber, color:"#ff00c8"});
                $.each(data.dataArr,function(i,n){
                    if(n.channel=="1"){ //淘宝
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(255,165,0,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(255,165,0,1)", highlight:"rgba(255,165,0,0.5)"});
                    }else if(n.channel=="2"){ //拼多多
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(70,191,189,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(70,191,189,1)", highlight:"rgba(70,191,189,0.5)"});
                    }else if(n.channel=="3"){ //美团
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(0,128,0,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(0,128,0,1)", highlight:"rgba(0,128,0,0.5)"});
                    }else if(n.channel=="4"){ //美团流量包
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(100,149,237,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(100,149,237,1)", highlight:"rgba(100,149,237,0.5)"});
                    }else if(n.channel=="5"){ //综合
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(210,105,30,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(210,105,30,1)", highlight:"rgba(210,105,30,0.5)"});
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
                totalDataArr.push({label: "totalMoney", labelText:"总金额", money: totalNumber, color:"#ff00c8"});
                $.each(data.dataArr,function(i,n){
                    if(n.channel=="1"){ //淘宝
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.netIncomeMoney), color:"rgba(255,165,0,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.netIncomeMoney), color:"rgba(255,165,0,1)", highlight:"rgba(255,165,0,0.5)"});
                    }else if(n.channel=="2"){ //拼多多
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.netIncomeMoney), color:"rgba(70,191,189,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.netIncomeMoney), color:"rgba(70,191,189,1)", highlight:"rgba(70,191,189,0.5)"});
                    }else if(n.channel=="3"){ //美团
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.netIncomeMoney), color:"rgba(0,128,0,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.netIncomeMoney), color:"rgba(0,128,0,1)", highlight:"rgba(0,128,0,0.5)"});
                    }else if(n.channel=="4"){ //美团流量包
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(100,149,237,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(100,149,237,1)", highlight:"rgba(100,149,237,0.5)"});
                    }else if(n.channel=="5"){ //综合
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(210,105,30,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(210,105,30,1)", highlight:"rgba(210,105,30,0.5)"});
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
                totalDataArr.push({label: "totalMoney", labelText:"总金额", money: totalNumber, color:"#ff00c8"});
                $.each(data.dataArr,function(i,n){
                    if(n.channel=="1"){ //淘宝
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.serviceMoney), color:"rgba(255,165,0,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.serviceMoney), color:"rgba(255,165,0,1)", highlight:"rgba(255,165,0,0.5)"});
                    }else if(n.channel=="2"){ //拼多多
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.serviceMoney), color:"rgba(70,191,189,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.serviceMoney), color:"rgba(70,191,189,1)", highlight:"rgba(70,191,189,0.5)"});
                    }else if(n.channel=="3"){ //美团
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.serviceMoney), color:"rgba(0,128,0,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.serviceMoney), color:"rgba(0,128,0,1)", highlight:"rgba(0,128,0,0.5)"});
                    }else if(n.channel=="4"){ //美团流量包
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(100,149,237,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(100,149,237,1)", highlight:"rgba(100,149,237,0.5)"});
                    }else if(n.channel=="5"){ //综合
                        totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(210,105,30,1)"});
                        noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"rgba(210,105,30,1)", highlight:"rgba(210,105,30,0.5)"});
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