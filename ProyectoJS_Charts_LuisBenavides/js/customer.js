const jsonObj = {
    status: 0,
    message: "",
    currencyParameter: "Local",
    dateAsOf: "null",
    specialDate: "null",
    statementData: [
      {
        date: "2021-03-12T06:00:00.000Z",
        dueDate: "2021-03-13T06:00:00.000Z",
        days: 25,
        docNumber: "10021146",
        docType: "FACT",
        details: "Factura de clientes",
        original: 1171479.54,
        balance: 251478.21,
        future: 0,
        Due_1_30: 251478.21,
        Due_31_60: 0,
        Due_61_90: 0,
        Due_91_120: 0,
        Due_121_more: 0,
        JECurrency: "CRC",
        NumAtCard: null,
        docEntry: 5588,
        objType: "13",
      },
      {
        date: "2021-03-19T06:00:00.000Z",
        dueDate: "2021-03-20T06:00:00.000Z",
        days: 18,
        docNumber: "10021254",
        docType: "FACT",
        details: "Factura de clientes",
        original: 1871045.13,
        balance: 1837710.13,
        future: 0,
        Due_1_30: 1837710.13,
        Due_31_60: 0,
        Due_61_90: 0,
        Due_91_120: 0,
        Due_121_more: 0,
        JECurrency: "CRC",
        NumAtCard: null,
        docEntry: 5735,
        objType: "13",
      },
      {
        date: "2021-03-27T06:00:00.000Z",
        dueDate: "2021-03-28T06:00:00.000Z",
        days: 10,
        docNumber: "10021388",
        docType: "FACT",
        details: "Factura de clientes",
        original: 1221246.3,
        balance: 1221246.3,
        future: 0,
        Due_1_30: 1221246.3,
        Due_31_60: 0,
        Due_61_90: 0,
        Due_91_120: 0,
        Due_121_more: 0,
        JECurrency: "CRC",
        NumAtCard: null,
        docEntry: 5896,
        objType: "13",
      },
      {
        date: "2021-04-05T06:00:00.000Z",
        dueDate: "2021-04-06T06:00:00.000Z",
        days: 1,
        docNumber: "10021436",
        docType: "FACT",
        details: "Factura de clientes",
        original: 1881307.39,
        balance: 1881307.39,
        future: 0,
        Due_1_30: 1881307.39,
        Due_31_60: 0,
        Due_61_90: 0,
        Due_91_120: 0,
        Due_121_more: 0,
        JECurrency: "CRC",
        NumAtCard: null,
        docEntry: 5966,
        objType: "24",
      },
    ],
    cardCode: "C00007",
    cardName: "INVERSIONES S.A",
    paymentGroup: "A 1 día",
    creditLine: 1000000,
    phone: "85231000",
    contact: "JOSE ANDRADE",
    currency: "Todas",
    email: "inversionessa@gmail.com",
    slpName: "KRISSIA ARAYA",
    agentSupport: "SIN DEFINIR",
    extraDays: 1,
    plazo: 1,
    plazo30: 30,
    plazo60: 60,
    plazo90: 90,
    paymentsData: {
      status: 0,
      year: "2021",
      month: "4",
      sales: 41957585.99,
      payment: 36701506,
      salesM6: 5811030.9,
      salesM5: 5216356.91,
      salesM4: 5590180.09,
      salesM3: 11376165.29,
      salesM2: 5160094.76,
      salesM1: 6649083.95,
      salesM0: 2154674.09,
      paymentM6: 4809576,
      paymentM5: 4257056,
      paymentM4: 7015343,
      paymentM3: 7050186,
      paymentM2: 6145000,
      paymentM1: 6504345,
      paymentM0: 920000,
      month0: "2021-04-30T06:00:00.000Z",
      month1: "2021-03-31T06:00:00.000Z",
      month2: "2021-02-28T06:00:00.000Z",
      month3: "2021-01-31T06:00:00.000Z",
      month4: "2020-12-31T06:00:00.000Z",
      month5: "2020-11-30T06:00:00.000Z",
      month6: "2020-10-31T06:00:00.000Z",
    },
    paymentsWeeklyData: {
      status: 0,
      year: "2021",
      month: "4",
      sales: 9751700.83,
      payment: 9324345,
      salesM6: 947942.79,
      salesM5: 2001939.84,
      salesM4: 1197159.74,
      salesM3: 2236470.65,
      salesM2: 1213513.72,
      salesM1: 0,
      salesM0: 2154674.09,
      paymentM6: 1900000,
      paymentM5: 2035546,
      paymentM4: 1200000,
      paymentM3: 1135879,
      paymentM2: 1456720,
      paymentM1: 676200,
      paymentM0: 920000,
      month0: "2021-04-05T06:00:00.000Z",
      month1: "2021-03-28T06:00:00.000Z",
      month2: "2021-03-21T06:00:00.000Z",
      month3: "2021-03-14T06:00:00.000Z",
      month4: "2021-03-07T06:00:00.000Z",
      month5: "2021-02-28T06:00:00.000Z",
      month6: "2021-02-21T06:00:00.000Z",
    },
  };


