document.addEventListener('DOMContentLoaded', () => {
    const totalSalesElement = document.getElementById('total-sales');
    const productSalesTableBody = document.querySelector('#product-sales tbody');

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

            const productIndex = header.indexOf('product');
            const priceIndex = header.indexOf('price');
            const quantityIndex = header.indexOf('quantity');

            if (productIndex === -1 || priceIndex === -1 || quantityIndex === -1) {
                throw new Error('CSV is missing required columns: product, price, quantity');
            }

            let totalSales = 0;
            const productSales = {}; // Object to store sales per product

            rows.forEach(row => {
                const values = row.split(',');
                if (values.length === header.length) {
                    const product = values[productIndex];
                    const price = parseFloat(values[priceIndex]);
                    const quantity = parseInt(values[quantityIndex], 10);

                    if (!isNaN(price) && !isNaN(quantity)) {
                        const saleAmount = price * quantity;
                        totalSales += saleAmount;

                        // Aggregate sales by product
                        if (productSales[product]) {
                            productSales[product] += saleAmount;
                        } else {
                            productSales[product] = saleAmount;
                        }
                    }
                }
            });

            // Format and display total sales
            totalSalesElement.textContent = totalSales.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });

            // Populate the product sales table
            productSalesTableBody.innerHTML = ''; // Clear any existing content
            for (const product in productSales) {
                const tr = document.createElement('tr');
                
                const productCell = document.createElement('td');
                productCell.textContent = product;
                
                const salesCell = document.createElement('td');
                salesCell.textContent = productSales[product].toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                });

                tr.appendChild(productCell);
                tr.appendChild(salesCell);
                
                productSalesTableBody.appendChild(tr);
            }

        })
        .catch(error => {
            console.error('Error fetching or processing data:', error);
            if (totalSalesElement) {
                totalSalesElement.textContent = 'Error';
            }
            if(productSalesTableBody) {
                const row = productSalesTableBody.insertRow();
                const cell = row.insertCell();
                cell.colSpan = 2;
                cell.textContent = 'Could not load sales data.';
                cell.style.textAlign = 'center';
            }
        });
});