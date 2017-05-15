(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){"use strict";var matchHtmlRegExp=/["'&<>]/;module.exports=escapeHtml;function escapeHtml(string){var str=""+string;var match=matchHtmlRegExp.exec(str);if(!match){return str}var escape;var html="";var index=0;var lastIndex=0;for(index=match.index;index<str.length;index++){switch(str.charCodeAt(index)){case 34:escape="&quot;";break;case 38:escape="&amp;";break;case 39:escape="&#39;";break;case 60:escape="&lt;";break;case 62:escape="&gt;";break;default:continue}if(lastIndex!==index){html+=str.substring(lastIndex,index)}lastIndex=index+1;html+=escape}return lastIndex!==index?html+str.substring(lastIndex,index):html}},{}],2:[function(require,module,exports){"use strict";var _navbar=require("./partials/navbar");var _navbar2=_interopRequireDefault(_navbar);var _form=require("./partials/form");var _form2=_interopRequireDefault(_form);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}$(document).ready(function(){_navbar2.default.init();_form2.default.init()})},{"./partials/form":3,"./partials/navbar":4}],3:[function(require,module,exports){"use strict";var escape=require("escape-html");var $apiUrl=$("#api-url");var rootUrl="/free-code-camp/image-search";var $options=$("#dateRestrictNum").add("#dateRestrictType").add("input[name=imgSize]").add("input[name=imgType]").add("input[name=imgDominantColor]").add("input[name=imgColorType]").add("input[name=safe]");var optionSelectors=[["#search","search"],["input[name=imgSize]:checked","imgSize"],["input[name=imgType]:checked","imgType"],["input[name=imgDominantColor]:checked","imgDominantColor"],["input[name=imgColorType]:checked","imgColorType"],["input[name=safe]:checked","safe"]];function createImage(thumbnailLink,link,snippet){var anchor=document.createElement("a");anchor.setAttribute("href",link);anchor.setAttribute("target","_blank");anchor.setAttribute("rel","noopener");var img=document.createElement("img");img.setAttribute("src",thumbnailLink);img.setAttribute("alt",snippet);img.setAttribute("title",snippet);img.className+="image";anchor.appendChild(img);return anchor}var formMethods={$imagesModal:null,$modalHeader:null,init:function init(){$apiUrl.html(window.location.origin+(rootUrl+"/api?search=grumpycat&start=1"));$apiUrl.attr("href",window.location.origin+(rootUrl+"/api?search=grumpycat&start=1"));$("select").material_select();$(".modal").modal();formMethods.$imagesModal=$("#images-modal");formMethods.$modalHeader=$("#modal-header");$("#search").on("input",formMethods.buildUrl);$("#search").on("keypress",function(e){if(e.keyCode===13){formMethods.getImages()}});$options.on("change",formMethods.buildUrl);$("#reset").click(formMethods.resetForm);$("#get-images").click(formMethods.getImages)},buildUrl:function buildUrl(){var urlHTML=window.location.origin+(rootUrl+"/api?");var drNum=$("#dateRestrictNum").val();var drType=$("#dateRestrictType").val();optionSelectors.forEach(function(selector){var value=escape($(selector[0]).val());var param=selector[1];if(value){urlHTML+=param+"="+value+"&"}});if(drNum&&drType){urlHTML+="dateRestrict="+drType+"["+drNum+"]&"}$apiUrl.html(urlHTML+"start=1");$apiUrl.attr("href",urlHTML+"start=1")},resetForm:function resetForm(){$("#dateRestrictNum").val("");$("input").attr("checked",false);$apiUrl.html(window.location.origin+(rootUrl+"/api?search=grumpycat&start=1"))},getImages:function getImages(){$("#images-container").empty();formMethods.$imagesModal.modal("open");formMethods.$modalHeader.html($("#search").val()===""?"Grumpy Cat":$("#search").val());$.get($("#api-url").html()).done(function(data){data=JSON.parse(data);console.log(data);var imagesArray=[];data.forEach(function(image){imagesArray.push(createImage(image.thumbnail,image.link,image.snippet))});$("#images-container").append(imagesArray)}).fail(function(err){console.log(err)})}};module.exports=formMethods},{"escape-html":1}],4:[function(require,module,exports){"use strict";module.exports={init:function init(){$(".button-collapse").sideNav()}}},{}]},{},[2]);