// 引入HTML文件
const homeTpl = require("./views/home.html");
const positionTpl = require("./views/position.html");
const positionAddTpl = require("./views/position.add.html");
const positionUpdateTpl = require("./views/position.update.html");

// 1. 点击首页或职位匹配，在.content里显示对应html
// 需要在index.html里找到这两个li,并给他们添加自定义属性：link
$('.sidebar-menu li[link]').on("click",function(){
    switch ($(this).attr("link")) {
        case "home.html":
            $(".content").html(homeTpl);
            break;
        case "position.html":
            positionTable();
    }
});

// 方法二：使用map()
// $(".content li[link]").on("click",function(){
//     let map = new Map();
//     map.set("home.html",homeTpl);
//     map.set("position.html",positionTpl);
//     $(".content").html( map.get( $(this).attr("link") ) )
// })

// 2. 点击position.html中的添加addbtn按钮
// content显示position.add.html
// 因为position.html是后续添加的，
//想动态获取事件，需要用事件委托方式
$(".content").on("click","#addbtn",function(){
    $(".content").html(positionAddTpl);
})

// (3. 7. ) 点击psition.add.html或position.update.html的提交按钮，用ajax请求发送提交的数据
$(".content").on("click","#possubmit",function(){
    let data = $("#possave").serialize();
    let from = $(this).attr("from");
    let url = from === "add" ? "/api/position/add" : "/api/position/update";
    $.ajax({
        type:"post",
        url:url,
        data:data,
        dataType:"json",
        success(result){
            if(result.ret){
                // $(".content").html(positionTpl);
                positionTable();
            }else{
                alert("操作失败！")
            }
        }
    })
})

// 4. 点击返回
$(".content").on("click","#posback" , function(){
    // $(".content").html(positionTpl);
    positionTable();
});

// 6. 点击修改：通过id查找，渲染positionUpdata.html
$(".content").on("click",".pos-edit",function(){
    // $(".content").html(positionUpdateTpl);
    let posid = $(this).attr("posid");

    $.ajax({
        url:"/api/position/"+posid,
        dataType:"json",
        success(result){
            // data是一个对象，在position.update.html中直接以对象的方式写入
            let html = template.render(positionUpdateTpl,{
                data:result.data
            });

            $(".content").html(html);
        }
    })
})

// 7. 点击删除
$(".content").on("click",".pos-remove",function(){
    let posid = $(this).attr("posid");
    // DELETE / /api/position/delete
    $.ajax({
        url:"/api/position/delete",
        type:"delete",
        dataType:"json",
        data:{
            id:posid
        },
        success(result){
            if(result.ret){
                positionTable();
            }else{
                alert("操作失败")
            }
        }
    })
})

// 8.搜索:实现模糊查找
$(".content").on("click","#possearch",function(){
    let keywords = $("input[name='pos_search']").val();

    $.ajax({
        url:"/api/position/query",
        type:"post",
        dataType:"json",
        data:{
            keywords
        },
        success(result){
            if(result.ret){
                let html = template.render(positionTpl,{
                    data:result.data
                })
                $(".content").html(html)
            }else{
                alert("操作失败")
            }
        }
    })
})

// 5. 写一个positionTbale()方法：通过find()查找数据，渲染在content里
function positionTable(){
    // 先在content里渲染空
    $(".content").html("");
    // ajax请求：/api/position/find
    $.ajax({
        url:"/api/position/find",
        dataType:"json",
        success(result){
            // 使用artTempalte渲染模板:已在index.html中映入template-web.js
            // 使用方法看看官网文档:template.render(source, options)  渲染源，参数
            // data是一个数组
            let html = template.render(positionTpl,{
                data:result.data
            })
            // content渲染更改够的模板
            $(".content").html(html);

        }
    })
}

// function positionTable(){
//     $(".content").html(positionTpl);
//     //发送 /api/position/find
//     $.ajax({
//         url:"/api/position/find",
//         dataType:"json",
//         success(result){
//             // console.log(result.data)
//             let liList = result.data.map((obj,index)=>{
//                 return `
//                     <tr>
//                         <td>${index+1}</td>
//                         <td><img width="50" height="50" src="https://www.lgstatic.com/i/image3/M00/12/AF/CgpOIFpu7ROAU0UaAAAvwWv_H_w082.jpg" alt=""></td>
//                         <td>${obj.companyName}</td>
//                         <td>${obj.positionName}</td>
//                         <td>${obj.city}</td>
//                         <td>${obj.createTime}</td>
//                         <td>${obj.salary}</td>
//                         <td>
//                             <button class="btn btn-sm btn-primary pos-edit" posid="{{$value._id}}"><span class="fa fa-edit"></span> 修改</button>
//                             <button class="btn btn-sm btn-danger pos-remove" posid="{{$value._id}}" filename="{{$value.companyLogo}}"><span class="fa fa-remove"></span> 删除</button>
//                         </td>
//                     </tr> 
//                 `
//             });
//             $('#table_first_tr').after(liList);
//         }
//     })
// }
