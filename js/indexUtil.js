
/*闭包写的工具类 */
(function ($) {
    /* 添加表格的标题 */
    var titleTableStr = '\
        <td width="1%" align="center">  </td> \
        <td width="3%" align="center">PlateNum</td>   \
        <td width="3%" align="center">RegisterDate</td> \
        <td width="3%" align="center">Contact</td>        \
        <td width="3%" align="center">Phone</td>\
        <td width="3%" align="center">ReserveDate</td>        \
        <td width="3%" align="center">ServiceType</td>        \
        <td width="3%" align="center">Addr</td>   \
        <td width="3%" align="center">BackNote</td>        \
        <td width="3%" align="center">Oper</td>   ';
    $('.table_header').html(titleTableStr);

    var tableData = {
        'data': {
            0:{
                'orderId':'1AAA',
                'PlateNum':11,
                'RegisterDate':22,
                'Contact':33,
                'Phone':'44',
                'ReserveDate':55,
                'ServiceType':66,
                'Addr':77,
                'BackNote':88,
                'Oper':99,
            },
            1:{
                'orderId':'2AAA',
                'PlateNum':'A11',
                'RegisterDate':22,
                'Contact':33,
                'Phone':11,
                'ReserveDate':'d',
                'ServiceType':11,
                'Addr':11,
                'BackNote':11,
                'Oper':11,
            }
        },
        'otherData':{
            'maxLen':3
        }
    };

    //首页 上一页 下一页 尾页 绑定监听事件
    pageClickFunDefault();

    var page_num = 2; //每页的条数
    var nowPageNum = 2; //当前的页数
    var totalPageNum = 0; // 总页数

    //填充表格
    dataTableFill(tableData);


    //函数：取出数据，填充表格
    function dataTableFill(inputData)
    {
        var data = inputData.data;
        var maxLen = inputData.otherData.maxLen;
        var iSum = Object.getOwnPropertyNames(data).length ;

        //清除表格信息
        $( "#dataTableId tr:nth-child(n+2)").remove();

        //设置当前页面编号
        if (maxLen) {
            totalPageNum = Math.ceil(maxLen / page_num);
            setPageNum(totalPageNum, nowPageNum);
            $('#totalNum').html(maxLen);
        } else {
            $('#totalNum').html(0);
            return;
        }
        //填充表单的内容
        var jStr = '';
        var newRow = ''; //新的一行
        for (var i = 0; i < iSum; ++i) {
            jStr = "<td width='1%' align='center' ><input class='isCheckIndex' type='checkbox'  value=' " 
                + data[i]['orderId'] +"' ></input></td>";
            jStr += "<td  width='3%' align='center' class='cellphone' >" +data[i]['PlateNum'] + "</td>";
            jStr += "<td  width='3%' align='center' class='cellphone' >" +data[i]['RegisterDate'] + "</td>";
            jStr += "<td  width='3%' align='center' class='cellphone' >" +data[i]['Contact'] + "</td>";
            jStr += "<td  width='3%' align='center' class='plateNum'>" +data[i]['Phone'] + "</td>";
            jStr += "<td  width='3%' align='center' class='name'>" +data[i]['ReserveDate'] + "</td>";
            jStr += "<td  width='3%' align='center' class='freeFee'>" +data[i]['ServiceType'] + "</td>";
            jStr += "<td  width='3%' align='center' class='freeFee'>" +data[i]['Addr'] + "</td>";
            jStr += "<td  width='3%' align='center' class='freeFee'>" +data[i]['BackNote'] + "</td>";
            jStr += "<td  width='3%' align='center' class='freeFee'>" +data[i]['Oper'] + "</td>";
            newRow = "<tr class='table_data' id=" + 'tr' + data[i]['orderId'] +">" + jStr + "</tr>";
            $( '#dataTableId').append(newRow);
        }

        //为全部页绑定监听事件
        pageClickFunAdd();

    }
 
    //函数：为全部页绑定监听事件
     function pageClickFunAdd()
    {
        var value = "pageUl li";
        pageClickBase(value);
    }

    //函数：默认的 首页 上一页 下一页 尾页 绑定监听事件
    function pageClickFunDefault()
    {
        var i = 0;
        var pageArr = [ 'FirstPageNum',  'previousPageNum',  'nextPageNum', 'LastPageNum' ];
        for(i = 0; i <pageArr.length; ++i ) {
            pageClickBase(pageArr[i] );
        }
    }

    //函数：为每一页绑定监听事件
     function pageClickBase(e)
     {    
        value = '#' + e;
        var  requestPageNum = 0;
          $(value).click(function () {
              var totalPageNum_1 = parseInt(totalPageNum );
              var nowPageNum_1 = parseInt(nowPageNum );
              switch(e)
              {
                  case 'FirstPageNum'://首页
                      requestPageNum = 1;// 请求的是第几页
                  break;

                  case 'previousPageNum'://上一页
                      if (nowPageNum_1 <= 1) {
                          requestPageNum = 1;
                      } else {
                          requestPageNum = nowPageNum_1 - 1;// 请求的是第几页
                      }
                  break;
                  case 'nextPageNum'://下一页
                      if (nowPageNum_1 >= totalPageNum_1 ){
                           requestPageNum = totalPageNum_1;// 请求的是第几页 
                      } else {
                            requestPageNum = nowPageNum_1 +1;// 请求的是第几页 
                      }

                  break;
                  case 'LastPageNum'://最后一页
                       requestPageNum = totalPageNum_1;// 请求的是第几页 
                  break;

                  case 'pageUl li':
                      requestPageNum = parseInt($(this).html());
                  break;

                  default:
                  break;
              }//end of switch
              pageAjax(requestPageNum);
      });
     }
     //函数：获取具体页的信息
     function pageAjax(requestPageNum)
     {
        var start = (requestPageNum -1) * page_num;

        var sendData = {
            'type': 'searchRequest',
            'start':start,
            'num':page_num,
        };
        alert(requestPageNum);
        nowPageNum = requestPageNum;
        dataTableFill(tableData);

        return;
        $.ajax({
            type:"POST",
            url:"/Operation.php",
            data:defaultSendData ,
            async:false,
            dataType:'json',
            success:function (data) {
                if (data.result == 'success001') {
                    dataTableFill(data);
                } 
            }
        });//end of ajax
     }

    //设置当前页面编号
    function setPageNum(totalPageNum, nowPage)
    {
        var otherPageStr = "<ul id='pageUl' style=' display:inline;  ' >  ";

        for (var i = 1; i <= totalPageNum ; i++) {
            if (i == nowPage) {
                otherPageStr += "<li  style='margin-left:10px'><u>" + i + '</u></li>';
            } else {
                otherPageStr += " <li  style='margin-left:10px'>" + i + '</li>';
            }
        }
        otherPageStr += '</ul>';
        $('#otherPageNum').html(otherPageStr);
    }

    //操作：全选
    var allCheckBoxValue = true;//  flag of SELECT OF ALL or NOT ALL
    $('.allCheckBox_C').click(function (){
        $('.isCheckIndex').each(function (){
            $(this).prop('checked', allCheckBoxValue);
        });
        allCheckBoxValue = ! allCheckBoxValue;
    });

    //操作：批量指派
    $('.batchAssign_C').click(function (){

        var isCheck = '';
        $('.isCheckIndex').each(function() {
            if ($(this).prop('checked')) {
                isCheck = 'A';
                return false;
            }
        })
        if (isCheck == '') {
            alert('没有勾选!');
            return;
        }

        var orderIdTmp = '';
        var orderId = '';
        i = 0;
        //删除多个，从 勾选的；
        $('.isCheckIndex').each(function() {
            orderIdTmp = $(this).val();
            if ($(this).prop('checked')) {
                if (i == 0) {
                    orderId = orderIdTmp;
                } else {
                    orderId = orderId + ',' +orderIdTmp;
                }
                ++i;
            }
        })

        alert(orderId);
        /*var title = '指派业务员';
         content = "<iframe src=/CarInspectionOrderAssign2.php?tab=tab1&assignType=batchAssgin&orderId="+ orderId  + '&testSelect=' + defaultTest +" width='100%' height='100%' scrolling='no' marginheight='0' frameborder='0'  ></iframe>";
           
        openBigDialog(title, content);*/
    });

    //html 显示时钟
    var tSetTime  = setTimeout(showTimeFun,1000);//开始执行
    function showTimeFun()
    {
       clearTimeout(tSetTime);//清除定时器
       var dt = new Date();
       var y = dt.getFullYear();
       var month = dt.getMonth() + 1;
       if (month < 10) {
            month = '0' + month;
       }
       var d = dt.getDate();
       if (d < 10) {
            d = '0' + d;
       }
       var h=dt.getHours();
       if (h < 10) {
            h = '0' + h;
       }
       var m=dt.getMinutes();
       if (m < 10) {
            m = '0' + m;
       }
       var s=dt.getSeconds();
       if (s < 10) {
            s = '0' + s;
       }
       document.getElementById("showTimeId").innerHTML =  "NowTime: "+ y +  "-" + month + "-" +d +  " "  + h+ ":" +m+":"+s;
       tSetTime = setTimeout(showTimeFun,1000); //设定定时器，循环执行             
    } 

})($);
