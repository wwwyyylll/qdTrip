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
        utils.ajaxSubmit(apis.stat.getCashOut, "", function (data) {
            $.each(data.dataArr,function(i,n){
                if(i=="totalMoney"){
                    totalNumber = Number(n);
                    totalDataArr.push({label: i, labelText:"总金额", money: Number(n), color:"#F7464A"})
                }else if(i=="takenMoney"){
                    totalDataArr.push({label: i, labelText:"已提现金额", money: Number(n), color:"#46BFBD"});
                    noTotalNumberDataArr.push({label: i, labelText:"已提现金额", money: Number(n), color:"#46BFBD", highlight:"#5AD3D1"});
                }else if(i=="waitMoney"){
                    totalDataArr.push({label: i, labelText:"可提现金额", money: Number(n), color:"#FDB45C"});
                    noTotalNumberDataArr.push({label: i, labelText:"可提现金额", money: Number(n), color:"#FDB45C", highlight:"#FFC870"});
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
            var getData = {dataArr:totalDataArr,userArr:data.userArr};
            $("#resultText").html(template('resultDiv', getData));
        });
    }
    loadData();
});