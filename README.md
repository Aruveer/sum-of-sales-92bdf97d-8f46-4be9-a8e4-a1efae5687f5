[![CI](https://github.com/Aruveer/sum-of-sales-92bdf97d-8f46-4be9-a8e4-a1efae5687f5/actions/workflows/ci.yml/badge.svg)](https://github.com/Aruveer/sum-of-sales-92bdf97d-8f46-4be9-a8e4-a1efae5687f5/actions/workflows/ci.yml)


# Sales Summary Application

A simple single-page web application that fetches sales data from a CSV file, calculates the total sales, and displays the result. This project is built with HTML, CSS, and vanilla JavaScript, and styled with Bootstrap 5.

## Features

- **Data Fetching**: Asynchronously fetches sales data from a local `data.csv` file.
- **CSV Parsing**: Parses the CSV data to identify and process the 'sales' column.
- **Total Calculation**: Sums all numerical values in the 'sales' column.
- **Dynamic Display**: Renders the calculated total sales on the page.
- **Responsive Design**: Utilizes Bootstrap 5 for a clean and responsive layout.

## How to Run

To run this project, you need a local web server. Due to browser security policies (CORS), you cannot open `index.html` directly from the file system if you want the `fetch` API to work correctly.

1.  **Clone or download the repository.**
2.  **Start a local web server** in the project's root directory.
    - If you have Python 3 installed, you can run:
      ```bash
      python -m http.server
      ```
    - If you have Node.js and `serve` installed (`npm install -g serve`), you can run:
      ```bash
      serve .
      ```
    - You can also use extensions like "Live Server" in Visual Studio Code.
3.  **Open your web browser** and navigate to the address provided by your local server (e.g., `http://localhost:8000` or `http://127.0.0.1:5500`).

## File Structure

```
.
├── data.csv        # The sales data file.
├── index.html      # The main HTML file.
├── script.js       # The JavaScript logic for fetching and calculating.
├── LICENSE         # The MIT license file.
└── README.md       # This readme file.
```

## Dependencies

- **Bootstrap 5**: Used for styling and layout. It is loaded via the jsDelivr CDN, so no local installation is required.
