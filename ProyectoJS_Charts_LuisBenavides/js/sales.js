// Importar las funciones desde commonsLib.js


function getData() {
    fetch('http://localhost:3000/salespersons')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let dataID = document.getElementById('dataID');
            dataID.innerHTML = '';
            data.forEach(element => {
                var generalData = element.infoResult.data[0];
                dataID.innerHTML += `
                <div class="card m-2">
                    <div class="card-body">
                        <h5 class="card-title
                        ">${generalData.slpName}</h5>
                        <p class="card-text">${'$' + formatCurrency(generalData.sale)}</p>
                    </div>
                </div>
                `;
            });
        });
}

// Función para formatear un número como moneda
function formatCurrency(number) {
        // Asegurarse de que el número sea válido
        if (isNaN(number)) {
            throw new Error("El valor proporcionado no es un número válido.");
        }
    
        // Convertir el número a formato con separadores de miles y decimales
        return number
            .toFixed(2) // Asegurarse de tener siempre dos decimales
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") // Separar los miles con comas
            .replace(".", "."); // Asegurarse de usar punto para decimales (opcional, ya está así por defecto en toFixed)
    }