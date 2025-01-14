// script.js
let ammoData = [
    { type: '22LR', price: 0.09, velocity: 1235, energy: 135 },
    { type: '9mm', price: 0.33, velocity: 1150, energy: 338 },
    { type: '7.62x39 (军剩)', price: 0.32, velocity: 2350, energy: 1495 },
    { type: '7.62x39 (红盒)', price: 0.52, velocity: 2350, energy: 1495 },
    { type: '7.62x39 (铜芯)', price: 1.2, velocity: 2350, energy: 1495 },
    { type: '.40 S&W', price: 0.64, velocity: 1000, energy: 400 },
    { type: '.45 ACP', price: 0.62, velocity: 830, energy: 352 },
    { type: '223 Rem', price: 0.71, velocity: 3220, energy: 1266 },
    { type: '556 Nato', price: 0.70, velocity: 3270, energy: 1306 },
    { type: '.30 Carbine', price: 0.78, velocity: 2023, energy: 996 },
    { type: '.357 Mag', price: 0.80, velocity: 1240, energy: 539 },
    { type: '.44 Mag', price: 0.98, velocity: 1181, energy: 743 },
    { type: '.308 Win', price: 1.28, velocity: 2780, energy: 2522 },
    { type: '7.62x51', price: 1.42, velocity: 2780, energy: 2522 },
    { type: '6.5 CreedMoore', price: 1.55, velocity: 2875, energy: 2386 },
    { type: '.300 Win', price: 2.5, velocity: 2936, energy: 3456 },
    { type: '.45-70 GOV', price: 2.9, velocity: 1850, energy: 2280 }
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