$(document).ready(function () {
    //servicios iniciales 
    callService(displayStatement);
    dataTableSetProperties();
});

/* Set properties for table */
function callService(displayFunction) {
    displayFunction(jsonObj);
  }

function displayStatement(json) {
    let statementData = json.statementData;
    let lineColor = "dark";
    let daysColor = "success";
    let balance = 0;
  
    let htmlBody = "";
  
    // statement table ---------------------------------------------------------------------------------------------------------
    for (var i = 0; i < statementData.length; i++) {
      $("#table1TableID").DataTable().destroy();
      balance += statementData[i].balance;
  
      lineColor = "dark";
      daysColor = "success";
      if (statementData[i].days > 0) {
        lineColor = "danger";
        daysColor = "danger";
      }
  
      var keyEntryValue = statementData[i].docEntry;
      if (statementData[i].objType === "24") {
        keyEntryValue = statementData[i].docNumber;
      }
  
      //htmlBody += '<tr  ondblClick = "showInvoiceModal(event)"  DocEntry = "' + keyEntryValue + '" ObjType = "'+ statementData[i].objType +'">';
      htmlBody +=
        '<tr  DocEntry = "' +
        keyEntryValue +
        '" ObjType = "' +
        statementData[i].objType +
        '">';
      htmlBody +=
        '<td class="text-truncate  text-center text-' +
        lineColor +
        '">' +
        statementData[i].docType +
        " " +
        statementData[i].docNumber +
        "</td>";
  
      if (statementData[i].NumAtCard !== null) {
        htmlBody +=
          '<td class="text-truncate  text-center"><span class="mr-2 badge badge-info" style= "width:90%">' +
          statementData[i].NumAtCard +
          "</span></td>";
      } else {
        htmlBody += "<td></td>";
      }
  
      var fecha = new Date(statementData[i].date);
      fecha =
        zeroFill(fecha.getDate()) +
        "/" +
        zeroFill(fecha.getMonth() + 1) +
        "/" +
        fecha.getFullYear();
      htmlBody +=
        '<td class="text-truncate  text-center text-' +
        lineColor +
        '">' +
        fecha +
        "</td>";
  
      htmlBody +=
        '<td class="text-truncate  text-center"><span class="mr-2 badge badge-' +
        daysColor +
        '" style= "width:50px">' +
        statementData[i].days +
        "</span></td>";
  
      fecha = new Date(statementData[i].dueDate);
      fecha =
        zeroFill(fecha.getDate()) +
        "/" +
        zeroFill(fecha.getMonth() + 1) +
        "/" +
        fecha.getFullYear();
      htmlBody +=
        '<td class="text-truncate  text-center text-' +
        lineColor +
        '">' +
        fecha +
        "</td>";
  
      htmlBody +=
        '<td class="text-truncate  text-right text-' +
        lineColor +
        '">' +
        currencyPipe(
          statementData[i].original,
          json.currencyParameter,
          false,
          2
        ) +
        "</td>";
      htmlBody +=
        '<td class="text-truncate  text-right text-' +
        lineColor +
        '">' +
        currencyPipe(statementData[i].balance, json.currencyParameter, false, 2) +
        "</td>";
      htmlBody +=
        '<td class="text-truncate  text-right text-' +
        lineColor +
        '">' +
        currencyPipe(balance, json.currencyParameter, false, 2) +
        "</td>";
      htmlBody += "</tr>";
    } //fin for statementData
    // agrega el HTML
    //$("#tbodytable1ID").DataTable().destroy();
    document.getElementById("tbodytable1ID").innerHTML = htmlBody;
    htmlBody = "";
  }


