/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 引入HTML文件\r\nconst homeTpl = __webpack_require__(/*! ./views/home.html */ \"./src/scripts/views/home.html\");\r\nconst positionTpl = __webpack_require__(/*! ./views/position.html */ \"./src/scripts/views/position.html\");\r\nconst positionAddTpl = __webpack_require__(/*! ./views/position.add.html */ \"./src/scripts/views/position.add.html\");\r\nconst positionUpdateTpl = __webpack_require__(/*! ./views/position.update.html */ \"./src/scripts/views/position.update.html\");\r\n\r\n// 1. 点击首页或职位匹配，在.content里显示对应html\r\n// 需要在index.html里找到这两个li,并给他们添加自定义属性：link\r\n$('.sidebar-menu li[link]').on(\"click\",function(){\r\n    switch ($(this).attr(\"link\")) {\r\n        case \"home.html\":\r\n            $(\".content\").html(homeTpl);\r\n            break;\r\n        case \"position.html\":\r\n            positionTable();\r\n    }\r\n});\r\n\r\n// 方法二：使用map()\r\n// $(\".content li[link]\").on(\"click\",function(){\r\n//     let map = new Map();\r\n//     map.set(\"home.html\",homeTpl);\r\n//     map.set(\"position.html\",positionTpl);\r\n//     $(\".content\").html( map.get( $(this).attr(\"link\") ) )\r\n// })\r\n\r\n// 2. 点击position.html中的添加addbtn按钮\r\n// content显示position.add.html\r\n// 因为position.html是后续添加的，\r\n//想动态获取事件，需要用事件委托方式\r\n$(\".content\").on(\"click\",\"#addbtn\",function(){\r\n    $(\".content\").html(positionAddTpl);\r\n})\r\n\r\n// (3. 7. ) 点击psition.add.html或position.update.html的提交按钮，用ajax请求发送提交的数据\r\n$(\".content\").on(\"click\",\"#possubmit\",function(){\r\n    let data = $(\"#possave\").serialize();\r\n    let from = $(this).attr(\"from\");\r\n    let url = from === \"add\" ? \"/api/position/add\" : \"/api/position/update\";\r\n    $.ajax({\r\n        type:\"post\",\r\n        url:url,\r\n        data:data,\r\n        dataType:\"json\",\r\n        success(result){\r\n            if(result.ret){\r\n                // $(\".content\").html(positionTpl);\r\n                positionTable();\r\n            }else{\r\n                alert(\"操作失败！\")\r\n            }\r\n        }\r\n    })\r\n})\r\n\r\n// 4. 点击返回\r\n$(\".content\").on(\"click\",\"#posback\" , function(){\r\n    // $(\".content\").html(positionTpl);\r\n    positionTable();\r\n});\r\n\r\n// 6. 点击修改：通过id查找，渲染positionUpdata.html\r\n$(\".content\").on(\"click\",\".pos-edit\",function(){\r\n    // $(\".content\").html(positionUpdateTpl);\r\n    let posid = $(this).attr(\"posid\");\r\n\r\n    $.ajax({\r\n        url:\"/api/position/\"+posid,\r\n        dataType:\"json\",\r\n        success(result){\r\n            // data是一个对象，在position.update.html中直接以对象的方式写入\r\n            let html = template.render(positionUpdateTpl,{\r\n                data:result.data\r\n            });\r\n\r\n            $(\".content\").html(html);\r\n        }\r\n    })\r\n})\r\n\r\n// 7. 点击删除\r\n$(\".content\").on(\"click\",\".pos-remove\",function(){\r\n    let posid = $(this).attr(\"posid\");\r\n    // DELETE / /api/position/delete\r\n    $.ajax({\r\n        url:\"/api/position/delete\",\r\n        type:\"delete\",\r\n        dataType:\"json\",\r\n        data:{\r\n            id:posid\r\n        },\r\n        success(result){\r\n            if(result.ret){\r\n                positionTable();\r\n            }else{\r\n                alert(\"操作失败\")\r\n            }\r\n        }\r\n    })\r\n})\r\n\r\n// 8.搜索:实现模糊查找\r\n$(\".content\").on(\"click\",\"#possearch\",function(){\r\n    let keywords = $(\"input[name='pos_search']\").val();\r\n\r\n    $.ajax({\r\n        url:\"/api/position/query\",\r\n        type:\"post\",\r\n        dataType:\"json\",\r\n        data:{\r\n            keywords\r\n        },\r\n        success(result){\r\n            if(result.ret){\r\n                let html = template.render(positionTpl,{\r\n                    data:result.data\r\n                })\r\n                $(\".content\").html(html)\r\n            }else{\r\n                alert(\"操作失败\")\r\n            }\r\n        }\r\n    })\r\n})\r\n\r\n// 5. 写一个positionTbale()方法：通过find()查找数据，渲染在content里\r\nfunction positionTable(){\r\n    // 先在content里渲染空\r\n    $(\".content\").html(\"\");\r\n    // ajax请求：/api/position/find\r\n    $.ajax({\r\n        url:\"/api/position/find\",\r\n        dataType:\"json\",\r\n        success(result){\r\n            // 使用artTempalte渲染模板:已在index.html中映入template-web.js\r\n            // 使用方法看看官网文档:template.render(source, options)  渲染源，参数\r\n            // data是一个数组\r\n            let html = template.render(positionTpl,{\r\n                data:result.data\r\n            })\r\n            // content渲染更改够的模板\r\n            $(\".content\").html(html);\r\n\r\n        }\r\n    })\r\n}\r\n\r\n// function positionTable(){\r\n//     $(\".content\").html(positionTpl);\r\n//     //发送 /api/position/find\r\n//     $.ajax({\r\n//         url:\"/api/position/find\",\r\n//         dataType:\"json\",\r\n//         success(result){\r\n//             // console.log(result.data)\r\n//             let liList = result.data.map((obj,index)=>{\r\n//                 return `\r\n//                     <tr>\r\n//                         <td>${index+1}</td>\r\n//                         <td><img width=\"50\" height=\"50\" src=\"https://www.lgstatic.com/i/image3/M00/12/AF/CgpOIFpu7ROAU0UaAAAvwWv_H_w082.jpg\" alt=\"\"></td>\r\n//                         <td>${obj.companyName}</td>\r\n//                         <td>${obj.positionName}</td>\r\n//                         <td>${obj.city}</td>\r\n//                         <td>${obj.createTime}</td>\r\n//                         <td>${obj.salary}</td>\r\n//                         <td>\r\n//                             <button class=\"btn btn-sm btn-primary pos-edit\" posid=\"{{$value._id}}\"><span class=\"fa fa-edit\"></span> 修改</button>\r\n//                             <button class=\"btn btn-sm btn-danger pos-remove\" posid=\"{{$value._id}}\" filename=\"{{$value.companyLogo}}\"><span class=\"fa fa-remove\"></span> 删除</button>\r\n//                         </td>\r\n//                     </tr> \r\n//                 `\r\n//             });\r\n//             $('#table_first_tr').after(liList);\r\n//         }\r\n//     })\r\n// }\r\n\n\n//# sourceURL=webpack:///./src/scripts/app.js?");

