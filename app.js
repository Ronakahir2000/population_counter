const API_URL = 'https://datausa.io/api/data?drilldowns=State&measures=Population';

async function fetchPopulation() {
    const stateInput = document.getElementById('stateInput').value.trim();
    const tableBody = document.getElementById('tableBody');
    const errorDiv = document.getElementById('error');
    const loadingDiv = document.getElementById('loading');
    const table = document.getElementById('populationTable');

    // Clear previous results and errors
    tableBody.innerHTML = '';
    errorDiv.textContent = '';
    table.style.display = 'none';

    // Validate input
    if (!stateInput || !/^[A-Za-z\s]+$/.test(stateInput)) {
        errorDiv.textContent = 'Please enter a valid state name (letters only).';
        return;
    }

    // Show loading indicator
    loadingDiv.style.display = 'block';

    try {
        // Fetch data from the API
        const response = await fetch(API_URL);
        const data = await response.json();

        // Filter data based on the input state
        const filteredData = data.data.filter(item => item.State.toLowerCase() === stateInput.toLowerCase());

        if (filteredData.length === 0) {
            throw new Error('State not found.');
        }

        // Dynamically render table rows
        filteredData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.State}</td><td>${item.Year}</td><td>${item.Population}</td>`;
            tableBody.appendChild(row);
        });

        // Show the table after successful data fetch
        table.style.display = 'table';

    } catch (error) {
        errorDiv.textContent = error.message;
    } finally {
        // Hide loading indicator
        loadingDiv.style.display = 'none';
    }
}
