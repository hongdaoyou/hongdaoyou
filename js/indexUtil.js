
/*闭包写的工具类 */
(function ($) {
    /* 添加表格的标题 */
    var titleTableStr = '\
        <td width="1%" align="center"> <input type="checkbox" class="allCheckBox" align="center">&nbsp;</td> \
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
            'maxLen':2
        }
    };

    //填充表格
    dataTableFill(tableData);

    //函数：取出数据，填充表格
    function dataTableFill(inputData)
    {
        var data = inputData.data;
        var iSum = inputData.otherData.maxLen;

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
    }


})($);
