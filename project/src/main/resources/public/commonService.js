(function ($) {
  $.extend(true, window, {
      'ajaxGet': ajaxGet,
      'ajaxPost': ajaxPost,
      'getValByKey':getValByKey,
      'isEmpty':isEmpty,
      'isNotEmpty':isNotEmpty,
      'isInclude':isInclude,
      'createOptions':createOptions,
      'createCheck':createCheck,
      'createImg':createImg,
      'createElement':createElement,
      'createTable':createTable,
      'popupMsg':popupMsg,
      'closePopupWindow':closePopupWindow,
      'formateDateYMDHMslash':formateDateYMDHMslash,
      'transListToMap':transListToMap,
      'transGirdToMap':transGirdToMap,
      'getUrlParam':getUrlParam,
      'doValidation':doValidation
  });
  
  function ajaxGet(url,jsonData,callback){
      $.ajax({
            type : 'GET',
            url :url,
            data :jsonData,
            dataType : 'json',
            success : callback,
            error:function(data){
                alert(JSON.stringify(data))
            }
        });
  }
  
  function ajaxPost(url,jsonData,callback){
      $.ajax({
            type : 'POST',
            url :url,
            contentType: 'application/json;charset=UTF-8',
            data :JSON.stringify(jsonData),
            dataType : 'JSON',
            success : callback,
            error:function(data){
                alert(JSON.stringify(data));
            }
        });
  }
  
  function getValByKey(key) {
      var value;
      jQuery.i18n.properties({
          name : "message",
          path : "/myapp/resources/",
          language : "",
          mode : "map",
          callback : function() {
              value = jQuery.i18n.prop(key);
          }
      });
      return value;
  }
  
  function isEmpty(arg) {
      arg = $.trim(arg);
      if (typeof arg == 'undefined') {
          return true;
      } else {
          if (typeof arg == 'object') {
              return false;
          } else if (''==arg || null == arg || 'null' == arg || 'NaN' == arg) {
              return true;
          }
          return false;
      }
  }
  
  function isNotEmpty(arg) {
      var rslt = isEmpty(arg) ? false : true;
      return rslt;
  }
  
  /** ???????????????????????????
   * @param str ???
   * @param arr ??????
   */
  function isInclude(str,arr) {
    if (typeof arr == "object" && arr.length > 0) {
      var incluedeFlag = false;
      $.each(arr,function(){
        if (str == this || incluedeFlag) {
          incluedeFlag = true;
        }
      });
      return incluedeFlag;
    } else {
      return false;
    }
  }
  
  /** ??????<option>??????
   *
   * @param ele <option>????????????,???<select><dataset>
   * @param arrs ????????????,??????[{"code":"A","value":"NM"},{"code":"B","value":"NM2"}]
   */
  function createOptions(ele,arrs,firstBlank){
    if (isNotEmpty(firstBlank)) {
      let optionEle = createElement("option","","");
      ele.appendChild(optionEle);
    }
    $.each(arrs,function(){
      let optionEle = createElement("option","","");
      optionEle.value = this.code;
      optionEle.innerHTML = this.value;
      ele.appendChild(optionEle);
    });
  }
  
  /** ????????????,?????????
   *
   * @param eleInfo Radio???Checkbox???????????????{"id":test,"name":"hero.imgSrc",...}
   * @param infoList ????????????,??????[{"code":"A","value":"NM"},{"code":"B",,"value":"NM2"}]
   * @param parentEle Radio???Checkbox????????????????????????
   */
  function createCheck(eleInfo,infoList,parentEle) {
    if (isEmpty(infoList)){
      // ????????????????????????????????????
      infoList = [{"code":"1","value":"Yes"}];
      if ("radio" == eleInfo.type){
        infoList.push({"code":"0","value":"No"});
      }
    }
    
    $.each(infoList,function(){
      var gpEle = createElement("div","","checkItem");
      gpEle.style.display = ""
      var inputEle = createElement("input","","");
      inputEle.name = eleInfo.name;
      inputEle.className = eleInfo.classNm;
      inputEle.id = eleInfo.id;
      inputEle.type = eleInfo.type;
      inputEle.value = this.code;
      // readOnly
      if (eleInfo.readonly) {
        inputEle.setAttribute("disabled","");
      }
      // require
      if (isNotEmpty(eleInfo.require)) {
        inputEle.setAttribute("notempty","true");
      }
      gpEle.appendChild(inputEle);
      
      var labelEle = createElement("label","","");
      labelEle.innerHTML = this.value;
      labelEle.style.width = "auto";
      gpEle.appendChild(labelEle);
      
      parentEle.appendChild(gpEle);
    });
    
    // ??????
    var displayEle = createElement("span","","displayOnly");
    parentEle.appendChild(displayEle);
  }
  
  /** ??????????????????<img>
   * @param arg js??????,???
   */
  function createImg(path,id,classNm,name){
      var imgEle = createElement('img',id,classNm,name);
      imgEle.src = path;
      return imgEle;
  }
  
  /** ??????html??????<img>
   * @param arg js??????,???
   */
  function createElement(type,id,classNm,name) {
    var ele = document.createElement(type);
    createAttr(ele,"id",id);
    createAttr(ele,"className",classNm);
    createAttr(ele,"name",name);
    return ele;
  }
  
  function createTable(paramObj,dataList){
    console.log(dataList);
    // Table
    var tableEle = createElement("table","","","");
    tableEle.setAttribute("cellspacing",0);
    tableEle.border = "1";
    tableEle.style.width = paramObj.width;
    tableEle.id = paramObj.id;
    
    // Thead
    var thead = createElement("thead","","","");
    var tr = createElement("tr","","","");
    // selectAll
    if (isNotEmpty(paramObj.selectAll)) {
      var th = createElement("th","","","");
      var selectAll = createElement("input","","","selectAll");
      selectAll.type = "checkbox";
      $(selectAll).on("click",function(){
        var tblEle = $(this).parents("table")[0];
        var checkCnt = $(tblEle).find("input[type='checkbox']");
        $(checkCnt).attr("checked",this.checked);
      });
      th.appendChild(selectAll);
      tr.appendChild(th);
    }
    $.each(paramObj.head,function(){
      var th = createElement("th","","","");
      th.innerHTML = this;
      tr.appendChild(th);
    });
    thead.appendChild(tr);
    tableEle.appendChild(thead);
    
    // Tbody
    var tbody = createElement("tbody","","","");
    $.each(dataList,function(){
      tr = createElement("tr","","","");
      // selectAll
      if (isNotEmpty(paramObj.selectAll)) {
        var selectTd = createElement("td","","","");
        var checkedEle = createElement("input","","","");
        checkedEle.type = "checkbox";
        selectTd.appendChild(checkedEle);
        tr.appendChild(selectTd);
      }
      // data
      $.each(this,function(j,cell){
        var td = createElement("td","","","");
        td.innerHTML = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    
    });
    tableEle.appendChild(tbody);
    return tableEle;
  }
  
  /** ??????????????????
   * @param elementObj ??????
   * @param attrNm ??????
   * @param attrValue ???
   */
  function createAttr(elementObj,attrNm,attrValue){
    if (isNotEmpty(attrValue)){
      elementObj[attrNm] = attrValue;
    }
  }
  
  /** ????????????Data???yyyy/MM/DD HH:MI
  * @param dateVal Data????????????
  */
  function formateDateYMDHMslash(dateVal) {
    var rst = dateVal.getFullYear();
    rst += "-" + (parseInt(dateVal.getMonth()) +1);
    rst += "-" + dateVal.getDate();
    rst += "T" + dateVal.getHours();
    var sec = dateVal.getSeconds();
    if (parseInt(sec)<10) {
      sec = "0" + sec;
    }
    rst += ":" + sec;
    return rst;
  }
  
  /** ???????????????????????????
   *
   */
  function popupMsg(errorMsg){
    $("#popup").show(50);
    $("#messageArea").html(errorMsg);
  }

  /** ????????????????????????
   *
   */
  function closePopupWindow() {
    $("#messageArea").html("");
    $("#popup").hide();
  }
  
  /** ????????????
   *
   */
  function doValidation(docAreaEle){
    // ??????
    $(".error").prop('class','');
    let errorMsg = "";
    // ??????????????????
    let firstFlag = false;
    // ????????????
    let partFlag = isNotEmpty(docAreaEle);
    // ??????????????????
    let inputEleList;
    if (partFlag) {
      inputEleList = $(docAreaEle).find("input[type='text']");
    } else {
      inputEleList = $("input[type='text']");
    }
    $.each(inputEleList,function(){
      // ????????????
      if(!this.disabled) {
        let titleEle = $(this).prev()[0];
        let title = titleEle.innerHTML;
        // ??????????????????
        if(isNotEmpty(this.attributes.notempty) && isEmpty(this.value)) {
          this.placeholder = 'please input value!';
          this.className = this.className + "error";
          //
          title += "?????????<br>";
          errorMsg += title;
          if (!firstFlag) {
            this.focus();
            firstFlag = true;
          }
        }
  
        // ????????????
        if(isNotEmpty(this.attributes.validation) && isNotEmpty(this.value)) {
          title += "???????????????<br>";
          errorMsg += title;
          let valType = this.attributes.validation.value;
          // TODO
          if (!firstFlag && false) {
            this.focus();
            firstFlag = true;
          }
        }
      }
    });

    // ??????????????????
    let radioEles;
    if (partFlag) {
      radioEles = $(docAreaEle).find("input[type='radio'],[type='checkbox']");
    } else {
      radioEles = $("input[type='radio'],[type='checkbox']");
    }
    let namesCond = [];
    $.each(radioEles,function(){
      if(this.disabled){
        return;
      }
      if (this.name.indexOf(".")>0) {
        if(!isInclude(this.name , namesCond)){
          namesCond.push(this.name);
        } else {
          return;
        }
      }
    });
    
    // ????????????Json
    let formObj = $("#infoForm").serializeObject();
    // ????????????????????????
    $.each(namesCond,function(){
      let radioEle = $("input[name='"+this+"']")[0];
      let parentEle = $(radioEle).parents("div[class='inputCell']")[0];
      let msgSpan = $(parentEle).find("span")[0];
      msgSpan.innerHTML = "";
      
      let titleEle = $(parentEle).find("label")[0];
      let title = titleEle.innerHTML;
      title += "?????????<br>";
      errorMsg += title;
      
      let value = "";
      // ?????????????????????
      let objNm;
      let attrNm;
      if (this.indexOf(".") > 0) {
        objNm = this.split(".")[0];
        attrNm = this.split(".")[1];
        // Null
        if (isEmpty(formObj[objNm]) || isEmpty(formObj[objNm][attrNm])){
          value = "";
        } else {
          value = formObj[objNm][attrNm];
        }
      } else {
        value = formObj[objNm];
      }
      // ??????
      if (isNotEmpty(radioEle.attributes.notempty) && isEmpty(value)) {
          msgSpan.innerHTML = attrNm + " input please!";
          firstFlag = true;
          return;
        }
    });
  
    //
    if(!firstFlag) {
      console.dir(formObj);
      return false;
    } else {
      popupMsg(errorMsg);
      return true;
    }
  }
  
  /** ???list??????group?????????map
   * @param dataList ????????????
   * @param mapKey ????????????
   * @param singleFlag ????????????
   */
  function transListToMap(dataList,mapKey,singleFlag) {
    var resultMap = {};
    $.each(dataList,function(i,data){
      var keyValue = data[mapKey];
      // map?????????check
      if(isEmpty(resultMap[keyValue])) {
        resultMap[keyValue] = [];
      }
      // ?????????flag
      if (singleFlag) {
        resultMap[keyValue] = data;
        return;
      } else if (isNotEmpty(keyValue) && '99'!=keyValue){
        resultMap[keyValue].push(data);
      }
    });
    return resultMap;
  }
  
  /** ?????????????????????????????????????????????1??????Map
  * 
  * @param dataList ???????????????
  * @param attrId Group????????????
  * @param strSplit ?????????
  * @param uniqueList ????????????List
  */
  function transGirdToMap(dataList,attrId,strSplit,uniqueList){
    var resultMap = {};
    var code = 1;
    $.each(dataList,function(i,data){
      var attrList;
      if (isNotEmpty(strSplit)) {
        attrList = data[attrId].split(strSplit);
      } else {
        attrList = data[attrId];
      }
      // ????????????
      $.each(attrList,function(j,attr){
        if (isEmpty(resultMap[attr])) {
          resultMap[attr] = [];
          resultMap[attr].push(data.id);
          uniqueList.push({"code":code++,"value":attr});
        } else {
          resultMap[attr].push(data.id);
        }
      });
    });
    return resultMap;
  }
  
  /** ??????get??????url????????????
   * @return ????????????{'key' : value1 ,'key2' : value2}
   */
  function getUrlParam(){
    let paramText = window.location.search;
    paramText = paramText.replace('?','');
    paramText = paramText.split('&');
    let paramObj = {};
    $.each(paramText,function(){
      let key = this.split('=')[0];
      let val = this.split('=')[1];
      paramObj[key] = val;
    });
    return paramObj;
  }

  $.fn.serializeObject = function(){
      var jsonObj = {};
      var formParam = this.serializeArray();
      $.each(formParam,function(){
        if ("undefined" != this.name) {
          var keyName = this.name.split('.');
          if(keyName.length>1){
              var innerObjKey = keyName[0];
              if(jsonObj.hasOwnProperty(innerObjKey)){
                  jsonObj[this.name.split('.')[0]][this.name.split('.')[1]] = this.value || '';
              } else {
                  jsonObj[this.name.split('.')[0]] = {};
                  jsonObj[this.name.split('.')[0]][this.name.split('.')[1]] = this.value || '';
              }
          } else {
              if(jsonObj.hasOwnProperty(this.name)){
                jsonObj[this.name].push(this.value || '');
              } else {
                jsonObj[this.name] = this.value;
              }
          }
        }
      });
      return jsonObj;
  }
  
})(jQuery);
