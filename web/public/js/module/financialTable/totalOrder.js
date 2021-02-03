require(["consts", "apis", "utils", "common"], function(consts, apis, utils) {
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
            totalDataArr.push({label: "totalCnt", labelText:"总数量", cnt: totalNumber, color:"#F7464A"});
            $.each(data.dataArr,function(i,n){
                if(n.channel=="1"){ //淘宝
                    totalDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"deepskyblue"});
                    noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"deepskyblue", highlight:"lightblue"});
                }else if(n.channel=="2"){ //拼多多
                    totalDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"#46BFBD"});
                    noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"#46BFBD", highlight:"#5AD3D1"});
                }else if(n.channel=="3"){ //美团
                    totalDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"#FDB45C"});
                    noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"#FDB45C", highlight:"#FFC870"});
                }else if(n.channel=="4"){ //美团流量包
                    totalDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"red"});
                    noTotalNumberDataArr.push({label: n.channel, labelText:n.channelName, cnt: Number(n.cnt), color:"red", highlight:"indianred"});
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
});