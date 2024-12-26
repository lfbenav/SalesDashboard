
$(document).ready( function () {

    // Crear la datatable con sus propiedades
    let dataTable = setTableProperties();

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
        pageLength: 5,
        pagingType: "simple",
    });
}




function loadTableContent(dataTable, data) {

    console.log(data);

    let htmlBody = ""

    data.forEach(element => {
        let nombre = element.infoResult.data[0].slpName;
        let venta = "a"
        let meta = "a"
        let diferencia = "a"
        let cumplimiento = "a"

        htmlBody = 
            `<tr salesPerson="` + element + `">
                <td class="text-center">` + nombre + `</td>
                <td class="text-end">` + venta + `</td>
                <td class="text-end">` + meta + `</td>
                <td class="text-end">` + diferencia + `</td>
                <td class="text-center">` + cumplimiento + `</td>
                <td class="text-center">Boton aqui</td>
            </tr>`;

        dataTable.rows.add($(htmlBody)).draw();
    })
}


// 80 a 99 amarillo, 79 para abajo rojo, 100 para arriba verde


















