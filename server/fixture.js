Meteor.startup(()=>{
    if(!Container.findOne({_id:"MeteorSchool"})){
        Container.insert({_id:"MeteorSchool",name:"MeteorSchool"});

        var size=50 * 50;

        for(var i =0; i<size;i++){
            var color = i%17==0?"black":"white";
            Dot.insert({pid:"MeteorSchool",idx:i,color:color});
        }
    }
})