/***/ }),

/***/ "./src/scripts/views/home.html":
/*!*************************************!*\
  !*** ./src/scripts/views/home.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>home</div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/home.html?");

/***/ }),

/***/ "./src/scripts/views/position.add.html":
/*!*********************************************!*\
  !*** ./src/scripts/views/position.add.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box box-info\\\">        <div class=\\\"box-header with-border\\\">          <h3 class=\\\"box-title\\\">职位添加</h3>        </div>        <!-- /.box-header -->        <!-- form start -->        <form class=\\\"form-horizontal\\\" id=\\\"possave\\\" action=\\\"/api/position\\\" method=\\\"post\\\" enctype=\\\"multipart/form-data\\\">          <div class=\\\"box-body\\\">            <div class=\\\"form-group\\\">              <label for=\\\"companyLogo\\\" class=\\\"col-sm-2 control-label\\\">公司Logo</label>                    <div class=\\\"col-sm-10\\\">                <input type=\\\"file\\\" class=\\\"form-control\\\" name=\\\"companyLogo\\\" id=\\\"companyLogo\\\" placeholder=\\\"请选择公司logo图片\\\">              </div>            </div>            <div class=\\\"form-group\\\">              <label for=\\\"companyName\\\" class=\\\"col-sm-2 control-label\\\">公司名称</label>                    <div class=\\\"col-sm-10\\\">                <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"companyName\\\" id=\\\"companyName\\\" placeholder=\\\"请输入公司名称\\\">              </div>            </div>            <div class=\\\"form-group\\\">              <label for=\\\"positionName\\\" class=\\\"col-sm-2 control-label\\\">职位名称</label>                    <div class=\\\"col-sm-10\\\">                <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"positionName\\\" id=\\\"positionName\\\" placeholder=\\\"请输入职位名称\\\">              </div>            </div>            <div class=\\\"form-group\\\">              <label for=\\\"city\\\" class=\\\"col-sm-2 control-label\\\">工作地点</label>                    <div class=\\\"col-sm-10\\\">                <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"city\\\" id=\\\"city\\\" placeholder=\\\"请输入工作地点\\\">              </div>            </div>            <div class=\\\"form-group\\\">              <label for=\\\"salary\\\" class=\\\"col-sm-2 control-label\\\">岗位薪资</label>                    <div class=\\\"col-sm-10\\\">                <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"salary\\\" id=\\\"salary\\\" placeholder=\\\"请输入岗位薪资\\\">              </div>            </div>            <div class=\\\"form-group\\\">              <label for=\\\"type\\\" class=\\\"col-sm-2 control-label\\\">工作性质</label>                    <div class=\\\"col-sm-10\\\">                <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"type\\\" id=\\\"type\\\" placeholder=\\\"请输入工作性质\\\">              </div>            </div>            <div class=\\\"form-group\\\">              <label for=\\\"experience\\\" class=\\\"col-sm-2 control-label\\\">工作经验</label>                    <div class=\\\"col-sm-10\\\">                <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"experience\\\" id=\\\"experience\\\" placeholder=\\\"请输入工作经验\\\">              </div>            </div>            <div class=\\\"form-group\\\">              <label for=\\\"degree\\\" class=\\\"col-sm-2 control-label\\\">学历要求</label>                    <div class=\\\"col-sm-10\\\">                <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"degree\\\" id=\\\"degree\\\" placeholder=\\\"请输入学历要求\\\">              </div>            </div>            <div class=\\\"form-group\\\">              <label for=\\\"description\\\" class=\\\"col-sm-2 control-label\\\">职位描述</label>                    <div class=\\\"col-sm-10\\\">                <textarea rows=\\\"8\\\" cols=\\\"80\\\" name=\\\"description\\\" class=\\\"form-control\\\" id=\\\"description\\\" placeholder=\\\"请输入职位描述\\\"></textarea>              </div>            </div>          </div>          <!-- /.box-body -->          <div class=\\\"box-footer\\\">            <button type=\\\"button\\\" id=\\\"posback\\\" class=\\\"btn btn-default\\\">返回</button>            <button from=\\\"add\\\" type=\\\"button\\\" id=\\\"possubmit\\\" class=\\\"btn btn-info pull-right\\\">提交</button>          </div>          <!-- /.box-footer -->        </form>      </div>      \"\n\n//# sourceURL=webpack:///./src/scripts/views/position.add.html?");

/***/ }),

