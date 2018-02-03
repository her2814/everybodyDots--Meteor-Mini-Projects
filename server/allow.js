Dot.allow({
    update(userId,doc){
        return doc._id && doc.pid && doc.idx && doc.color;
    }
})