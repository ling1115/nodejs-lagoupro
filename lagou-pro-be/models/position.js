const db = require("../utils/util.mongodb");

// 设置字段类型
const positionSchema = db.Schema({
    city:{type:String,required:true},  // 字段类型，是否为必填项
    companyName: { type: String, required: true },
    degree: { type: String, required: true },
    description: { type: String, required: true },
    experience: { type: String, required: true },
    positionName: { type: String, required: true },
    salary: { type: String, required: true },
    type: { type: String, required: true },
    createTime:{type:String,required:true}
})
// 创建集合：集合名称，字段规范
const Position = db.model("positions", positionSchema);

// 1. 插入数据:写一个save方法保存数据
const save = (data)=>{
    let position = new Position(data);
    return position.save()//这个save()是mongoose对象里的属性 返回promise对象，因为执行异步插入操作
            .then(result=>{
                return true;
            })
            .catch(err=>{
                return false;
            })
}

// 2. 查找
const find = ()=>{
    return Position.find();
}

// 3. id查找
const findById = (id)=>{
    return Position.findById(id);
}

// 4. 根据id查找并更新
const findByIdAndUpdate = (data)=>{
    return Position.findByIdAndUpdate(data.id,data)
            .then(result=>{
                return true
            })
            .catch(err=>{
                return false
            })
}

// 5. 删除
const remove = (id)=>{
    return Position.findByIdAndRemove(id)
            .then(result=>{
                return true
            })
            .catch(err=>{
                return false
            })
}

// 6. 搜索：模糊搜索：对条件：$or
const query = (keywords)=>{
    let reg = new RegExp(keywords,"ig");
    return Position.find({
        $or: [ // 多条件：数组
            { positionName: {$regex:reg} },
            { companyName: {$regex:reg} },
            { city: {$regex:reg} },
            { saray: {$regex:reg} },
        ]
    })
}

module.exports = {
    save,
    find,
    findById,
    findByIdAndUpdate,
    remove,
    query
}