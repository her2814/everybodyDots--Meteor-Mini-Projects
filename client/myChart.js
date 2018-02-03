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

    self.updateLine = function(){
        var list = self.colorList;
        var rtn = [];

        for(var i=0,len=list.length; i<len; i++){
            rtn.push(Dot.find({color:list[i]}).count())
        }

        var chart = $('div[name=lineChart]').highcharts();
        chart.series[0].setData(rtn);
        chart.series[1].setData(rtn);        
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
        var chart = this;
        Dot.find().observe({
            changed : function(oldDoc,newDoc){
                var list = self.colorList;
                chart.series[0].points[_.indexOf(list,oldDoc.color)].update(
                    Dot.find({color:oldDoc.color}).count()
                );
                chart.series[0].points[_.indexOf(list,newDoc.color)].update(
                    Dot.find({color:newDoc.color}).count()
                );
            }
        });
    });

    $('div[name=lineChart]').highcharts({
        title: {text: '모두의 도트 색상 라인 차트'},
        xAxis: {categories: self.colorList}
        ,
        series: [{
            type: 'line', name: '색상', data:[]
        },{
            type:'column',
            name:'색상',
            data:[]
        }]
    },function(){
        self.autorun(function(){
            if(subl.ready()){
                self.updateLine();
            }
        })
    });
})