/***/ "./src/scripts/views/position.html":
/*!*****************************************!*\
  !*** ./src/scripts/views/position.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box\\\">        <div class=\\\"box-header with-border\\\">          <h3 class=\\\"box-title\\\">             <button id=\\\"addbtn\\\" class=\\\"btn btn-block btn-success\\\"><span class=\\\"fa fa-plus\\\"></span> 添加</button>          </h3>          <div class=\\\"box-tools\\\">            <div class=\\\"input-group input-group-sm\\\" style=\\\"width: 150px;\\\">              <input type=\\\"text\\\" value=\\\"\\\" name=\\\"pos_search\\\" class=\\\"form-control pull-right\\\" placeholder=\\\"搜索\\\">                    <div class=\\\"input-group-btn\\\">                <button type=\\\"button\\\" id=\\\"possearch\\\" class=\\\"btn btn-default\\\"><i class=\\\"fa fa-search\\\"></i></button>              </div>            </div>          </div>        </div>        <!-- /.box-header -->        <div class=\\\"box-body\\\">          <table class=\\\"table table-bordered\\\">            <tr>              <th style=\\\"width: 10px\\\">#</th>              <th>公司Logo</th>              <th>公司名称</th>              <th>职位名称</th>              <th>工作地点</th>              <th>发布时间</th>              <th>岗位薪资</th>              <th style=\\\"width: 140px\\\">操作</th>            </tr>              {{each data}}              <tr>                <td>{{$index+1}}</td>                <td><img width=\\\"50\\\" height=\\\"50\\\" src=\\\"https://www.lgstatic.com/i/image3/M00/12/AF/CgpOIFpu7ROAU0UaAAAvwWv_H_w082.jpg\\\" alt=\\\"\\\"></td>                <td>{{$value.companyName}}</td>                <td>{{$value.positionName}}</td>                <td>{{$value.city}}</td>                <td>{{$value.createTime}}</td>                <td>{{$value.salary}}</td>                <td>                  <button class=\\\"btn btn-sm btn-primary pos-edit\\\" posid=\\\"{{$value._id}}\\\"><span class=\\\"fa fa-edit\\\"></span> 修改</button>                  <button class=\\\"btn btn-sm btn-danger pos-remove\\\" posid=\\\"{{$value._id}}\\\" filename=\\\"{{$value.companyLogo}}\\\"><span class=\\\"fa fa-remove\\\"></span> 删除</button>                </td>              </tr>              {{/each}}              <!-- <tr>                <td colspan=\\\"8\\\">暂无记录。</td>              </tr> -->          </table>        </div>        </div>      <!-- /.box -->\"\n\n//# sourceURL=webpack:///./src/scripts/views/position.html?");

/***/ }),

