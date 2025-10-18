// script.js
let ammoData = [
    { type: '22LR', brand: 'CCI SV', url: 'https://g4cgunstore.com/product/cci-22lr-standard-velocity-40gr-lrn-5000rds/', price: 0.11, velocity: 1260, energy: 135},
    { type: '9mm', brand: 'PMC 124gr', url: 'https://g4cgunstore.com/product/pmc-bronze-9mm-luger-124gr-fmj-50rds-2/', price: 0.33, velocity: 1150, energy: 338 },
    { type: '7.62x39 Surplus', brand: 'Surplus', url: 'https://marstar.ca/product/chinese-surplus-ammo-7-62x39-123-grain-fmj-1100-rounds-w-stripper-clips/', price: 0.39, velocity: 2350, energy: 1495 },
    { type: '7.62x39', brand: 'PMC 123gr', url: 'https://g4cgunstore.com/product/pmc-bronze-7-62x39-123gr-fmj-500rds/', price: 1.26, velocity: 2350, energy: 1495 },
    { type: '223 Rem', brand: 'PMC 55gr', url: 'https://g4cgunstore.com/product/pmc-bronze-223rem-55gr-fmj-bt-1000rds/', price: 0.60, velocity: 3220, energy: 1266 },
    { type: '357 Mag Al', brand: 'CCI Blazer 158gr', url: 'https://www.gotenda.com/product/cci-blazer-357-mag-158-gr-jhp-case-of-1000/', price: 0.55, velocity: 1150, energy: 464 },
    { type: '357 Mag', brand: 'PMC 158gr', url: 'https://g4cgunstore.com/product/pmc-bronze-357-mag-158gr-jsp-1000rds/', price: 0.76, velocity: 1471, energy: 759 },
    { type: '38 Sp', brand: 'PMC 132gr', url: 'https://g4cgunstore.com/product/pmc-bronze-38-special-132gr-fmj-1000rds/', price: 0.53, velocity: 917, energy: 232 },
    { type: '44 Mag', brand: 'PMC 180gr', url: 'https://g4cgunstore.com/product/pmc-bronze-44-mag-180gr-jhp-500rds-2/', price: 1.12, velocity: 1750, energy: 1225 },
    { type: '45 ACP', brand: 'Sellier & Bellot 230', url: 'https://g4cgunstore.com/product/sellier-bellot-45-acp-230gr-fmj-500rds/', price: 0.58, velocity: 830, energy: 352 },
    { type: '45 Colt', brand: 'Sellier & Bellot 230', url: 'https://g4cgunstore.com/product/sellier-bellot-45-long-colt-230gr-jhp-50rds/', price: 1.09, velocity: 824, energy: 346 },
    { type: '308 Win', brand: 'PMC 147gr', url: 'https://g4cgunstore.com/product/pmc-bronze-308win-147gr-fmj-bt-500rds/', price: 1.36, velocity: 2780, energy: 2522 },
    { type: '30-06', brand: 'Federal American Eagle 150gr', url: 'https://g4cgunstore.com/product/fed-american-eagle-30-06sprg-150gr-fmj-bt-20rds-2/', price: 1.92, velocity: 2910, energy: 2820},
    { type: '45-70 GOV', brand: 'Sellier & Bellot 405gr', url: 'https://g4cgunstore.com/product/sellier-bellot-45-70-gov-405gr-sp-240rds/', price: 2.4, velocity: 1509, energy: 2772 }
];

const dataMap = {
    price: item => item.price,
    velocity: item => item.velocity,
    energy: item => item.energy
};

const tableBody = document.getElementById('table-body');
let chart = null; // Reference to the chart instance

// sorting function
function sortData(data, key) {
    data.sort((a, b) => a[key] - b[key]);
}

ammoData.sort((a, b) => a.price - b.price);
let sortedData = ammoData.slice();

document.getElementById("sort-option").addEventListener("change", () => {
    const selectedSortOption = document.getElementById("sort-option").value;
    if (selectedSortOption === "price") {
        sortData(sortedData, 'price');
    } else if (selectedSortOption === "velocity") {
        sortData(sortedData, 'velocity');
    } else if (selectedSortOption === "energy") {
        sortData(sortedData, 'energy');
    }
    renderTable();
    updateChart();
});

// rendering function
function renderTable() {
    tableBody.innerHTML = '';
    sortedData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML =
            `
                <td>${item.type}</td>
                <td><a href="${item.url}" target="_blank">${item.brand}</a></td>
                <td>${item.price}</td>
                <td>${item.velocity}</td>
                <td>${item.energy}</td>
            `;
        tableBody.appendChild(row);
    });
}

// update chart function
function updateChart() {
    const ctx = document.getElementById('ammo-chart').getContext('2d');
    const selectElement = document.getElementById("sort-option");
    const selectedSortOption = selectElement.value;
    const selectedOptionText = selectElement.options[selectElement.selectedIndex].text;

    // Destroy the existing chart if it exists
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedData.map(item => item.type),
            datasets: [{
                label: `${selectedOptionText} Comparison`,
                data: sortedData.map(dataMap[selectedSortOption]),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

renderTable();
updateChart();
