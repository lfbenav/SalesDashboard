
$(document).ready( function () {

    // Crear la datatable con sus propiedades
    let dataTable = setTableProperties();

    // Agregar evento de doble click a las filas de la tabla
    dataTable.on('dblclick', 'tbody tr', function () {
        let tr = $(this);
        let id = tr.attr('salesPerson');
        salesPersonDashboard(id);
    });

    // Obtener el json de los vendedores
    fetch('http://localhost:3000/salespersons')
        .then(response => {
            // Obtener los datos de los vendedores
            return response.json()

        }).then(data => {
            // Cargar los datos de los vendedores en la tabla
            loadTableContent(dataTable, data)

        }).catch(error => {
            // Atrapar el error
            console.log(error);
        })
} );




function setTableProperties() {
    return $('#tableSalesPeople').DataTable({
        select: true,
        bSort: true,
        paging: true,
    
        language: {
            search: "Buscar Vendedor: ",
            paginate: {
                show: "Mostrando",
                first: "Primer",
                previous: "Anterior",
                next: "Siguiente",
                last: "Ultimo",
            },
            info: "Página _PAGE_  de _PAGES_",
            infoEmpty: "No hay datos",
            emptyTable: "No hay vendedores registrados",
        },

        layout: {
            topStart: null,
            topEnd: 'search',
            bottomStart: 'info',
            bottomEnd: 'paging'
        },
        pageLength: 8,
        pagingType: "simple",
    });
}




function loadTableContent(dataTable, data) {

    console.log(data);

    let htmlBody = ""

    data.forEach(element => {
        let nombre = element.infoResult.data[0].slpName;
        let venta = element.infoResult.data[0].sale;
        let meta = element.infoResult.data[0].budget;
        let diferencia = venta - meta
        let cumplimiento = venta / meta * 100
        let colorCumplimiento = ""

        venta = '₡' + venta.toLocaleString('en-US')
        meta = '₡' + meta.toLocaleString('en-US')

        if (diferencia >= 0) {
            diferencia = '₡' + diferencia.toLocaleString('en-US')
        }else diferencia = '-₡' + Math.abs(diferencia).toLocaleString('en-US')
        
        if (cumplimiento < 80) {colorCumplimiento = 'danger'}
        else if (cumplimiento < 100) {colorCumplimiento = 'warning'}
        else if (cumplimiento >= 100) {colorCumplimiento = 'success '}

        if (cumplimiento == Infinity) {cumplimiento = 100}

        cumplimiento = cumplimiento.toFixed() + '%'

        htmlBody = 
            `<tr id="vendedor-` + element.id + `" salesPerson="` + element.id + `">
                <td class="text-center">` + nombre + `</td>
                <td class="text-end">` + venta + `</td>
                <td class="text-end">` + meta + `</td>
                <td class="text-end">` + diferencia + `</td>
                <td class="text-center"><span class="fw-bold px-3 text-dark text-bg-`+ colorCumplimiento +`">` + cumplimiento + `</span></td>
                <td class="text-center">
                    <button class="btn p-0 px-2" onclick="handleButtonClick(this)">
                        <img class="bi" width="30px" height="30px" src="../images/flecha.svg" alt="Ir al Dashboard">
                    </button>
                </td>
            </tr>`;

        dataTable.rows.add($(htmlBody)).draw();
    })
}




function handleButtonClick(button) {
    let parentRow = button.closest('tr');
    let id = parentRow.getAttribute('salesPerson');
    salesPersonDashboard(id);
}




function salesPersonDashboard(id) {
    window.location.href = '../html/dashboard.html?id=' + id;
}



