import Highcharts from "highcharts";

Template.myChart.onCreated(function(){
    var self = this;
    self.colorList = [
        "black","silver","maroon","red",
        "navy","blue","purple","fuchsia",
        "green","lime","olive","yellow",
        "teal","aqua","gray","white"
    ];

    self.updatePie = function(){
        var list = self.colorList;
        var rtn = [];

        for(var i=0, len=list.length; i<len; i++){
            rtn.push({
                name:list[i],
                y : (Dot.find({color:list[i]}).count()),
                color:list[i]
            });
        }

        var chart = $('div[name=pieChart]').highcharts();
        chart.series[0].setData(rtn);
        chart.redraw();
    };
});

Template.myChart.onRendered(function(){
    var self = this;
    $('div[name=pieChart]').highcharts({
        title:{text: '모두의 도트 색상 파이 차트'},
        series: [{
            type: 'pie',
            name: 'dot',
            data:(function(){
                var list = self.colorList;
                var rtn = [];
                for(var i=0,len=list.length; i<len; i++){
                    rtn.push({name:list[i],y:10,color:list[i]});
                }
                return rtn;
            })()
        }]
    },function(){
        self.autorun(function() { 
             if(subl.ready()){
                 self.updatePie();
             }
        });
    });
})