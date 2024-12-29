
$(document).ready( function () {

    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {

        console.log('Received ID: ' + id);
        
        // Obtener el json del vendedor
        fetch('http://localhost:3000/salespersons/' + id)
            .then(response => {
                // Obtener los datos del vendedor
                return response.json()

            }).then(data => {
                // Cargar los datos del vendedor en la tabla
                loadDashboard(data)

            }).catch(error => {
                // Atrapar el error
                console.log(error);
            })

    } else {
        console.log('No ID received'); 
        document.getElementById('headerSalesPerson').textContent = 'No se recibió un ID de vendedor';
    }

} );




function loadDashboard(data) {
    loadSalesChart(data)
    loadAccomplishedChart(data)
    loadProyectedChart(data)

    document.getElementById('headerSalesPerson').textContent = data.infoResult.data[0].slpName;
    
    document.getElementById('spanVentaActual').innerHTML = formatNumber(data.infoResult.data[0].sale);
    document.getElementById('spanMetaActual').innerHTML = formatNumber(data.infoResult.data[0].budget);
    document.getElementById('spanDiferencia').innerHTML = formatNumber(data.infoResult.data[0].sale - data.infoResult.data[0].budget);

    document.getElementById('spanProyectado').innerHTML = formatNumber(data.infoResult.data[0].sale / data.infoResult.data[0].monthAdvance * 100);

    document.getElementById('spanPedidosAbiertos').innerHTML = formatNumber(data.infoResult.data[0].salesOrders);
    document.getElementById('spanCotizacionesAbiertas').innerHTML = formatNumber(data.infoResult.data[0].quotations);

    document.getElementById('spanFacturacion').innerHTML = formatNumber(data.infoResult.data[0].invoices);
    document.getElementById('spanDevoluciones').innerHTML = formatNumber(data.infoResult.data[0].creditNotes);
    document.getElementById('spanDevolucionesSubtitulo').innerHTML = formatPercent(data.infoResult.data[0].creditNotes / data.infoResult.data[0].invoices * 100);

    document.getElementById('spanAcumuladoAnualVenta').innerHTML = formatNumber(data.infoResult.data[0].yearSale);
    document.getElementById('spanAcumuladoAnualVentaSubtitulo').innerHTML = formatNumber(data.infoResult.data[0].yearBudget);
    document.getElementById('spanAcumuladoAnualCumplimiento').innerHTML = formatPercent(data.infoResult.data[0].yearSale / data.infoResult.data[0].yearBudget * 100);

}




function loadSalesChart(data) {

    let ventaAcum = 0
    let weekWeightAcum = 0

    let meta = []
    let venta = []
    let anhoAnterior = []
    let mesAnterior = []

    for (let i = 0; i < data.weekResult.data.length; i++) {

        info = data.infoResult.data[0]
        semana = data.weekResult.data[i]        

        ventaAcum += semana.sale
        venta.push(ventaAcum)

        weekWeightAcum += semana.weekWeight
        meta.push(weekWeightAcum / 100 * info.budget)
        anhoAnterior.push(weekWeightAcum / 100 * info.pastYearSale)
        mesAnterior.push(weekWeightAcum / 100 * info.pastMonthSale)

    }

    let series = [
        {
            name: 'Meta',
            data: meta
        }, {
            name: 'Venta',
            data: venta
        }, {
            name: 'Año Anterior',
            data: anhoAnterior
        }, {
            name: 'Mes Anterior',
            data: mesAnterior
        }
    ];

    let options = {
        series: series,
        colors: ['rgb(212, 28, 105)', 'rgb(28, 212, 151)', 'rgb(65, 72, 72)', 'rgb(95, 105, 105)'],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '80%',
                borderRadius: 0,
                borderRadiusApplication: 'end',
                dataLabels: {
                    orientation: 'vertical',
                    position: 'top'
                },
                barSpacing: 2,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => {
                if (val >= 1000000) {
                    return (val / 1000000).toFixed(1) + 'M';
                }
                if (val >= 1000) {
                    return (val / 1000).toFixed(1) + 'K';
                }
                return val;
            }, 
            style: { 
                colors: ['#FFFFFF'],
                //colors: ['#000'],
                fontWeight: 0,
            }, 
            offsetX: 0,
            offsetY: -40,
        },
        stroke: {
            show: false,
        },
        xaxis: {
            categories: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'],
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    if (value >= 1000000) {
                        return (value / 1000000).toFixed(1) + 'M';
                    }
                    if (value >= 1000) {
                        return (value / 1000).toFixed(1) + 'K';
                    }
                    return value;
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val.toLocaleString('en-US')
                }
            }
        },
        grid: {
            show: true,
            position: 'back',
            xaxis: {
                lines: {
                    show: true
                }
            },   
            yaxis: {
                lines: {
                    show: true
                }
            },
        }
    };
    
    var chart = new ApexCharts(document.querySelector("#salesChart"), options);
      
    chart.render();

}




function loadAccomplishedChart(data) {

    //let cumplimiento = data.infoResult.data[0].monthAdvance.toFixed(2);
    let cumplimiento = (data.infoResult.data[0].sale / data.infoResult.data[0].budget * 100).toFixed(2)
    if (cumplimiento == Infinity) cumplimiento = 100

    var options = {
        series: [cumplimiento],
        chart: {
            height: 350,
            type: 'radialBar',
            toolbar: {
                show: true,
                tools: {
                    download: true,
                },
            },
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '71%', 
                },
                track: {
                    background: 'rgb(28, 212, 151)',
                    strokeWidth: '70%',
                },
                dataLabels: {
                    show: true,
                    name: {
                        fontSize: '0px',
                    },
                    value: {
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: 'rgb(212, 28, 105)',
                        offsetY: 0, 
                    }
                }
            },
        },
        colors: ['rgb(212, 28, 105)'],
        labels: [''],
    };

    var chart = new ApexCharts(document.querySelector("#accomplishedChart"), options);
      
    chart.render();
    
}




function loadProyectedChart(data) {

    var proyectado = (data.infoResult.data[0].budget / data.infoResult.data[0].sale * data.infoResult.data[0].monthAdvance).toFixed(2);

    var options = {
        series: [proyectado], 
        chart: {
            height: 350,
            type: 'radialBar',
            toolbar: {
                show: true, 
                tools: {
                    download: true,
                },
            },
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '71%', 
                },
                track: {
                    strokeWidth: '70%',
                },
                dataLabels: {
                    show: true,
                    name: {
                        fontSize: '0px',
                    },
                    value: {
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: 'rgb(255, 255, 255)',
                        offsetY: 0, 
                    }
                }
            },
        },
        colors: ['rgb(255, 255, 255)'],
        labels: [''],
    };

    var chart = new ApexCharts(document.querySelector("#proyectedChart"), options);
      
    chart.render();
    
}




function formatNumber(number) {
    if (number >= 0) {
        number = '₡' + number.toLocaleString('en-US')
    }else {
        number = '-₡' + Math.abs(number).toLocaleString('en-US')
    }
    return number
}




function formatPercent(number) {
    if(number == Infinity) number = 100
    return number.toFixed(2) + '%'
}