/***/ "./src/scripts/views/position.update.html":
/*!************************************************!*\
  !*** ./src/scripts/views/position.update.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box box-info\\\">    <div class=\\\"box-header with-border\\\">      <h3 class=\\\"box-title\\\">职位修改</h3>    </div>    <!-- /.box-header -->    <!-- form start -->    <form class=\\\"form-horizontal\\\" id=\\\"possave\\\" action=\\\"/api/position\\\" method=\\\"post\\\" enctype=\\\"multipart/form-data\\\">      <div class=\\\"box-body\\\">        <div class=\\\"form-group\\\">          <label for=\\\"companyLogo\\\" class=\\\"col-sm-2 control-label\\\">公司Logo</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"file\\\" class=\\\"form-control\\\" name=\\\"companyLogo\\\" id=\\\"companyLogo\\\" placeholder=\\\"请选择公司logo图片\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"companyName\\\" class=\\\"col-sm-2 control-label\\\">公司名称</label>            <div class=\\\"col-sm-10\\\">            <input value=\\\"{{data.companyName}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"companyName\\\" id=\\\"companyName\\\" placeholder=\\\"请输入公司名称\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"positionName\\\" class=\\\"col-sm-2 control-label\\\">职位名称</label>            <div class=\\\"col-sm-10\\\">            <input value=\\\"{{data.positionName}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"positionName\\\" id=\\\"positionName\\\" placeholder=\\\"请输入职位名称\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"city\\\" class=\\\"col-sm-2 control-label\\\">工作地点</label>            <div class=\\\"col-sm-10\\\">            <input value=\\\"{{data.city}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"city\\\" id=\\\"city\\\" placeholder=\\\"请输入工作地点\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"salary\\\" class=\\\"col-sm-2 control-label\\\">岗位薪资</label>            <div class=\\\"col-sm-10\\\">            <input value=\\\"{{data.salary}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"salary\\\" id=\\\"salary\\\" placeholder=\\\"请输入岗位薪资\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"type\\\" class=\\\"col-sm-2 control-label\\\">工作性质</label>            <div class=\\\"col-sm-10\\\">            <input value=\\\"{{data.type}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"type\\\" id=\\\"type\\\" placeholder=\\\"请输入工作性质\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"experience\\\" class=\\\"col-sm-2 control-label\\\">工作经验</label>            <div class=\\\"col-sm-10\\\">            <input value=\\\"{{data.experience}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"experience\\\" id=\\\"experience\\\" placeholder=\\\"请输入工作经验\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"degree\\\" class=\\\"col-sm-2 control-label\\\">学历要求</label>            <div class=\\\"col-sm-10\\\">            <input value=\\\"{{data.degree}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"degree\\\" id=\\\"degree\\\" placeholder=\\\"请输入学历要求\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"description\\\" class=\\\"col-sm-2 control-label\\\">职位描述</label>            <div class=\\\"col-sm-10\\\">            <textarea rows=\\\"8\\\" cols=\\\"80\\\" name=\\\"description\\\" class=\\\"form-control\\\" id=\\\"description\\\" placeholder=\\\"请输入职位描述\\\">{{data.description}}</textarea>          </div>        </div>      </div>      <!-- /.box-body -->      <div class=\\\"box-footer\\\">        <button type=\\\"button\\\" id=\\\"posback\\\" class=\\\"btn btn-default\\\">返回</button>        <button from=\\\"update\\\" type=\\\"button\\\" id=\\\"possubmit\\\" class=\\\"btn btn-info pull-right\\\">提交</button>      </div>      <input type=\\\"hidden\\\" name=\\\"id\\\" value=\\\"{{data._id}}\\\">      <!-- /.box-footer -->    </form>  </div>  \"\n\n//# sourceURL=webpack:///./src/scripts/views/position.update.html?");

/***/ })

/******/ });