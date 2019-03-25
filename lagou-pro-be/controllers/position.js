// 先运行mongodb:cmd下：mongod --dbpath D:\mongodb\data\db
const posModel = require("../models/position");
const moment = require("moment");

// 访问 /api/position/add 即点击提交按钮时触发
// 1. 保存前端发送的数据
const add = async (req,res,next)=>{
    //设置响应头
    res.setHeader("content-type","application/json;charset=UTF-8");
    req.body.createTime = moment().format("YYYY-MM-DD HH:mm");
    // 通过调用models/position里的save()保存 前端发送的数据
    // 根据save()的返回结果判定是否操作成功 
    const result = await  posModel.save(req.body);
    if(result){
        res.render("position.succ.ejs",{
            data: JSON.stringify({
                message: "success"
            })
        })
    }else{
        res.render("position.fail.ejs",{
            data:JSON.stringify({
                message:"fail"
            })
        })
    }
}

// 2.查找数据
const find = async (req,res,next)=>{
    // 在model 里定义find方法
    let result = await posModel.find();
    // 直接将结果返回前端
    res.render("position.succ.ejs",{
        data:JSON.stringify(result)
    });
}

// 3. 根据id查找
const findById = async (req,res,next)=>{
    let result = await posModel.findById(req.params.id);
    res.render("position.succ.ejs",{
        data:JSON.stringify(result)
    });
}

// 4. 根据id查找并更新
const update = async (req,res,next)=>{
    req.body.createTime = moment().format("YYYY-MM-DD HH:mm");

    let result = await posModel.findByIdAndUpdate(req.body);
    if(result){
        res.render("position.succ.ejs",{
            data: JSON.stringify({
                message: "success"
            })
        })
    }else{
        res.render("position.fail.ejs",{
            data:JSON.stringify({
                message:"fail"
            })
        })
    }
}

const remove = async (req,res,next)=>{
    let result = await posModel.remove(req.body.id)
    if(result){
        res.render("position.succ.ejs",{
            data: JSON.stringify({
                message: "success"
            })
        })
    }else{
        res.render("position.fail.ejs",{
            data:JSON.stringify({
                message:"fail"
            })
        })
    }
}

const query = async (req,res,next)=>{
    res.setHeader("content-type", "application/json;charset=UTF-8");
    const result = await posModel.query(req.body.keywords);
    if(result){
        res.render("position.succ.ejs",{
            data:JSON.stringify(result)
        })
    }else{
        res.render("position.fail.ejs"),{
            data: JSON.stringify({
                message: "fail"
            })
        }
    }
}

module.exports = {
    add,
    find,
    findById,
    update,
    remove,
    query
}

