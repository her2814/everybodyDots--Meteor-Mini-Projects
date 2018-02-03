import Highcharts from "highcharts";

Template.myChart.onCreated(function(){
    var self = this;
    self.colorList = [
        "black","silver","maroon","red",
        "navy","blue","purple","fuchsia",
        "green","lime","olive","yellow",
        "teal","aqua","gray","white"
    ];
});

Template.myChart.onRendred(function(){
    var self = this;
    $('div[name=pieChart]').highcharts({title:{text: '모두의 도트 색상 파이 차트'}});
})