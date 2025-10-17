document.addEventListener('DOMContentLoaded', () => {
    const totalSalesElement = document.getElementById('total-sales');

    fetch('data.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(csvText => {
            const rows = csvText.trim().split('\n');
            const header = rows.shift().split(',');
            const salesIndex = header.indexOf('sales');

            if (salesIndex === -1) {
                throw new Error("'sales' column not found in CSV header.");
            }

            const totalSales = rows.reduce((sum, row) => {
                const columns = row.split(',');
                // Ensure we handle rows that might be shorter than the header
                if (columns.length > salesIndex) {
                    const salesValue = parseFloat(columns[salesIndex]);
                    return sum + (isNaN(salesValue) ? 0 : salesValue);
                }
                return sum;
            }, 0);

            totalSalesElement.textContent = totalSales.toFixed(1);
        })
        .catch(error => {
            console.error('Error fetching or processing data:', error);
            totalSalesElement.textContent = 'Error!';
            totalSalesElement.classList.add('text-danger');
        });
});
