require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
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
        utils.ajaxSubmit(apis.stat.getIncomeUser, "", function (data) {
            totalNumber = Number(data.totalMoney);
            totalDataArr.push({label: "totalMoney", labelText:"总金额", money: totalNumber, color:"red"});
            $.each(data.dataArr,function(i,n){
                if(n.channel=="1"){ //淘宝
                    totalDataArr.push({label: n.channel, labelText: n.channelName, money: Number(n.money), color:"#ffcd56"});
                    noTotalNumberDataArr.push({label: n.channel, labelText:"淘宝", money: Number(n.money), color:"#ffcd56", highlight:"orange"});
                }else if(n.channel=="2"){ //拼多多
                    totalDataArr.push({label: n.channel, labelText: n.channelName, money: Number(n.money), color:"deeppink"});
                    noTotalNumberDataArr.push({label: n.channel, labelText:"拼多多", money: Number(n.money), color:"deeppink", highlight:"pink"});
                }else if(n.channel=="3"){ //美团
                    totalDataArr.push({label: n.channel, labelText: n.channelName, money: Number(n.money), color:"#46BFBD"});
                    noTotalNumberDataArr.push({label: n.channel, labelText:"美团", money: Number(n.money), color:"#46BFBD", highlight:"#1bb1ae"});
                }else if(n.channel=="90"){ //推广
                    totalDataArr.push({label: n.channel, labelText: n.channelName, money: Number(n.money), color:"#b66ae2"});
                    noTotalNumberDataArr.push({label: n.channel, labelText:"推广", money: Number(n.money), color:"#b66ae2", highlight:"#9370db"});
                }else if(n.channel=="91"){ //红包
                    totalDataArr.push({label: n.channel, labelText: n.channelName, money: Number(n.money), color:"#ea5c5c"});
                    noTotalNumberDataArr.push({label: n.channel, labelText:"红包", money: Number(n.money), color:"#ea5c5c", highlight:"red"});
                }else if(n.channel=="92"){ //拉新奖励
                    totalDataArr.push({label: n.channel, labelText:n.channelName, money: Number(n.money), color:"cornflowerblue"});
                    noTotalNumberDataArr.push({label: n.channel, labelText:"拉新奖励", money: Number(n.money), color:"cornflowerblue", highlight:"#4e88ef"});
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
            var ctxp = $("#pieChartDemo").get(0).getContext("2d");
            var pieChart = new Chart(ctxp).Pie(pieData);
            //文字统计结果显示
            var getData = {dataArr:totalDataArr};
            $("#resultText").html(template('resultDiv', getData));
        });
    }
    loadData();
});