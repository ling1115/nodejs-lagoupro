const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/lagou",{useNewUrlParser:true}); //解决警告问题

module.exports = mongoose;