/*Set porpeties to tables*/

function dataTableSetProperties() {
    let table = new DataTable("#table1TableID", {
      //$('#table1TableID').DataTable({
      select: true,
      bSort: true,
      paging: true,
  
      columns: [
        { orderable: false },
        { orderable: false },
        null,
        null,
        null,
        null,
        null,
        null,
      ],
  
      language: {
        search: "Búsqueda:  ",
        paginate: {
          show: "Mostrando",
          first: "Primer",
          previous: "Anterior",
          next: "Siguiente",
          last: "Ultimo",
        },
        info: "Mostrando página _PAGE_  de _PAGES_",
        infoEmpty: "No hay datos",
        emptyTable: "No hay facturas pendientes",
      },
      pageLength: 10,
      dom: "Bfrtip",
      buttons: ["copy", "excel", "pdf", "print"],
    });
  }
  



/******************************************************
 * add zero for units
 * ****************************************************** */
function zeroFill(i) {
    return (i < 10 ? "0" : "") + i;
  }

  /******************************************************
   * Divide and if divisor is zero, return zero
   * I:  dividend, divider
   * O: division or zero
   * ****************************************************** */
  function percentPipe(number) {
    number = number * 100;
    return number.toDecimalFormat(1) + "%";
  }
  
  /******************************************************
   * Add a currency symbol, or returns ********* if indicator is true
   * I:  number, currency, indicator
   * O: amount with currency symbol or *********
   * ****************************************************** */
  function currencyPipe(number, currency, indicator, decimals) {
    if (indicator) {
      return "*********";
    }
  
    if (currency === "Local") {
      return "₡" + number.toDecimalFormat(decimals);
    } else if (currency === "Sistema") {
      return "$" + number.toDecimalFormat(decimals);
    } else {
      return "₡" + number.toDecimalFormat(decimals);
    }
  }
  
  /******************************************************
   * decimal_sep: character used as deciaml separtor, it defaults to '.' when omitted
   * thousands_sep: char used as thousands separator, it defaults to ',' when omitted
   * ****************************************************** */
  
  Number.prototype.toDecimalFormat = function (
    decimals,
    decimal_sep,
    thousands_sep
  ) {
    var n = this,
      c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
      d = decimal_sep || ".", //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)
      /*
      according to [https://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
      the fastest way to check for not defined parameter is to use typeof value === 'undefined' 
      rather than doing value === undefined.
      */
      t = typeof thousands_sep === "undefined" ? "," : thousands_sep, //if you don't want to use a thousands separator you can pass empty string as thousands_sep value
      sign = n < 0 ? "-" : "",
      //extracting the absolute value of the integer part of the number and converting to string
      i = parseInt((n = Math.abs(n).toFixed(c))) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;
    return (
      sign +
      (j ? i.substr(0, j) + t : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
      (c
        ? d +
          Math.abs(n - i)
            .toFixed(c)
            .slice(2)
        : "")
    );
  };
  